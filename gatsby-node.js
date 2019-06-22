// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

const path = require('path');
const fsMiddlewareAPI = require('netlify-cms-backend-fs/dist/fs');
const { fmImagesToRelative } = require('gatsby-remark-relative-images');

// TODO: finalise for merge into gatsby-mdx/fork
const mdx = require('@mdx-js/mdx');
const babel = require('@babel/core');
const deepMap = require('deep-map');

// ─────────────────────────────────────────────────────────────────────────────
// types
// ─────────────────────────────────────────────────────────────────────────────

exports.sourceNodes = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
    type Test implements Node {
      id: String
    }
    # type Mdx implements Node {
    #   frontmatter: Frontmatter
    # }
    # type Frontmatter {
    #   blocks: Blocks
    # }
    # type Blocks {
    #   clients: Clients
    # }
    # type Clients {
    #   company: Company
    # }
    # type Company {
    #   image: File
    # }
    # type MdxFrontmatterBlocksClientsCompany implements Node {
    #   image: File
    # }
  `;
  createTypes(typeDefs); // TODO: resolve name clash
};

// ─────────────────────────────────────────────────────────────────────────────
// babel
// ─────────────────────────────────────────────────────────────────────────────

exports.onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPlugin({
    name: '@babel/plugin-proposal-optional-chaining',
  });
};

// ─────────────────────────────────────────────────────────────────────────────
// aliases
// ─────────────────────────────────────────────────────────────────────────────

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '~components': path.resolve(__dirname, 'src/components'),
        '~containers': path.resolve(__dirname, 'src/containers'),
        '~utils':      path.resolve(__dirname, 'src/utils'),
      },
    },
  });
};

// ─────────────────────────────────────────────────────────────────────────────
// node transformations
// ─────────────────────────────────────────────────────────────────────────────

exports.onCreateNode = ({ node, getNode, actions: { createNodeField } }) => {
  fmImagesToRelative(node); // transform Netlify CMS' absolute paths to relative for gatsby-image

  if (node.internal.type === 'Mdx') {
    const parent = getNode(node.parent);

    // TODO: finalise for merge into gatsby-mdx/fork
    deepMap(
      node.frontmatter,
      (value, key) => {
        if (key === 'markdown' || key === 'mdx') {
          const mdxed = mdx.sync(value);
          const babeled = babel.transform(mdxed, {
            configFile: false,
            // plugins:    [instance.plugin, objRestSpread, htmlAttrToJSXAttr],
            presets:    [
              require('@babel/preset-react'),
              [
                require('@babel/preset-env'),
                {
                  useBuiltIns: 'entry',
                  corejs:      2,
                  modules:     'false',
                },
              ],
            ],
          });
          const replaced = babeled.code
            .replace(/export\s*default\s*function\s*MDXContent\s*/, 'return function MDXContent')
            .replace(/export\s*{\s*MDXContent\s+as\s+default\s*};?/, 'return MDXContent;')
            .replace(/\nexport /g, '\n');

          return replaced;
        }

        return value;
      },
      { inPlace: true },
    );

    if (parent.internal.type === 'File') {
      createNodeField({
        node,
        name:  'sourceName',
        value: parent.sourceInstanceName,
      });
    }
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// automatic pages
// ─────────────────────────────────────────────────────────────────────────────

exports.createPages = ({ actions: { createPage }, graphql }) => {
  const PageTemplateContainer = path.resolve('src/containers/PageTemplateContainer.js');
  const PostTemplateContainer = path.resolve('src/containers/PostTemplateContainer.js');

  return graphql(`
    {
      pages: allMdx(filter: { fields: { sourceName: { eq: "pages" } } }) {
        nodes {
          frontmatter {
            meta {
              permalink
            }
          }
        }
      }
      posts: allMdx(filter: { fields: { sourceName: { eq: "posts" } } }) {
        nodes {
          frontmatter {
            meta {
              permalink
            }
          }
        }
      }
    }
  `).then((result) => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    result.data.pages.nodes.forEach((node) => {
      createPage({
        path:      node.frontmatter.meta.permalink,
        component: PageTemplateContainer,
      });
    });

    result.data.posts.nodes.forEach((node) => {
      createPage({
        path:      node.frontmatter.meta.permalink,
        component: PostTemplateContainer,
      });
    });

    return null;
  });
};

// ─────────────────────────────────────────────────────────────────────────────
// Netlify CMS setup
// ─────────────────────────────────────────────────────────────────────────────

exports.onCreateDevServer = ({ app }) => {
  fsMiddlewareAPI(app);
};
