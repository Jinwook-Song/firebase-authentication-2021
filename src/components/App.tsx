import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { authService } from '../fbase';
import Router from './Router';

export interface UserInfo {
  uid: string | null;
}

function App() {
  const [ready, setReady] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<UserInfo | null>();
  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if (user) {
        setLoggedInUser(user);
      } else {
        setLoggedInUser(null);
      }
      setReady(true);
    });
  }, []);

  console.log(loggedInUser);

  if (ready === false) {
    return <span>Loading...</span>;
  }

  return <Router uid={loggedInUser ? loggedInUser.uid : null} />;
}

export default App;
