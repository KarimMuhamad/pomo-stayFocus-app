import {createContext, useContext, useEffect, useState} from "react";
import axios from "../api/axiosInstance.js";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setAccessToken(token);
    }
  }, []);

  const login = async (identity, password) => {
    try {
      const res = await axios.post('/auth/login', {username: identity, password}, {
        credentials: 'include'
      });
      setAccessToken(res.data.accessToken);
      localStorage.setItem('accessToken', res.data.accessToken);
      setUser(res.data);
      console.log(res);
      return res;
    } catch (error) {
      console.log('Failed to login: ', error.response?.data?.message || error.message);
      console.log(error)
    }
  };
  const logout = async () => {
    try {
      const res = await axios.delete('/auth/logout', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      setAccessToken(null);
      localStorage.removeItem('accessToken');
      setUser(null);
      console.log(res);
      return res;
    } catch (error) {
      console.log('Failed to logout: ', error.response?.data?.message || error.message);
      console.log(error)
    }
  };

  return (
    <AuthContext.Provider value={{user, login, logout}}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);