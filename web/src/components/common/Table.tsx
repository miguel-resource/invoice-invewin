import { getAllInvoices } from "@/services/Company";
import { Chip, Tooltip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import { faker } from "@faker-js/faker";
import { jsPDF } from "jspdf";


export default function TableGrid() {
  const router = useRouter();
  const company = useSelector((state: any) => state.company);
  const companyLogin = useSelector((state: any) => state.loginCompany);

  // const [data, setData] = useState([]); // TODO: Change to real data

  const showDataPDF = (data: any) => {
    const doc = new jsPDF();
    doc.setProperties({
      title: "Factura"
    });

    // Header 
    doc.setFillColor(0, 0, 0)
    doc.setFontSize(14);
 
    doc.rect(0, 0, 210, 40, "F");
    doc.text("Your Company Name", 10, 20);

    const gridWidth = 90;
    const gridHeight = 20;
    const leftMargin = 10;
    const topMargin = 70;
    doc.setLineWidth(0.3);


    doc.setFont("sans-serif", "normal");  
    doc.text("Fecha: " + new Date(data.date).toLocaleDateString()
      , leftMargin, topMargin - 10);

      // line
      doc.line(leftMargin, topMargin, leftMargin + gridWidth * 2, topMargin); 

    // Fiscal data like a grid with 2 columns
    doc.text("Serie: " + data.serie, leftMargin, topMargin + gridHeight);
    doc.text("Folio: " + data.folio, leftMargin + gridWidth, topMargin + gridHeight);

    doc.text("RFC Cliente: " + data.rfcClient, leftMargin, topMargin + gridHeight * 2);
    doc.text("Razón Social: " + data.nameClient , leftMargin + gridWidth, topMargin + gridHeight * 2);
    doc.line(leftMargin, topMargin + gridHeight * 3, leftMargin + gridWidth * 2, topMargin + gridHeight * 3);
    
    doc.text("Método de Pago: " + data.methodPayment, leftMargin, topMargin + gridHeight * 8);
    // total with
    doc.setFontSize(20);
    doc.setFont("sans-serif", "bold");
    doc.text("Total: " + data.total, leftMargin, topMargin + gridHeight * 9);

    doc.output("dataurlnewwindow");
  };
  useLayoutEffect(() => {
    if (!company.rfc) {
      router.push("/login-supplier");
    }
  }, [company]);

  const handleData = async () => { // TODO: Implement and discomment the useEffect
    const response = await getAllInvoices(
      companyLogin.email,
      companyLogin.password
    ).then((res) => {
      return res;
    });

    return response;
  };

  const createRandomInvoice = () => {
    return {
      id: faker.datatype.uuid(),
      date: faker.date.anytime(),
      folio: faker.datatype.uuid(),
      serie: faker.date.anytime().getFullYear(),
      rfcClient: faker.datatype.number(),
      nameClient: faker.person.fullName(),
      total: "$ " + faker.finance.amount(),
      methodPayment: faker.helpers.shuffle([
        "Efectivo",
        "Tarjeta",
        "Transferencia",
      ])[0],
      // actions: faker.datatype.number(),
    };
  };

  const data = faker.helpers.multiple(createRandomInvoice, {
    count: 100,
  });


  useEffect(() => {
    // handleData().then((res) => {
    //   setData(res.data);
    // });
  }, []);

  return (
    <DataGrid
      rows={data}
      columns={[
        {
          field: "date",
          headerName: "Fecha",
          type: "date",
          width: 130,
          editable: false,
          headerAlign: "center",
          align: "center",
        },
        {
          field: "serie",
          headerName: "Serie",
          width: 130,
          editable: false,
          headerAlign: "center",
          align: "center",
        },
        {
          field: "folio",
          headerName: "Folio",
          width: 300,
          editable: false,
          headerAlign: "center",
          align: "center",
        },
        {
          field: "rfcClient",
          headerName: "RFC del Cliente",
          width: 200,
          editable: false,
          headerAlign: "center",
          align: "center",
        },
        {
          field: "nameClient",
          headerName: "Razón Social",
          width: 300,
          editable: false,
          headerAlign: "center",
          align: "center",
        },
        {
          field: "total",
          headerName: "Total",
          width: 130,
          editable: false,
          headerAlign: "center",
          align: "center",
        },
        {
          field: "methodPayment",
          headerName: "Método de Pago",
          width: 130,
          editable: false,
          headerAlign: "center",
          renderCell: (params: any) => {
            return (
              <Chip
                label={params.value}
                className=" text-slate-100"
                variant="outlined"
                color="success"
              />
            );
          },
        },
        {
          field: "actions",
          headerName: "",
          width: 470,
          headerAlign: "center",
          renderCell: (params: any) => {
            return (
              <div className="flex justify-center space-x-2 mx-auto">
                <Tooltip title="Ver" arrow placement="right">
                  <button
                    onClick={() => showDataPDF(
                      {
                        date: params.row.date,
                        serie: params.row.serie,
                        folio: params.row.folio,
                        rfcClient: params.row.rfcClient,
                        nameClient: params.row.nameClient,
                        total: params.row.total,
                        methodPayment: params.row.methodPayment,
                      }

                    )}
                    className="p-1 w-11 rounded-full  ">
                    <i className="fa fa-eye text-slate-700"></i>
                  </button>
                </Tooltip>


              </div>
            );
          },
        },
      ]}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 20,
          },
        },
      }}
      pageSizeOptions={[10, 20, 50, 100]}
    />

  );
}
