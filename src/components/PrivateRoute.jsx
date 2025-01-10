/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'

const isTokenValid = () => {
    const token = localStorage.getItem('access_token');
    if (!token) return false;

    const { exp } = jwtDecode(token); // Decode token
    const currentTime = Math.floor(Date.now() / 1000);
    return exp > currentTime;
};

const PrivateRoute = ({ children }) => {
    return isTokenValid() ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
