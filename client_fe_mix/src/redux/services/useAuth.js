import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from './authSlice'; // Adjust import paths as necessary

const useAuth = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const loginUser = async (credentials) => {
    dispatch(login(credentials));
  };

  const logoutUser = () => {
    dispatch(logout());
  };

  return { user, isAuthenticated, loginUser, logoutUser };
};

export default useAuth;
