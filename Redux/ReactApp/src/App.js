import {Fragment} from 'react';
import Counter from './components/Counter';
import Auth from './components/Auth';
import Header from './components/Header';
import UserProfile from './components/UserProfile';
import {useSelector} from 'react-redux';
// import { authActions } from '../store/index';


function App() {
  let isAuth = useSelector(state => state.auth.isAuthenticated);

  return (
    <Fragment>
      <Header />
      {isAuth && <UserProfile />}
      {!isAuth && <Auth />}
      <Counter />
    </Fragment>
  );
}

export default App;
