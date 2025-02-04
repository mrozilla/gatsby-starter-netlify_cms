// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

const proxy = require('http-proxy-middleware');

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

const {
  NODE_ENV,
  URL: NETLIFY_PRODUCTION_URL = 'https://www.gatsby-starter-netlify_cms.netlify.com', // TODO: update default
  DEPLOY_PRIME_URL: NETLIFY_DEPLOY_URL = NETLIFY_PRODUCTION_URL,
  CONTEXT: NETLIFY_ENV = NODE_ENV,
} = process.env;

module.exports = {
  siteMetadata: {
    siteTitle: 'Example', // TODO: update default
    siteUrl: NETLIFY_ENV === 'production' ? NETLIFY_PRODUCTION_URL : NETLIFY_DEPLOY_URL,
  },
  developMiddleware: (app) => {
    app.use(
      '/.netlify/functions/',
      proxy({
        target: 'http://localhost:34567',
        pathRewrite: { '/.netlify/functions/': '' },
      }),
    );
  },
  plugins: [
    { resolve: '@mrozilla/gatsby-theme-netlify_cms' },

    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: process.env.GATSBY_GA_TRACKING_ID,
        head: true,
        anonymize: true,
        respectDNT: true,
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Example', // TODO: update default
        short_name: 'Example', // TODO: update default
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#007bff', // TODO: update default
        display: 'minimal-ui',
        icon: 'static/assets/favicon.png', // TODO: update default
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        resolveEnv: () => process.env.CONTEXT,
        env: {
          production: {
            policy: [{ userAgent: '*' }],
          },
          'branch-deploy': {
            policy: [{ userAgent: '*', disallow: ['/'] }],
            sitemap: null,
            host: null,
          },
          'deploy-preview': {
            policy: [{ userAgent: '*', disallow: ['/'] }],
            sitemap: null,
            host: null,
          },
        },
      },
    },
    {
      resolve: 'gatsby-plugin-styled-components',
      options: {
        displayName: NODE_ENV === 'development',
      },
    },
    { resolve: 'gatsby-plugin-sitemap' },
    { resolve: 'gatsby-plugin-react-helmet' },
    {
      resolve: 'gatsby-plugin-netlify',
      options: {
        mergeSecurityHeaders: false,
        headers: {
          '/*': [
            'X-Frame-Options: DENY',
            'X-XSS-Protection: 1; mode=block',
            'X-Content-Type-Options: nosniff',
            'Referrer-Policy: strict-origin-when-cross-origin',
          ],
        },
      },
    }, // keep last
  ],
};
