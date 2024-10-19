import React from 'react';
import { ThemeProvider } from './components/ThemeContext';
import Dashboard from './components/Dashboard';
import Header from './components/Header';

function App() {
  return (
    <ThemeProvider>
      <Header />
      <Dashboard />
    </ThemeProvider>
  );
}

export default App;
