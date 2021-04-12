import React from "react";
import Layout from "components/Layout";
import Catalog from "src/components/Catalog";
import Seo from "src/components/Seo";
import LayoutStore from "src/components/LayoutStore";
import { STORE_PATH } from "src/components/GlobalConstants";

const CategoryPage = ({ pageData }) => {
  return (
    <>
      <Layout>
        <Seo
          title={pageData.category.seoTitle || pageData.name}
          metaDescription={pageData.category.seoDescription}
          facebookImage={"https://bmcar-wp.prod.miewstudio.com/wp-content/uploads/2020/04/explorar-scaled.jpg"}
        />
        <LayoutStore menu={pageData.menu} category={pageData.category} categoryPath={pageData.categoryPath}>
          <Catalog
            category={pageData.category}
            childCategories={pageData.childCategories}
            categoryPath={pageData.categoryPath}
            products={pageData.products}
            filters={pageData.filters}
            destaques={pageData.destaques}
          />
        </LayoutStore>
      </Layout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Loja",
                item: `https://bmcar.pt${STORE_PATH}`,
              },
              ...pageData.categoryPath.map((path, i) => {
                return {
                  "@type": "ListItem",
                  position: i + 2,
                  name: path.name,
                  item: `https://bmcar.pt${STORE_PATH}${path.slug}/`,
                };
              }),
            ],
          }),
        }}
      ></script>
    </>
  );
};

const CategoryPageRouter = ({ pageContext }) => {
  return <CategoryPage pageData={pageContext} />;
};

export default CategoryPageRouter;
