import React, { useState } from 'react';
import { TextField, Button, Box, Typography, CircularProgress } from '@mui/material';
import { backend } from 'declarations/backend';
import SearchIcon from '@mui/icons-material/Search';

type TaxPayer = {
  tid: bigint;
  firstName: string;
  lastName: string;
  address: string | null;
};

const TaxPayerSearch: React.FC = () => {
  const [searchTid, setSearchTid] = useState('');
  const [searchResult, setSearchResult] = useState<TaxPayer | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    setLoading(true);
    setError('');
    setSearchResult(null);

    try {
      const result = await backend.getTaxPayerByTID(BigInt(searchTid));
      if (result) {
        setSearchResult(result);
      } else {
        setError('No TaxPayer found with the given TID');
      }
    } catch (error) {
      console.error('Error searching for TaxPayer:', error);
      setError('An error occurred while searching for the TaxPayer');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="mb-8">
      <Box className="flex items-center mb-4">
        <SearchIcon fontSize="large" color="primary" />
        <Typography variant="h5" component="h2" className="ml-2">
          Search TaxPayer
        </Typography>
      </Box>
      <Box className="flex space-x-4 mb-4">
        <TextField
          label="TID"
          variant="outlined"
          value={searchTid}
          onChange={(e) => setSearchTid(e.target.value)}
          type="number"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          disabled={loading}
          startIcon={loading ? <CircularProgress size={24} /> : <SearchIcon />}
        >
          {loading ? 'Searching...' : 'Search'}
        </Button>
      </Box>
      {error && (
        <Typography color="error" gutterBottom>
          {error}
        </Typography>
      )}
      {searchResult && (
        <Box>
          <Typography variant="h6" gutterBottom>
            Search Result:
          </Typography>
          <Typography>TID: {searchResult.tid.toString()}</Typography>
          <Typography>First Name: {searchResult.firstName}</Typography>
          <Typography>Last Name: {searchResult.lastName}</Typography>
          <Typography>Address: {searchResult.address || 'N/A'}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default TaxPayerSearch;
