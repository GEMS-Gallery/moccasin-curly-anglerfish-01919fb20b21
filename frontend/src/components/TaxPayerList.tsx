import React from 'react';
import { Typography } from '@mui/material';
import DataTable from 'react-data-table-component';

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
    <div>
      <Typography variant="h5" component="h2" gutterBottom>
        TaxPayer Records
      </Typography>
      <DataTable
        columns={columns}
        data={taxPayers}
        pagination
        responsive
        highlightOnHover
        striped
      />
    </div>
  );
};

export default TaxPayerList;
