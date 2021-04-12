function productClick(product) {
  const event = "select_item";

  const ecommerce = {
    items: [product],
  };

  return googleAction(event, ecommerce);
}

function addToCart(products) {
  const event = "add_to_cart";

  const ecommerce = {
    currencyCode: "EUR",
    items: [...products],
  };

  return googleAction(event, ecommerce);
}

function removeFromCart(products) {
  const event = "remove_from_cart";

  const ecommerce = {
    items: [...products],
  };

  return googleAction(event, ecommerce);
}

function promotionClick() {
  const event = "promotionClick";

  return googleAction(event);
}

function checkout(products) {
  const event = "begin_checkout";

  const ecommerce = {
    items: [...products],
  };

  return googleAction(event, ecommerce);
}

function purchase(transaction, products) {
  const event = "purchase";

  const ecommerce = {
    purchase: {
      ...transaction,
      items: [...products],
    },
  };

  return googleAction(event, ecommerce);
}

function googleAction(event, ecommerce) {
  function request() {
    return { type: "GOOGLE_SEND_ACTION" };
  }

  return (dispatch) => {
    dispatch(request());

    let dataToPush = {};
    if (event) dataToPush.event = event;
    if (ecommerce) dataToPush.ecommerce = ecommerce;

    console.log("data layer push =>", dataToPush);

    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push(dataToPush);
    }
  };
}

const googleActions = {
  productClick,
  addToCart,
  removeFromCart,
  promotionClick,
  checkout,
  purchase,
};

export default googleActions;
