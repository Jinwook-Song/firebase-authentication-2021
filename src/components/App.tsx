import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { authService } from '../fbase';
import LoggedInRouter from './router/logged-in-router';
import LoggedOutRouter from './router/logged-out-router';

// basic user info
export interface UserInfo {
  uid: string;
  email: string | null;
  emailVerified: boolean;
}

function App() {
  const [ready, setReady] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<UserInfo | null>(null);
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

  console.log('listener', loggedInUser);

  if (ready === false) {
    return <span>Loading...</span>;
  }

  return loggedInUser ? (
    <LoggedInRouter {...loggedInUser} />
  ) : (
    <LoggedOutRouter />
  );
}

export default App;
