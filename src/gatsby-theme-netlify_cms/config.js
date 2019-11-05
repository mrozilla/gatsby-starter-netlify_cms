// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import config from '@mrozilla/gatsby-theme-netlify_cms/src/config';

// ─────────────────────────────────────────────────────────────────────────────
// adjustments
// ─────────────────────────────────────────────────────────────────────────────

// e.g. add a new block type

// config.collections = [
//   ...config.collections.map((collection) => {
//     if (collection.name === 'pages') {
//       return {
//         ...collection,
//         fields: collection.fields.map((field) => {
//           if (field.name === 'blocks') {
//             return { ...field, types: [...field.types, { name: 'New', fields: [{name: 'title'}] }] };
//           }
//           return field;
//         }),
//       };
//     }
//     return collection;
//   }),
// ];

// ─────────────────────────────────────────────────────────────────────────────
// export
// ─────────────────────────────────────────────────────────────────────────────

export default config;
