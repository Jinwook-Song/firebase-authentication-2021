import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Auth from '../routes/Auth';
import Home from '../routes/Home';
import { UserInfo } from './App';

function Router({ uid }: UserInfo) {
  // User not Logged In Router
  if (!uid) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Auth />} />
        </Routes>
      </BrowserRouter>
    );
  }

  // User Logged In Router
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
