// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

const path = require('path');

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

exports.createPages = ({ actions: { createPage }, graphql }) => {
  const PageTemplateContainer = path.resolve('src/containers/general/PageTemplateContainer.js'); // path intentionally without '../'
  const PostTemplateContainer = path.resolve('src/containers/general/PostTemplateContainer.js'); // path intentionally without '../'

  return graphql(`
    {
      pages: allMdx(
        filter: {
          fields: { sourceName: { eq: "pages" } }
          frontmatter: { meta: { permalink: { ne: "/demo/" } } }
        }
      ) {
        nodes {
          frontmatter {
            meta {
              permalink
            }
          }
        }
      }
      posts: allMdx(
        filter: {
          fields: { sourceName: { eq: "posts" } }
          frontmatter: { meta: { permalink: { ne: "/blog/demo/" } } }
        }
      ) {
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
