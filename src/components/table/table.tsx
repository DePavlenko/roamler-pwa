import { styled } from "@mui/material/styles";
import {
  TableContainer,
  Table as MUITable,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  tableCellClasses,
  Paper,
  CircularProgress,
  Box,
  Alert,
  TableCellProps,
} from "@mui/material";
import { Status } from "../../types/app";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(even)": {
    backgroundColor: theme.palette.tertiary.light,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.tertiary.main,
    color: theme.palette.tertiary.contrastText,
    fontWeight: 700,
  },
}));

export type TableContent<T> = {
  title: string;
  render: (data: T) => string | JSX.Element;
  thProps?: TableCellProps;
  tdProps?: TableCellProps;
};

export interface TableProps<T> {
  data: T[];
  content: TableContent<T>[];
  status: Status;
  error?: string;
}

export const Table = <T,>({ status, data, error, content }: TableProps<T>) => {
  const renderLoading = () => {
    return (
      <StyledTableRow>
        <StyledTableCell colSpan={content.length}>
          <Box sx={{ display: "flex", justifyContent: "center", my: 5 }}>
            <CircularProgress data-testid="progress" />
          </Box>
        </StyledTableCell>
      </StyledTableRow>
    );
  };

  const renderContent = () => {
    return data.map((item, idx) => (
      <StyledTableRow key={idx}>
        {content.map(({ render, tdProps }, i) => (
          <StyledTableCell key={i} {...tdProps}>
            {render(item)}
          </StyledTableCell>
        ))}
      </StyledTableRow>
    ));
  };

  const renderError = () => {
    return (
      <StyledTableRow>
        <StyledTableCell colSpan={content.length}>
          <Box sx={{ display: "flex", justifyContent: "center", my: 5 }}>
            <Alert variant="filled" severity="error" data-testid="error">
              {error || "Something went wrong"}
            </Alert>
          </Box>
        </StyledTableCell>
      </StyledTableRow>
    );
  };

  return (
    <TableContainer component={Paper}>
      <MUITable sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {content.map(({ title, thProps }, idx) => (
              <StyledTableCell key={idx} {...thProps}>
                {title}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {status === "loading" && renderLoading()}
          {status === "idle" && renderContent()}
          {status === "failed" && renderError()}
        </TableBody>
      </MUITable>
    </TableContainer>
  );
};

export default Table;
