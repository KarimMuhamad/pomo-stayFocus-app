import {create} from "zustand/react";
import axios from "../api/axiosInstance.js";
import {clearAuthToken, getAuthToken} from "../utils/auth.js";

const useAuthStore = create(
  (set) => ({
    user: null,
    accessToken: null,

    login: async (email, password) => {
      try {
        const res = await axios.post('/auth/login', {email, password}, {
          credentials: 'include',
          skipAuth: true
        });
        set({accessToken: res.data.accessToken, user: res.data});
        localStorage.setItem("accessToken", res.data.accessToken);
        return res;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },

    logout: async () => {
      try {
        const res = await axios.delete('/auth/logout');
        set({accessToken: null, user: null});
        clearAuthToken();
        return res;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },

    initializeUser: async () => {
      const token = getAuthToken();
      if (!token) return;

      try {
        const res = await axios.get('/users/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        set({user: res.data});
      } catch (err) {
        console.log(err);
        localStorage.removeItem('accessToken');
        set({accessToken: null, user: null});
      }
    }
}));

export default useAuthStore;