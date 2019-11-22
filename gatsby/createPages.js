// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

const path = require('path');

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

module.exports = ({ actions: { createPage }, graphql }) => {
  const PageTemplateContainer = path.resolve('src/containers/general/PageTemplateContainer.js'); // path intentionally without '../'
  const PostTemplateContainer = path.resolve('src/containers/general/PostTemplateContainer.js'); // path intentionally without '../'

  return graphql(`
    {
      pages: allMdx(
        filter: {
          fileAbsolutePath: { regex: "/cms/pages/" }
          frontmatter: { meta: { permalink: { ne: "/default/" } } }
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
          fileAbsolutePath: { regex: "/cms/posts/" }
          frontmatter: { meta: { permalink: { ne: "/blog/default/" } } }
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
