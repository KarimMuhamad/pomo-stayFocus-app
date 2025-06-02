import {create} from "zustand/react";
import axios from "../api/axiosInstance.js";

const useLabelsStore = create((set, get) => ({
  labels: [],
  error: null,
  isLoading: false,
  getLabels: async () => {
    try {
      const res = await axios.get('/labels');
      console.log(res);
      set({labels: res.data.data, isLoading: false});
    } catch (error) {
      set({error, isLoading: false});
    }
  }
}));

export default useLabelsStore;