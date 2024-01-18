import Koa from "koa";

import convertExcelToJson from "convert-excel-to-json";


const catalogPath = "public/catalogs/";

export const getAllCatalogs = async (ctx: Koa.Context) => {

    const cUsoCFDI = convertExcelToJson({
        sourceFile: catalogPath + "uso_cfdi.xlsx",
        header: {
            rows: 0
        },
        columnToKey: {
            A: 'clave',
            B: 'descripcion'
        },
    });

    const cRegimenFiscal = convertExcelToJson({
        sourceFile: catalogPath + "regimen_fiscal.xlsx",
        header: {
            rows: 1
        },
        columnToKey: {
            A: 'clave',
            B: 'descripcion',
            C: 'fisisca',
            D: 'moral'
        }
    });

    const cMetodoPago = convertExcelToJson({
        sourceFile: catalogPath + "metodo_pago.xlsx",
        header: {
            rows: 0
        },
        columnToKey: {
            A: 'clave',
            B: 'descripcion'
        }
    });





    return {
        cUsoCFDI,
        cRegimenFiscal,
        cMetodoPago
    }
}