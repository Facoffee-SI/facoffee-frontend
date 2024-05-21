import { StrictMode } from 'react';
import AppRouter from './routers/AppRouter';
import './App.css';

function App() {
  return (
    <StrictMode>
      <AppRouter></AppRouter>
    </StrictMode>
  );
}

export default App;
