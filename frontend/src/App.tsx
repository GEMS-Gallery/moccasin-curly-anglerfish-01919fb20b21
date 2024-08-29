import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, CircularProgress, IconButton } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import TaxPayerForm from './components/TaxPayerForm';
import TaxPayerList from './components/TaxPayerList';
import TaxPayerSearch from './components/TaxPayerSearch';
import { backend } from 'declarations/backend';

type TaxPayer = {
  tid: bigint;
  firstName: string;
  lastName: string;
  address: string | null;
};

const App: React.FC = () => {
  const [taxPayers, setTaxPayers] = useState<TaxPayer[]>([]);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const lightTheme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#ff6b6b',
      },
      secondary: {
        main: '#4ecdc4',
      },
      background: {
        default: '#f7fff7',
        paper: '#ffe66d',
      },
    },
  });

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#ff6b6b',
      },
      secondary: {
        main: '#4ecdc4',
      },
      background: {
        default: '#2f3e46',
        paper: '#354f52',
      },
    },
  });

  useEffect(() => {
    fetchTaxPayers();
  }, []);

  const fetchTaxPayers = async () => {
    try {
      const result = await backend.getAllTaxPayers();
      setTaxPayers(result);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tax payers:', error);
      setLoading(false);
    }
  };

  const handleAddTaxPayer = async (newTaxPayer: Omit<TaxPayer, 'tid'>) => {
    try {
      const result = await backend.createTaxPayer(
        newTaxPayer.firstName,
        newTaxPayer.lastName,
        newTaxPayer.address
      );
      if ('ok' in result) {
        fetchTaxPayers();
      } else {
        console.error('Error adding tax payer:', result.err);
      }
    } catch (error) {
      console.error('Error adding tax payer:', error);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box className={`my-8 retro-gradient ${darkMode ? 'dark' : ''}`}>
          <Box className="flex justify-between items-center mb-4">
            <Typography variant="h3" component="h1" gutterBottom>
              TaxPayer Management System
            </Typography>
            <IconButton onClick={toggleDarkMode} color="inherit">
              {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Box>
          <Box className="mb-8">
            <TaxPayerForm onAddTaxPayer={handleAddTaxPayer} />
          </Box>
          <Box className="mb-8">
            <TaxPayerSearch />
          </Box>
          {loading ? (
            <CircularProgress />
          ) : (
            <TaxPayerList taxPayers={taxPayers} />
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default App;
