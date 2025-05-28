import {create} from "zustand/react";
import {createJSONStorage, persist} from "zustand/middleware";
import axios from "../api/axiosInstance.js";

const useAuthStore = create(
  persist((set) => ({
    user: null,
    accessToken: null,

    login: async (email, password) => {
      try {
        const res = await axios.post('/auth/login', {email, password}, {
          credentials: 'include'
        });
        set({accessToken: res.data.accessToken, user: res.data});
        return res;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },

    logout: async () => {
      try {
        const {accessToken} = useAuthStore.getState();

        const res = await axios.delete('/auth/logout', {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        set({accessToken: null, user: null});
        return res;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  }),
{
    name: 'pomodoro-app-auth',
    storage: createJSONStorage(() => localStorage),
    partialize: state => ({accessToken: state.accessToken})
  })
);

export default useAuthStore;