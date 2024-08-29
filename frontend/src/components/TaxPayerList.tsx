import React from 'react';
import { Typography, Box } from '@mui/material';
import DataTable from 'react-data-table-component';
import ListAltIcon from '@mui/icons-material/ListAlt';

type TaxPayer = {
  tid: bigint;
  firstName: string;
  lastName: string;
  address: string | null;
};

type TaxPayerListProps = {
  taxPayers: TaxPayer[];
};

const columns = [
  {
    name: 'TID',
    selector: (row: TaxPayer) => Number(row.tid),
    sortable: true,
  },
  {
    name: 'First Name',
    selector: (row: TaxPayer) => row.firstName,
    sortable: true,
  },
  {
    name: 'Last Name',
    selector: (row: TaxPayer) => row.lastName,
    sortable: true,
  },
  {
    name: 'Address',
    selector: (row: TaxPayer) => row.address || 'N/A',
    sortable: true,
  },
];

const TaxPayerList: React.FC<TaxPayerListProps> = ({ taxPayers }) => {
  return (
    <Box>
      <Box className="flex items-center mb-4">
        <ListAltIcon fontSize="large" color="primary" />
        <Typography variant="h5" component="h2" className="ml-2">
          TaxPayer Records
        </Typography>
      </Box>
      <DataTable
        columns={columns}
        data={taxPayers}
        pagination
        responsive
        highlightOnHover
        striped
      />
    </Box>
  );
};

export default TaxPayerList;
