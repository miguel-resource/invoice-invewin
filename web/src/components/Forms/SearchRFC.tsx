import { FormikProps } from "formik";
import { RFCInitial } from "../../schemas/RFC";
import { CircularProgress } from "@mui/material";

type Props = {
  formik: FormikProps<typeof RFCInitial>;
  isSearchingRFC: boolean;
  showSearchButton: boolean;
};

export const SearchRFC = ({
  formik,
  isSearchingRFC,
  showSearchButton,
}: Props) => {
  return (
    <form
      className="flex  justify-center h-full gap-2 flex-col mb-10 border-b-2 pb-4"
      onSubmit={formik.handleSubmit}
    >
      <label className="form-label">Agrega tu RFC para facturar</label>

      <p className="text-xs text-gray-500 italic">
        Si no estás registrado, te pediremos tus datos fiscales
      </p>

      <div className="w-full flex flex-row gap-2">
        <input
          type="text"
          className="form-control mb-5px w-full"
          placeholder="RFC"
          name="rfc"
          id="rfc"
          value={formik.values.rfc}
          onChange={formik.handleChange}
        />

        {showSearchButton && (
          <button
            type="submit"
            className="w-1/12 
              bg-slate-800 
              hover:bg-slate-700
              text-slate-100 
              font-bold 
              rounded-lg
              py-2 
              px-4 
              focus:outline-none 
              focus:shadow-outline h-9 flex items-center justify-center"
          >
            {isSearchingRFC ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              <i className="fa fa-search"></i>
            )}
          </button>
        )}
      </div>

      {/* <ErrorMessage name="user"/> */}

      <span
        className="text-red-500 text-xs italic"
        style={{ display: "block" }}
      >
        {formik.errors.rfc}
      </span>

      {/* S */}
    </form>
  );
};
