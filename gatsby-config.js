module.exports = {
  plugins: [
    'gatsby-plugin-styled-components',
    'gatsby-transformer-remark',
    'gatsby-transformer-yaml',
    'gatsby-plugin-catch-links',
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/config/typography',
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src/content`,
        path: `${__dirname}/src/content`,
      },
    },
    'gatsby-plugin-sharp',
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1200,
            },
          },
        ],
      },
    },
  ],
}
