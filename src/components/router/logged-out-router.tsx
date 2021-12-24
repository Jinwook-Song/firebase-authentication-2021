import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Auth from '../../routes/Auth';

function LoggedOutRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
}

export default LoggedOutRouter;
