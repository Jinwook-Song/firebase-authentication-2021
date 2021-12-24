import { UserInfo } from '../components/App';
import { authService } from '../fbase';

function Home(user: UserInfo) {
  const onLogout = () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      authService.signOut();
    }
  };
  return (
    <div>
      <h2>You are Logged In</h2>
      {!user.emailVerified && <h4>email is not verified</h4>}
      <button onClick={onLogout}>Log out</button>
    </div>
  );
}

export default Home;
