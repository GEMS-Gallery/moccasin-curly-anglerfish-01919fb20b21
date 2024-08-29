import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Box, Typography } from '@mui/material';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';

type TaxPayerFormData = {
  firstName: string;
  lastName: string;
  address: string;
};

type TaxPayerFormProps = {
  onAddTaxPayer: (data: TaxPayerFormData) => void;
};

const TaxPayerForm: React.FC<TaxPayerFormProps> = ({ onAddTaxPayer }) => {
  const { control, handleSubmit, reset } = useForm<TaxPayerFormData>();

  const onSubmit = (data: TaxPayerFormData) => {
    onAddTaxPayer(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box className="flex flex-col space-y-4">
        <Box className="flex items-center mb-4">
          <AssignmentIndIcon fontSize="large" color="primary" />
          <Typography variant="h5" component="h2" className="ml-2">
            Add New TaxPayer
          </Typography>
        </Box>
        <Controller
          name="firstName"
          control={control}
          defaultValue=""
          rules={{ required: 'First name is required' }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="First Name"
              variant="outlined"
              error={!!error}
              helperText={error?.message}
            />
          )}
        />
        <Controller
          name="lastName"
          control={control}
          defaultValue=""
          rules={{ required: 'Last name is required' }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="Last Name"
              variant="outlined"
              error={!!error}
              helperText={error?.message}
            />
          )}
        />
        <Controller
          name="address"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Address"
              variant="outlined"
              multiline
              rows={3}
            />
          )}
        />
        <Button type="submit" variant="contained" color="primary" startIcon={<AssignmentIndIcon />}>
          Add TaxPayer
        </Button>
      </Box>
    </form>
  );
};

export default TaxPayerForm;
