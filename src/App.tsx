import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
// import Home from './components/Home';
import SignIn from './views/auth/signin';
import { FORGOT_PASSWORD } from './constants/routes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn></SignIn>}></Route>
        <Route path={FORGOT_PASSWORD} element={<SignIn></SignIn>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
