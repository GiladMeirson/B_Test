import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { ThemeProvider, createTheme } from '@mui/material';
import { CssBaseline } from '@mui/material';
import cartReducer from './store/cartSlice';
import OrderScreen from './components/OrderScreen';
import SummaryScreen from './components/SummaryScreen';

const store = configureStore({
  reducer: {
    cart: cartReducer
  }
});

const theme = createTheme({
  direction: 'rtl',
  // Add any custom theme settings here
});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<OrderScreen />} />
            <Route path="/summary" element={<SummaryScreen />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;