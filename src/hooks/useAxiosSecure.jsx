import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const axiosSecure = axios.create({
  baseURL: "http://localhost:500",
});

const useAxiosSecure = () => {
  const { data: session } = useSession();

  useEffect(() => {
    const requestInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        if (session?.accessToken) {
          config.headers.Authorization = `Bearer ${session.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
    };
  }, [session]);

  return axiosSecure;
};

export default useAxiosSecure;
