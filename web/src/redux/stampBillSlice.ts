const initialState = {
    // {
    //     "Version":"4.0",
    //     "FormaPago":"01",
    //     "Serie":"FCO",
    //     "Folio":"420",
    //     "Fecha":"2022-06-03T01:30:23",
    //     "Sello":"",
    //     "NoCertificado":"",
    //     "Certificado":"",
    //     "CondicionesDePago":"CondicionesDePago",
    //     "SubTotal":"13788.78",
    //     "Descuento":"0.00",
    //     "Moneda":"MXN",
    //     "TipoCambio":"1",
    //     "Total":"14,201.75",
    //     "TipoDeComprobante":"I",
    //     "Exportacion":"01",
    //     "LugarExpedicion":"55040",
    //     "Emisor":{
    //        "Rfc":"EKU9003173C9",
    //        "Nombre":"ESCUELA KEMPER URGATE",
    //        "RegimenFiscal":"601"
    //     },
    //     "Receptor":{
    //        "Rfc":"XAXX010101000",
    //        "Nombre":"VENTA AL PUBLICO SUCURSAL VÍA MORELOS",
    //        "DomicilioFiscalReceptor":"55040",
    //        "RegimenFiscalReceptor":"616",
    //        "UsoCFDI":"CP01"
    //     },
    //     "Conceptos":[
    //        {
    //           "ClaveProdServ":"01010101",
    //           "NoIdentificacion":"O5694",
    //           "Cantidad":"1",
    //           "ClaveUnidad":"ACT",
    //           "Unidad":"Pieza",
    //           "Descripcion":"Venta",
    //           "ValorUnitario":"100.0000",
    //           "Importe":"100.0000",
    //           "Descuento":"0.00",
    //           "ObjetoImp":"01"
    //        },
    //        // ... (otros conceptos)
    //     ],
    //     "Impuestos":{
    //        "TotalImpuestosTrasladados":"412.97",
    //        "Traslados":[
    //           {
    //              "Base":"2581.03",
    //              "Importe":"412.97",
    //              "Impuesto":"002",
    //              "TasaOCuota":"0.160000",
    //              "TipoFactor":"Tasa"
    //           }
    //        ]
    //     }
    //  }

    version: "4.0",
    formaPago: "01",
    serie: "",
    folio: 0,
    fecha: "",
    sello: "",
    noCertificado: "",
    certificado: "",
    condicionesDePago: "",
    subTotal: 0,
    descuento: 0,
    moneda: "",
    tipoCambio: 0,
    total: 0,
    tipoDeComprobante: "",
    exportacion: "",
    lugarExpedicion: "",
    emisor: {
        rfc: "",
        nombre: "",
        regimenFiscal: ""
    
    },
    receptor: {
        rfc: "",
        nombre: "",
        domicilioFiscalReceptor: "",
        regimenFiscalReceptor: "",
        usoCFDI: ""
    },
    conceptos: [],
    impuestos: {
        totalImpuestosTrasladados: 0,
        traslados: []
    }
}