import React from "react";
import Layout from "components/Layout";
import Catalog from "src/components/Catalog";
import Seo from "src/components/Seo";
import LayoutStore from "src/components/LayoutStore";

const CategoryPage = ({
  name,
  menu,
  category,
  categoryPath,
  childCategories,
  products,
  isToOpenShoppingCart,
  observer,
  filters,
}) => {
  return (
    <>
      <Seo
        title={name || "BMcar - Loja de Acessórios"}
        facebookImage={"https://bmcar-wp.prod.miewstudio.com/wp-content/uploads/2020/04/explorar-scaled.jpg"}
      />
      <LayoutStore
        menu={menu}
        category={category}
        categoryPath={categoryPath}
        observer={observer}
        isToOpenShoppingCart={isToOpenShoppingCart}
      >
        <Catalog
          category={category}
          childCategories={childCategories}
          categoryPath={categoryPath}
          products={products}
          filters={filters}
          observer={observer}
        />
      </LayoutStore>
    </>
  );
};

const StoreRouter = ({ pageContext, isToOpenShoppingCart, observer }) => {
  return (
    <CategoryPage
      menu={pageContext.menu}
      childCategories={pageContext.childCategories}
      products={pageContext.products}
      filters={pageContext.filters}
      observer={observer}
      isToOpenShoppingCart={isToOpenShoppingCart}
    />
  );
};

const StorePage = ({ pageContext, location }) => {
  return (
    <Layout>
      <StoreRouter
        pageContext={pageContext}
        isToOpenShoppingCart={location && location.state && location.state.isToOpenShoppingCart}
      />
    </Layout>
  );
};

export default StorePage;
