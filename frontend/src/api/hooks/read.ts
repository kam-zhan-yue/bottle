import axios from "axios";
import { BASE_URL } from "../constants";
import { useQuery } from "@tanstack/react-query";

export const useRead = () => {
  return useQuery({
    queryKey: ["read"],
    queryFn: () => {
      return axios.get(`${BASE_URL}/accounts/users/`);
    },
  });
};
