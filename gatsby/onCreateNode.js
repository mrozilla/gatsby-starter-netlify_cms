// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

// TODO: finalise for merge into gatsby-plugin-mdx
const mdx = require('@mdx-js/mdx');
const babel = require('@babel/core');
const mapObject = require('map-obj');

// ─────────────────────────────────────────────────────────────────────────────
// helpers
// ─────────────────────────────────────────────────────────────────────────────

function mapObjectWithArrays(obj, func) {
  if (Array.isArray(obj)) {
    return obj.map((item) => mapObject(item, func, { deep: true }));
  }
  return mapObject(obj, func, { deep: true });
}

function mdxify(key, value) {
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
      .replace(/export\s*{\s*MDXContent\s+as\s+default\s*};?/, 'return MDXContent;');

    return [key, replaced];
  }

  return [key, value];
}

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

exports.onCreateNode = ({ node, getNode, actions: { createNodeField } }) => {
  if (node.internal.type === 'Mdx') {
    // create {fields: sourceName} based on file's folder
    const parent = getNode(node.parent);
    if (parent.internal.type === 'File') {
      createNodeField({
        node,
        name:  'sourceName',
        value: parent.sourceInstanceName,
      });
    }

    // TODO: finalise for merge into gatsby-mdx/fork
    // eslint-disable-next-line no-param-reassign
    node.frontmatter = mapObjectWithArrays(node.frontmatter, mdxify);
  }
};
