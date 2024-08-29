import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

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

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
