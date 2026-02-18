import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:500",
});

const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
