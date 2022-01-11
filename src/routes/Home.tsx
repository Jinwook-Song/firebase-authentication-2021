import { UserInfo } from '../components/App';
import { authService } from '../fbase';
import { sendEmailVerification } from 'firebase/auth';

function Home(user: UserInfo) {
  const onLogout = () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      authService.signOut();
    }
  };

  const onEmailVerify = () => {
    sendEmailVerification(authService.currentUser!).then(() => {
      alert('Email verification sent!');
    });
  };

  return (
    <div>
      <h2>You are Logged In</h2>
      {!user.emailVerified && (
        <div>
          <h4>email is not verified</h4>
          <button onClick={onEmailVerify}>Click to verify &rarr;</button>
        </div>
      )}
      <button onClick={onLogout}>Log out</button>
    </div>
  );
}

export default Home;
