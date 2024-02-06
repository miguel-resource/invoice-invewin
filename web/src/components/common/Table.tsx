import { getAllInvoices } from "@/services/Company";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import { faker } from "@faker-js/faker";

type Props = {
  columns: any;
};

export default function TableGrid({ columns }: Props) {
  const router = useRouter();
  const company = useSelector((state: any) => state.company);
  const companyLogin = useSelector((state: any) => state.loginCompany);  

  // const [data, setData] = useState([]);

  useLayoutEffect(() => {
    if (!company.rfc) {
      router.push("/login-supplier");
    }
  }, [company]);

  const handleData = async () => {
    console.log("COMPANY LOGIN", companyLogin);
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
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5, 10, 20]}
      />
    
  );
}
