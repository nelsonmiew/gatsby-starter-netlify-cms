import React from "react";

export const NumberFormat = (value) => {
  const result = Number(value);
  if (isNaN(result)) {
    return 0;
  } else return result;
};

export const EuroFormat = (value) => {
  return (
    (!isNaN(value) ? value : 0)
      .toString()
      .replace(".", ",")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "€"
  );
};

export const EuroFormat2Decimals = (value) => {
  return (
    (!isNaN(value) ? value : 0)
      .toFixed(2)
      .toString()
      .replace(".", ",")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "€"
  );
};

export const KmFormat = (value) => {
  return (!isNaN(value) ? value : 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " km";
};

export const FuelConsumptionFormat = (value) => {
  return (
    (!isNaN(value) ? value : 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) +
    " l/100 km"
  );
};

export const Co2EmissionsFormat = (value) => {
  return (
    (!isNaN(value) ? value : 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) +
    " g CO₂/km"
  );
};

export const TaxFormat = (value) => {
  return (
    ((!isNaN(value) ? value : 0) * 100).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 3,
    }) + "%"
  );
};

export const TaxFormat2Decimals = (value) => {
  return (
    ((!isNaN(value) ? value : 0) * 100)
      .toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
      .replace(/[.]/, ",") + "%"
  );
};

export const BooleanCheckboxFormat = (value) => {
  return <input type="checkbox" className="form-check-input" readOnly checked={value}></input>;
};

export const BooleanValueFormat = (value) => {
  return value ? "Sim" : "Não";
};

export const DisplacementFormat = (value) => {
  return value + " cm³";
};

export const IsLeftSteeringFormat = (value) => {
  return value ? "Volante à esquerda" : "Volante à direita";
};

export const EngineTypeFormat = (value) => {
  const nameValue = (value && value.name) || value;
  switch (nameValue) {
    case "DIESEL":
      return "Gasóleo";
    case "PETROL":
      return "Gasolina";
    case "BIO_DIESEL":
      return "Bio Diesel";
    case "CNG":
      return "Gás Natural";
    case "ELETRIC":
      return "Eletrico";
    case "ETHANOL":
      return "Etanol";
    case "HYDROGEN":
      return "Hidrogénio";
    case "LPG":
      return "GPL";
    case "HYBRID_PETROL":
      return "Híbrido (Gasolina)";
    case "HYBRID_DIESEL":
      return "Híbrido (Gasóleo)";
    default:
      break;
  }
  return nameValue;
};

export const VehicleTypeFormat = (value) => {
  const nameValue = value.name || value;
  switch (nameValue) {
    case "CAR":
      return "Carro";
    case "MOTO":
      return "Motociclos";
    case "BIKE":
      return "Bicicleta";
    case "BOAT":
      return "Barco";
    default:
      break;
  }
  return nameValue;
};

export const FinancialTypeFormat = (value, financeTypeValues) => {
  if (!financeTypeValues) return value;

  if (financeTypeValues.financeTypes) {
    const getName = financeTypeValues.financeTypes.find((x) => x.id === value);
    if (getName && getName.name) {
      switch (getName.name) {
        case "CREDITO":
          return "Crédito";
        case "CASH":
          return "Pronto-pagamento";
        case "LEASING":
          return "Leasing";
        case "RENTING":
          return "Renting";
        default:
          return getName.name;
      }
    }
  }
  return value;
};

export const OrderStatusFormat = (value) => {
  switch (value) {
    case "AWAITING_PAYMENT":
      return "Aguarda Pagamento";
    case "PAYMENT_ON_CONFIRMATION":
      return "Aguarda Confirmação de Pagamento";
    case "PAYMENT_FAILED":
      return "Pagamento Falhou";
    case "PROCESSING":
      return "Em processamento";
    case "PENDING_INFORMATION":
      return "Informação Pendente";
    case "DOCUMENTATION_UNDER_REVIEW":
      return "Documentação em revisão";
    case "IN_PREPARATION":
      return "Em preparação";
    case "EXPEDITED":
      return "Expedido";
    case "DONE":
      return "Concluida/Fechada";
    case "CANCELED":
      return "Cancelada";
    case "REFUNDED":
      return "Reembolso";
    default:
      return value;
  }
  //return value;
};

export const DocumentTypesFormat = (value) => {
  switch (value) {
    case "IRS_DECLARATION": // 1
      return "Declaração IRS";
    case "SALARIES": //2
      return "Folha de Vencimento";
    case "BANK_STATEMENTS": //3
      return "Extrato Bancário";
    case "ADDRESS_PROOF": //4
      return "Comprovativo de morada";
    case "NIB_PROOF": //5
      return "Comprovativo de NIB";
    case "GUARANTOR_IDENTITY_CARD": //6
      return "Cartão de Cidadão do Avalista";
    case "GUARANTOR_SALARIES": //7
      return "Folha de Vencimento do Avalista";
    case "GUARANTOR_BANK_STATEMENTS": //8
      return "Extrato Bancário do Avalista";
    case "GENERIC": //9
      return "Outro Documento";
    case "FINAL_CONTRACT": //10
      return "Contrato Final";

    case "IDENTITY_CARD":
      return "Cartão de Cidadão";
    case "DRIVE_LICENSE":
      return "Carta de condução";
    case "EMPLOYMENT_CONTRACT":
      return "Contrato de trabalho";

    default:
      return value;
  }
};

export const StringToSlug = (str) => {
  str = str.replace(/^\s+|\s+$/g, ""); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = "åàáãäâèéëêìíïîòóöôùúüûñç·/_,:;";
  var to = "aaaaaaeeeeiiiioooouuuunc------";

  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
  }

  str = str
    .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
    .replace(/\s+/g, "-") // collapse whitespace and replace by -
    .replace(/-+/g, "-") // collapse dashes
    .replace(/^-+/, "") // trim - from start of text
    .replace(/-+$/, ""); // trim - from end of text

  return str;
};

export const FormatArray = {
  displacement: DisplacementFormat,
  euro: EuroFormat,
  tax: TaxFormat,
  bool: BooleanValueFormat,
  isLeftSteering: IsLeftSteeringFormat,
  engineType: EngineTypeFormat,
  vehicleType: VehicleTypeFormat,
  financialType: FinancialTypeFormat,
  orderStatus: OrderStatusFormat,
  documentType: DocumentTypesFormat,
  stringToSlug: StringToSlug,
};

export const GetFormatValue = (value, type) => {
  if (FormatArray[type]) return FormatArray[type](value);
  if (type) console.warn("Value formater type =  '" + type + "' not found!");
  return value;
};

export const GetNumber = (v) => {
  const result = Number(v);
  if (isNaN(result)) {
    return 0;
  } else return result;
};
