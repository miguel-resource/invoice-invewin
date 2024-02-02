import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

type Props = {
  data: any;
  columns: any;
};

export default function TableTickets({ data, columns }: Props) {
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
