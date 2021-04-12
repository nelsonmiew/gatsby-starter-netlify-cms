// import config from "src/services/config";

export const VEHICLE_PATH = "/carros/";
export const VEHICLE_NOT_FOUND_PATH = "veiculo-nao-encontrado/";

export const FIND_VEHICLE_BASE_PATH = "/encontrar-veiculo/";
export const FIND_VEHICLE_VEHICLE_PATH = "carros/";
export const FIND_VEHICLE_RESULTS_PATH = "resultados/";
export const FIND_VEHICLE_RESERVATION_PATH = "reservar/";
export const FIND_VEHICLE_RESERVATION_SUCCESS_PATH = "reserva-com-sucesso/";
export const FIND_VEHICLE_CHECKOUT_PATH = "checkout/";
export const FIND_VEHICLE_CHECKOUT_SUCCESS_PATH = "checkout-com-sucesso/";
export const FIND_VEHICLE_CHECKOUT_PRODUCT_UNAVAILABLE_PATH = "checkout-veiculo-indisponivel/";

export const EXPLORE_VEHICLES_PATH = "/explorar-veiculos/";
export const STORE_LANDING_PATH = "/lifestyle/";
export const STORE_PATH = "/loja/";
export const PRODUCT_CHECKOUT_PATH = "checkout/";
export const PRODUCT_CHECKOUT_SUCCESS_PATH = "checkout-com-sucesso/";

const config = {
    apiUrl: "https://bmcar-api.out.miewstudio.com/"
}

export const PAYMENT_TYPES = [
  {
    value: "loan",
    label: "Financiamento",
    icon: "fa fa-table"
  },
  {
    value: "cash",
    label: "Pronto Pagamento",
    icon: "fa fa-slack"
  }
];

export const FINANCE_MODES = [
  {
    value: "auto",
    label: "A melhor solução para mim",
    descritption: "Nós propomos a melhor oferta para si."
  },
  {
    value: "manual",
    label: "Quero definir o meu financiamento",
    descritption: "Selecione os parâmetros da proposta."
  }
];

export const DELIVERY_TYPES = [
  {
    value: "store",
    label: "No Concessionário",
    icon: "fa fa-map-marker",
    desc: "Na concessionário que escolher, no prazo de entrega indicado"
  },
  {
    value: "address",
    label: "Na minha morada",
    icon: "fa fa-home",
    desc: "Na morada selecionada, no prazo de entrega indicado"
  }
];

export const ADDITIONAL_SERVICES = [
  {
    id: "1",
    value: "manutencao",
    label: "Manutenção e Serviço",
    desc: "Manutenção e Serviço",
    price: 400
  },
  {
    id: "2",
    value: "pneus",
    label: "Pneus",
    desc: "Pneus",
    price: 400
  },
  {
    id: "3",
    value: "veiculo-substituicao",
    label: "Veículo de substituição e seguros",
    desc: "Veículo de substituição e seguros",
    price: 0
  }
];

export const FEATURES_TABS = [
  {
    value: "detalhe",
    label: "Detalhe"
  },
  {
    value: "equipamento",
    label: "Equipamento"
  }
];

export const VEHICLE_LABELS = [
  {
    class: "new",
    label: "Novo"
  },
  {
    class: "premium",
    label: "BMW Premium Selection"
  },
  {
    class: "next",
    label: "MINI Next"
  },
  {
    class: "new",
    label: "Veículo de demonstração"
  }
];

export const EXCHANGE_VEHICLE_STEPS = {
  GENERATE_SMS_TOKEN: 1,
  CALCULATE_BY_PLATE_NUMBER: 2,
  CALCULATE_BY_VEHICLE_FORM: 3
};

export const EXCHANGE_VEHICLE_MESSAGE_CODES = {
  PRICE_CALCULATED: 0,
  SMS_SENT: 1,
  CODE_IS_EXPIRED: 2,
  VEHICLE_FORM_IS_REQUIRED: 3,
  IS_NOT_POSSIBLE_CALCULATE: 4,
  PHONE_NUMBER_ALREADY_USED: 5,
  NEED_MANUAL_VALUATION: 6,
  VEHICLE_VERSIONS_IS_REQUIRED: 7
};

export const DEFAULT_ORDER_STATUS = {
  AWAITING_PAYMENT: 1,
  PAYMENT_ON_CONFIRMATION: 2,
  PAYMENT_FAILED: 3,
  PROCESSING: 4,
  PENDING_INFORMATION: 5,
  DOCUMENTATION_UNDER_REVIEW: 6,
  IN_PREPARATION: 7,
  EXPEDITED: 8,
  DONE: 9,
  CANCELED: 10,
  REFUNDED: 11
};

export const FINAL_DOCUMENT_TYPE_ID = 10;

export const defaultImg = config.apiUrl + "images/car1.jpg";
export const defaultCardImg = config.apiUrl + "images/car2.jpg";

export const cameraPermissionsImg = config.apiUrl + "images/camerapermissions.png";
export const cameraPermissionsMobileImg = config.apiUrl + "images/camerapermissions_mobile.png";

export const loginImg = config.apiUrl + "images/login.jpg";
export const registoImg = config.apiUrl + "images/registo.jpg";
export const registoSucImg = config.apiUrl + "images/registo_sucesso.jpg";
export const recuperarImg = config.apiUrl + "images/recuperar.jpg";
export const checkoutSucImg = config.apiUrl + "images/checkout_sucesso.jpg";
export const checkoutError1Img = config.apiUrl + "images/checkout_error1.jpg";
export const reservationSucImg = config.apiUrl + "images/reservation_sucesso.jpg";
export const videoConfImg = config.apiUrl + "images/videoconferencemen.png";

export const isMobile =
  typeof window !== "undefined"
    ? typeof window.orientation !== "undefined" || navigator.userAgent.indexOf("IEMobile") !== -1
    : false;

export const VEHICLES_ORDER_BY_PROPERTIES = [
  {
    value: "1-1",
    label: "Preço: Mais baixo"
  },
  {
    value: "1-2",
    label: "Preço: Mais alto"
  },
  {
    value: "2-1",
    label: "Ano: Mais baixo"
  },
  {
    value: "2-2",
    label: "Ano: Mais alto"
  },
  {
    value: "3-1",
    label: "Quilómetros: Mais baixo"
  },
  {
    value: "3-2",
    label: "Quilómetros: Mais alto"
  },
  {
    value: "4-1",
    label: "Cilindrada: Mais baixa"
  },
  {
    value: "4-2",
    label: "Cilindrada: Mais alta"
  },
  {
    value: "5-1",
    label: "Potência: Mais baixa"
  },
  {
    value: "5-2",
    label: "Potência: Mais alta"
  },
  {
    value: "6-2",
    label: "Mais recentes"
  }
];

export const PRODCUTS_ORDER_BY_PROPERTIES = [
  {
    value: "1-1",
    label: "Preço: Mais baixo"
  },
  {
    value: "1-2",
    label: "Preço: Mais alto"
  },
  {
    value: "2-2",
    label: "Mais recentes"
  }
];

export const ORDER_BY_ORIENTATIONS = [
  {
    value: 1,
    label: "Crescente"
  },
  {
    value: 2,
    label: "Decrescente"
  }
];