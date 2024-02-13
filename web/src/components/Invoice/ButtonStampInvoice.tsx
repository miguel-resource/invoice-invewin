
type Props = {
  isValidToStamp: boolean;
  handleStampBill: () => void;
};


export const ButtonStampInvoice = ({ isValidToStamp, handleStampBill }: Props) => {


  return (
    <div>
      <button
        type="button"
        // className="bg-slate-700 text-slate-100 
        // hover:bg-slate-800  font-bold py-2 px-10 rounded-full ease-out duration-500"
        // onClick={formik.handleSubmit}
        disabled={!isValidToStamp}
        onClick={handleStampBill}
        className={`bg-slate-700 text-slate-100
        ${!isValidToStamp ? "opacity-50 cursor-not-allowed" : ""}
        hover:bg-slate-800  font-bold py-2 px-10 rounded-full ease-out duration-500`}
        
      >
        Timbrar
      </button>
    </div>
  );
}
