const { resolve } = require(`path`);
const { createFilePath } = require('gatsby-source-filesystem');

exports.onCreateNode = ({ node, getNode, actions: { createNodeField } }) => {
  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({ node, getNode, basePath: 'content' });
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    })
  }
}

exports.createPages = ({ graphql, actions: { createPage } }) => {
  const query = `
    query {
      projects: allMarkdownRemark(filter: { frontmatter: {type: {eq: "Project"}} }, sort: {fields: [frontmatter___startDate], order: DESC}) {
        edges {
          node {
            frontmatter { title },
            fields { slug },
          }
        }
      }
      posts: allMarkdownRemark(filter: { frontmatter: {type: {eq: "Post"}} }, sort: {fields: [frontmatter___date], order: DESC}) {
        edges {
          node {
            frontmatter { title },
            fields { slug },
          }
        }
      }
    }`;
  
  return graphql(query)
    .then(({ data }) => {
      data.projects.edges.forEach(({ node: { fields: { slug } } }, index, arr) => {
        const prev = arr[index - 1];
        const next = arr[index + 1];
        createPage({
          path: slug,
          component: resolve('./src/templates/project.jsx'),
          context: { slug, next: next ? next.node : null, prev: prev ? prev.node : null }
        })
      })

      data.posts.edges.forEach(({ node: { fields: { slug } } }, index, arr) => {
        const prev = arr[index - 1];
        const next = arr[index + 1];
        createPage({
          path: slug,
          component: resolve('./src/templates/post.jsx'),
          context: { slug, next: next ? next.node : null, prev: prev ? prev.node : null }
        })
      })
    })
}
