module.exports = {
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    'gatsby-plugin-styled-components',
    'gatsby-transformer-remark',
    'gatsby-remark-copy-linked-files',
    'gatsby-transformer-yaml',
    'gatsby-plugin-catch-links',
    'gatsby-plugin-netlify',
    'gatsby-plugin-offline',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1480,
              linkImagesToOriginal: false,
              withWebp: true,
              showCaptions: true,
            },
          },
          {
            resolve: 'gatsby-remark-copy-linked-files',
          },
          {
            resolve: 'gatsby-remark-prismjs'
          }
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-fathom',
      options: {
        trackingUrl: 'stats.guillaumebogard.dev',
        siteId: 'CJWXJ'
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Guillaume Bogard`,
        short_name: `guillaumebogard.dev`,
        start_url: `/`,
        background_color: `#3C40C5`,
        theme_color: `#3C40C5`,
        display: `fullscreen`,
        icon: './src/assets/images/favicon.png',
      },
    },
  ],
};
