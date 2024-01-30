import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  fecha: "",
  vencimiento: "",
  serie: "string",
  folio: 0,
  importe: 0,
  descuento: 0,
  subtotal: 0,
  total: 0,
  cambio: 0,
  iva: 0,
  ieps: 0,
  saldo: 0,
  cargo: 0,
  abono: 0,
  turno: 0,
  formaDePago: "",
  emisor: {
    empresaId: "",
    rfc: "",
    razonSocial: "",
  },
  diasDePlazo: 0,
  claveMovimiento: "",
  inventario: 0,
  pedido: "",
  estatus: "",
  fechaOriginal: "",
  serieOriginal: "",
  folioOriginal: 0,
  leyenda1: "",
  leyenda2: "",
  leyenda3: "",
  periodo: 0,
  mes: 0,
  hora: "",
  referencia: "",
  ies: 0,
  flete: 0,
  retencionIva: 0,
  retencionIsr: 0,
  descuentoFactura: 0,
  observaciones: "",
  metodoDePago: 0,
  numeroDePersonasMesa: 0,
  tipoCambio: 0,
  estatusFactura: 0,
  condiciones: "",
  uuid: "",
  envioDomicilio: 0,
  fechaEntrega: "2024-01-17T16:09:42.017Z",
  horaEntrega: "2024-01-17T16:09:42.017Z",
  moneda: "",
  cliente: 0,
  cajero: "",
  almacen: 0,
  vendedor: "",
  proveedor: "",
  identificador: 0,
  fechaCreacion: "2024-01-17T16:09:42.017Z",
  fechaModificacion: "2024-01-17T16:09:42.017Z",
  sucursalId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  usuarioId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  empresaId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  detallesMovimiento: [
    {
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      cantidad: 0,
      precioUnitario: 0,
      descuento: 0,
      importe: 0,
      costo: 0,
      costoUltimo: 0,
      costoPromedio: 0,
      costoAdquisicion: 0,
      precio: 0,
      descuento1: 0,
      descuento2: 0,
      descuento3: 0,
      descuento4: 0,
      descuento5: 0,
      claveProducto: "string",
      nombreProducto: "string",
      descripcion: "string",
      claveIva: "string",
      tasaIva: 0,
      claveUnidad: "string",
      nombreUnidad: "string",
      peso: 0,
      precioLista: "string",
      entrada: 0,
      salida: 0,
      claveIeps: "string",
      tasaIeps: 0,
      claveIes: "string",
      tasaIes: 0,
      claveRetencionIva: "string",
      retencionIva: 0,
      claveRetencionIsr: "string",
      retencionIsr: 0,
      centroDeCostos: "string",
      codigoAlterno: "string",
      corrida: "string",
      fraccion: 0,
      claveMoneda: "string",
      nombreMoneda: "string",
      tipoDeCambio: 0,
      puntos: 0,
      cuentaPredial: "string",
      observaciones: "string",
      referencia: "string",
      serieOriginal: "string",
      folioOriginal: 0,
      cantidadOriginal: 0,
      claveSatProducto: "string",
      claveSatUnidad: "string",
      saldo: 0,
      vendedor: "string",
      estatus: 0,
      idMovimiento: 0,
      iddMovimiento: 0,
      almacen: 0,
      nombreAlmacen: "",
      departamento: "",
      nombreDepartamento: "",
      proveedor: "",
      nombreProveedor: "",
      subdepartamento: "",
      fechaCreacion: "2024-01-17T16:09:42.017Z",
      fechaModificacion: "2024-01-17T16:09:42.017Z",
      movimientoId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      empresaId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    },
  ],
};

export const saleSlice = createSlice({
  name: "sale",
  initialState: [],
  reducers: {
    setSale: (state: any, action) => {
      const sale = action.payload;
      console.log(sale);
      state.push(sale);
      console.log(state);
    },
    removeSpecificSale: (state: any, action) => {
      const sale = action.payload;
      console.log(sale.id);
      state.filter((foundedSale: any) => foundedSale.id === sale.id);

      console.log(state);

      const index = state.findIndex((sale: any) => sale.id === sale.id);

      state.splice(index, 1);
      

      

    }


  },
});

export const { setSale, removeSpecificSale } = saleSlice.actions;
export const selectSale = (state: any) => state.sale;
export default saleSlice.reducer;
