import axios from "axios";

const http = axios.create({
  baseURL: process.env.SW_SAPIEN_API_URL,
  headers: {
    password: process.env.SW_SAPIEN_API_PASSWORD,
    user: process.env.SW_SAPIEN_API_USER,
  },
});

export type DataBill = {
  Version: string;
  FormaPago: string;
  Serie: string;
  Folio: string;
  Fecha: string;
  MetodoPago: string;
  NoCertificado: string;
  // Certificado: string;
  SubTotal: string;
  Descuento: string;
  Moneda: string;
  Total: string;
  TipoDeComprobante: string;
  Exportacion: string;
  LugarExpedicion: string;
  Emisor: {
    Rfc: string;
    Nombre: string;
    RegimenFiscal: string;
  };
  Receptor: {
    Rfc: string;
    Nombre: string;
    DomicilioFiscalReceptor: string;
    RegimenFiscalReceptor: string;
    UsoCFDI: string;
  };
  Conceptos?: [
    {
      ClaveProdServ: string;
      Cantidad: string;
      ClaveUnidad: string;
      Unidad: string;
      Descripcion: string;
      ValorUnitario: string;
      Importe: string;
      Descuento: string;
      ObjetoImp: string;
      Impuestos: {
        Traslados: [
          {
            Base: string;
            Importe: string;
            Impuesto: string;
            TasaOCuota: string;
            TipoFactor: string;
          }
        ];
        Retenciones: [
          {
            Base: string;
            Importe: string;
            Impuesto: string;
            TasaOCuota: string;
            TipoFactor: string;
          }
        ];
      };
    }
  ];
  Impuestos?: {
    TotalImpuestosTrasladados: string;
    TotalImpuestosRetenidos?: string;
    Retenciones: [
      {
        Importe: string;
        Impuesto: string;
      }
    ];
    Traslados: [
      {
        Base: string;
        Importe: string;
        Impuesto: string;
        TasaOCuota: string;
        TipoFactor: string;
      }
    ];
  };
};

namespace SWSapienController {
  export const auth = async () => {
    const data = {};

    const response = await http
      .post(process.env.SW_SAPIEN_API_URL + "/security/authenticate", data, {
        headers: {
          password: process.env.SW_SAPIEN_API_PASSWORD,
          user: process.env.SW_SAPIEN_API_USER,
        },
      })
      .catch((error) => {
        console.log("ERROR", error);
      })
      .then((response: any) => {
        return response.data.data;
      });

    return response.token;
  };

  export const createBill = async (data: DataBill) => {
    const accessToken = await SWSapienController.auth();

    const response = await http
      .post(process.env.SW_SAPIEN_API_URL + "/v3/cfdi33/issue/json/v4", data, {
        headers: {
          Authorization: `bearer ${accessToken
            .replace(/\n/g, "")
            .replace(/\s/g, "")}`,
          "Content-Type": "application/jsontoxml",
        },
      })
      .catch((error) => {
        console.log("ERROR createBill", error.response.data);

        return error;
      })
      .then((response: any) => {
        return response;
      });

    return response;
  };

  export const getCertificateSerial = async (rfc: string) => {
    const accessToken = await SWSapienController.auth();

    const response = await http
      .get(process.env.SW_SAPIEN_API_URL + `/certificates/rfc/EKU9003173C9`, {
        headers: {
          Authorization: `bearer ${accessToken
            .replace(/\n/g, "")
            .replace(/\s/g, "")}`,
          "Content-Type": "application/json",
        },
      })
      .catch((error) => {
        console.log("ERROR getCertificateSerial", error);

        return error;
      })
      .then((response: any) => {
        return response.data;
      });

    return response;
  };
}

export default SWSapienController;
