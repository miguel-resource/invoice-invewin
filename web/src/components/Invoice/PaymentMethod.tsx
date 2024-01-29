export const PaymentMethod = () => {
  return (
    <form
      className="flex  justify-center h-full gap-2 flex-col border-b-2 pb-10"
      //   onSubmit={formik.handleSubmit}
    >
      <label className="form-label">Método de pago</label>

      <div className="w-full flex flex-row gap-2">
        <select name="paymentMethod" id="paymentMethod" className="form-control form-select mb-5px w-full">
            <option value="01">Efectivo</option>
            <option value="02">Cheque nominativo</option>
            <option value="03">Transferencia electrónica de fondos</option>
            <option value="04">Tarjeta de crédito</option>
            <option value="05">Monedero electrónico</option>
            <option value="06">Dinero electrónico</option>
            <option value="08">Vales de despensa</option>
            <option value="12">Dación en pago</option>
            <option value="13">Pago por subrogación</option>
            <option value="14">Pago por consignación</option>
            <option value="15">Condonación</option>
            <option value="17">Compensación</option>
            <option value="23">Novación</option>
            <option value="24">Confusión</option>
            <option value="25">Remisión de deuda</option>
            <option value="26">Prescripción o caducidad</option>
            <option value="27">A satisfacción del acreedor</option>
            <option value="28">Tarjeta de débito</option>
            <option value="29">Tarjeta de servicios</option>
            <option value="30">Aplicación de anticipos</option>
            <option value="31">Intermediario pagos</option>
            <option value="99">Por definir</option>
        </select>

      </div>
    </form>
  );
};
