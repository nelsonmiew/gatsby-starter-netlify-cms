const _ = require('lodash')
const path = require('path')
const { createFilePath ,createRemoteFileNode } = require('gatsby-source-filesystem')
const { fmImagesToRelative } = require('gatsby-remark-relative-images')
const slash = require(`slash`);
const API_URL = "https://bmcar-api.out.miewstudio.com/";


const pathsToAddIds = [
  // { path: "/login/accountactivation/" },
  // { path: "/login/resetpassword/" },
  // { path: "/account/" },
  // { path: "/account/encomenda/" },
  // { path: "/account/encomenda-acessorios/" },
  { path: "/loja/" },
  //{ path: "/vehicle/" },
  //{ path: "/findvehicle/vehicle/" },
];


exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  return graphql(`
    {
      bmcarApi {        
        categories {
          attributes {
            id
            name
            attributesValue {
              id
              name
              colorTypeCode
              colorTypeId
            }
          }
          id
          level
          name
          slug
          path
          numberProducts
          categories {
            attributes {
              id
              name
              attributesValue {
                id
                name
                colorTypeCode
                colorTypeId
              }
            }
            categories {
              attributes {
                id
                name
                attributesValue {
                  id
                  name
                  colorTypeCode
                  colorTypeId
                }
              }
              categories {
                attributes {
                  id
                  name
                  attributesValue {
                    id
                    name
                    colorTypeCode
                    colorTypeId
                  }
                }
                id
                level
                name
                slug
                path
                numberProducts
                seoTitle
                seoDescription
              }
              id
              level
              name
              slug
              path
              numberProducts
              seoTitle
              seoDescription
            }
            id
            name
            level
            slug
            path
            numberProducts
            seoTitle
            seoDescription
          }
        }
        products {
          attributesVariable {
            id
            name
            attributesValue {
              id
              name
              colorTypeCode
              colorTypeId
            }
          }
          categories
          mainCategory {
            name
            slugSimple
          }
          categoryPath {
            id
            name
            slug
          }
          description
          descriptionDetail
          discount
          isDiscountPercentage
          id
          imageProductUrl
          images {
            url
            id
            attributeValueIds
          }
          isSold
          isFeatured
          name
          price
          priceOriginal
          slug
          variationId
          variations {
            attributeValueIds
            discount
            id
            name
            price
            priceOriginal
            stock
            serialNumber
          }
          hasStock
          publishedDate
          serialNumber
          attributes {
            id
            name
            attributesValue {
              id
              name
              colorTypeCode
              colorTypeId
            }
          }
        }
      }
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              tags
              templateKey
            }
          }
        }
      }
    }
  `).then((result) => {
    if (result.errors) {
      result.errors.forEach((e) => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

    const posts = result.data.allMarkdownRemark.edges

    posts.forEach((edge) => {
      const id = edge.node.id
      createPage({
        path: edge.node.fields.slug,
        tags: edge.node.frontmatter.tags,
        component: path.resolve(
          `src/templates/${String(edge.node.frontmatter.templateKey)}.js`
        ),
        // additional data can be passed via context
        context: {
          id,
        },
      })
    })

    // Tag pages:
    let tags = []
    // Iterate through each post, putting all found tags into `tags`
    posts.forEach((edge) => {
      if (_.get(edge, `node.frontmatter.tags`)) {
        tags = tags.concat(edge.node.frontmatter.tags)
      }
    })
    // Eliminate duplicate tags
    tags = _.uniq(tags)

    // Make tag pages
    tags.forEach((tag) => {
      const tagPath = `/tags/${_.kebabCase(tag)}/`

      createPage({
        path: tagPath,
        component: path.resolve(`src/templates/tags.js`),
        context: {
          tag,
        },
      })
    })

    const { bmcarApi } = result.data;
    const productPage = path.resolve(`./src/pagesCustom/product/index.js`);
    
    const storePage = path.resolve(`./src/pagesCustom/loja/index.js`);
    const categoryPage = path.resolve(`./src/pagesCustom/category/index.js`);
    
    const bfs = function (tree, key, collection) {
      if (!tree[key] || tree[key].length === 0) return;
      for (let i = 0; i < tree[key].length; i++) {
        let child = tree[key][i];
        collection.push(child);
        bfs(child, key, collection);
      }
    
      return;
    };

    const categoriesFlat = [];

    bfs(bmcarApi, "categories", categoriesFlat);
   
    categoriesFlat.forEach((category) => {
      const categoryProducts = bmcarApi.products
        .filter((p) => (category.level > 0 ? p.categories.some((pc) => pc === category.id) : true))
        .map((product) => {
          return {
            id: product.id,
            name: product.name,
            slug: product.slug,
            price: product.price,
            priceOriginal: product.priceOriginal,
            discount: product.discount,
            isDiscountPercentage: product.isDiscountPercentage,
            imageProductUrl: product.imageProductUrl,
            isFeatured: product.isFeatured,
            hasStock: product.hasStock,
            categories: product.categories,
            mainCategory: product.mainCategory,
            categoryPath: product.categoryPath,
            publishedDate: product.publishedDate,
            attributes: product.attributes,
          };
        });
        
      const categoryDestaques = [];// allWpDestaque.nodes.filter((d) => d.category && d.category.indexOf(category.id) >= 0);
  
      const pageObj = {
        path: category.level > 0 ? `/loja/${category.slug}/` : `/loja/`,
        component: category.level > 0 ? slash(categoryPage) : slash(storePage),
        context: {
          name: category.name,
          category: {
            id: category.id,
            slug: category.slug,
            name: category.name,
            level: category.level,
            seoTitle: category.seoTitle,
            seoDescription: category.seoDescription,
          },
          menu: bmcarApi.categories[0].categories,
          childCategories:
            category.categories &&
            category.categories.map((cat) => {
              return { id: cat.id, name: cat.name, slug: cat.slug, numberProducts: cat.numberProducts };
            }),
          categoryPath: [
            ...categoriesFlat
              .filter((cat) => category.path.some((c) => cat.id === c))
              .map((cat) => {
                return { slug: cat.slug, name: cat.name };
              }),
            { slug: category.slug, name: category.name },
          ],
          products: categoryProducts,
          filters: category.attributes,
          destaques: categoryDestaques,
        },
      };
  
      if (category.level === 0) {
        pageObj.matchPath = `/loja/*`;
      }
  
      createPage(pageObj);
    });

    bmcarApi.products.forEach((product) => {
      createPage({
        path: `/${product.mainCategory.slugSimple}/${product.slug}/`,
        component: slash(productPage),
        context: {
          menu: bmcarApi.categories[0].categories,
          product: { ...product },
        },
      });
    });


  })
}

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions;
  const pageWithIds = pathsToAddIds.find((p) => p.path === page.path);
  deletePage(page);

  if (pageWithIds) {
    createPage({
      ...page,
      matchPath: page.path + (pageWithIds.match ? pageWithIds.match : "*/"),
      context: {
        ...page.context,
      },
    });
  } else {
    createPage({
      ...page,
      context: {
        ...page.context,
      },
    });
  }
};

exports.onCreateNode =async  ({ node,  actions,getCache, getNode, createNodeId, store }) => {
  const { createNodeField, createNode } = actions;
  fmImagesToRelative(node) // convert image paths for gatsby images

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }

  if (
    node.internal.type === "SitePage" &&
    node.context &&
    node.context.product &&
    node.context.product.imageProductUrl
  ) {
    let fileNode;
    
    try {
      fileNode = await createRemoteFileNode({
        url: `${API_URL.slice(0, -1)}${node.context.product.imageProductUrl}`, // string that points to the URL of the image
        parentNodeId: node.id, // id of the parent node of the fileNode you are going to create
        createNode, // helper function in gatsby-node to generate the node
        createNodeId, // helper function in gatsby-node to generate the node id
        getCache, // Gatsby's cache
        store, // Gatsby's redux store
      });
    } catch (error) {
      console.log("error generate static file => ", node.context.product.imageProductUrl, error);
    }

    if (fileNode && fileNode.id) {
      node.imageProduct___NODE = fileNode.id;
    }

    let imagesDescription = [];
    let imagesProduct = [];
    if (node.context.product.images) {
      node.context.product.images.forEach(async (image, i) => {
        let childFileNode;        
        try {
          childFileNode = await createRemoteFileNode({
            url: `${API_URL.slice(0, -1)}${image.url}`, // string that points to the URL of the image
            parentNodeId: node.id, // id of the parent node of the fileNode you are going to create
            createNode, // helper function in gatsby-node to generate the node
            createNodeId, // helper function in gatsby-node to generate the node id
            getCache, // Gatsby's cache
            store, // Gatsby's redux store
            name: image.id,
          });
        } catch (error) {
          console.log("error generate static file => ", image.url, error);
        }

        if (childFileNode && childFileNode.id) {
          imagesProduct.push(childFileNode.id);
          imagesDescription.push(childFileNode.id);
        }
      });
    }

    node.imagesProduct___NODE = imagesProduct;

    if (node.context.product.descriptionDetail) {
      var m,
        urls = [],
        str = node.context.product.descriptionDetail,
        rex = /<img.*?src="([^">]*\/([^">]*?))".*?>/g;

      while ((m = rex.exec(str))) {
        urls.push({ url: m[1], id: m[1].match(/([^/]+)(?=\.\w+$)/)[0] });
      }

      if (urls) {
        urls.forEach(async (image, i) => {
          let childFileNode;

          try {
            childFileNode = await createRemoteFileNode({
              url: image.url, // string that points to the URL of the image
              parentNodeId: node.id, // id of the parent node of the fileNode you are going to create
              createNode, // helper function in gatsby-node to generate the node
              createNodeId, // helper function in gatsby-node to generate the node id
              getCache, // Gatsby's cache
              store, // Gatsby's redux store
              name: image.id,
            });
          } catch (error) {
            console.log("error generate static file => ", image.url, error);
          }

          if (childFileNode && childFileNode.id) {
            imagesDescription.push(childFileNode.id);
          }
        });
      }
    }

    node.imagesDescription___NODE = imagesDescription;
  }
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
    type SitePage implements Node @infer {
      frontmatter: Frontmatter
    }
    type Frontmatter {
      imageProduct: [File]
      imagesProduct: [File]
      imagesDescription: [File]
    }
  `;
  createTypes(typeDefs);
  console.log("created type");
};

