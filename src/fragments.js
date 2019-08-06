import { graphql } from 'gatsby';

export const PostData =  graphql`
  fragment PostData on Mdx {
     id,
     code {
       body,
       scope
     },
     timeToRead,
     excerpt(pruneLength: 300),
     fields { 
       slug 
     },
     frontmatter {
       title
       date(formatString: "MMMM Do, YYYY")
       tags,
     }
  }
`

export const ProjectData = graphql`
  fragment ProjectData on Mdx {
    id,
    code {
      body,
      scope
    },
    excerpt(pruneLength: 300),
    frontmatter {
      title,
      employer {
        name,
        link
      },
      client {
        name, 
        link
      },
      startDate(formatString: "MMMM YYYY"),
      endDate(formatString: "MMMM YYYY"),
      images {
        childImageSharp {
          fluid(maxWidth: 1200) {
            src
            srcSet
          }
        },
        publicURL,
      },
      tools
      }
      fields { slug }
  }
`;

export const ToolData = graphql`
  fragment ToolData on ToolsYaml {
    id,
    name,
    icon {
      childImageSharp {
        fluid(maxWidth: 200) {
          src
          srcSet
        }
      }
    },
  },
`;
