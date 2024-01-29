import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";
import { useSelector } from "react-redux";

type Props = {
  data: any;
  columns: any;
};

export default function TableGrid({ data, columns }: Props) {
  const router = useRouter();
  const company = useSelector((state: any) => state.company);

  useLayoutEffect(() => {
    // if (!company.rfc) {
    //   router.push("/login-supplier");
    // }
  }, [company]);

  return (
    <Box
      sx={{
        height: "fit-content",
        width: "100%",
        textAlign: "center",
      }}
    >
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
        checkboxSelection
      />
    </Box>
  );
}
