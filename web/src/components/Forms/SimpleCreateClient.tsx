import { useRouter } from "next/navigation";

export default function SimpleCreateClient() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center h-full">
      <div
        className="row mb-15px w-2/6
        bg-white
        shadow-lg
        mx-auto p-8
        rounded-xl
      "
      >
        <div className="mb-10px">
          <label className="form-label mb-24">RFC</label>
          <div className="mt-5px">
            <input
              type="text"
              className="form-control mb-5px w-full"
              // PLACEHOLDER CON EL RFC DEL CLIENTE
              placeholder="RFC"
            />
          </div>
        </div>

        {/* button */}
        <div className="flex justify-center mt-8">
          <button
            className="btn  btn-primary mt-3"
            onClick={() => {
              // eslint-disable-next-line no-console
              router.push("/load-client");
            }}
          >
            Cargar Factura
          </button>
        </div>
      </div>
    </div>
  );
}
