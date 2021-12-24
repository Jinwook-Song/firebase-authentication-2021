import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../../routes/Home';
import { UserInfo } from '../App';

function LoggedInRouter(user: UserInfo) {
  console.log('login', user);
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default LoggedInRouter;
