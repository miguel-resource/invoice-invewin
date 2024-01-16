const details = [
  {
    name: "Subtotal",
    value: "$ 1000.00",
  },
  {
    name: "Total",
    value: "$ 1000.00",
  },
];

export default function AmountDetails() {
  return (
    <div className="panel panel-inverse p-16">
      <div
        className="border-b-2 border-gray-300 mb-4 "
      >
        <h3
          className="text-base
            font-bold
            text-gray-500"
        >
          00000000-0000-0000-0000-000000000000
        </h3>

        <section>
          <ul className="pl-0
            flex flex-col gap-2
          ">
            <li
              className="text-xs
                        text-gray-500
                        font-light"
            >
              <span
                className="text-xs
                            text-gray-500
                            font-semibold"
              >
                Para:{" "}
              </span>
              Nombre del cliente
            </li>

            <li className=" text-xs text-gray-500 font-light ">
              <span
                className="
                            text-xs
                            text-gray-500
                            font-semibold 
                            "
              >
                De:{" "}
              </span>
              Nombre de la empresa
            </li>
          </ul>
        </section>
      </div>

      <div className="flex flex-col justify-between mt-2">
        {details.map((detail) => (
          <div className="flex justify-between items-center ">


            {detail.name === "Total" ? (
              <p className="text-2xl text-slate-700 font-semibold ">
                {detail.name}
              </p>
            ) : (
              <p className="text-lg text-slate-400 font-semibold ">
                {detail.name}
              </p>
            )}

            {detail.name === "Total" ? (
              <p className=" text-2xl text-gray-700 font-semibold ">
                {detail.value}
              </p>
            ) : (
              <p className=" text-lg text-slate-700 font-semibold ">
                {detail.value}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
