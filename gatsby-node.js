// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

const { onCreateBabelConfig } = require('./gatsby/onCreateBabelConfig');
const { onCreateWebpackConfig } = require('./gatsby/onCreateWebpackConfig');
const { createPages } = require('./gatsby/createPages');

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

exports.onCreateBabelConfig = onCreateBabelConfig; // babel
exports.onCreateWebpackConfig = onCreateWebpackConfig; // aliases
exports.createPages = createPages; // automatic pages
