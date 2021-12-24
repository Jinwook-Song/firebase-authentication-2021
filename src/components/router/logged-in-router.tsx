import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../../routes/Home';
import { UserInfo } from '../App';

function LoggedInRouter(user: UserInfo) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home {...user} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default LoggedInRouter;
