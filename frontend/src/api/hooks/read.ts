import axios from "axios";
import { BASE_URL } from "../constants";
import { useQuery } from "@tanstack/react-query";

export const useRead = (userId: string) => {
  return useQuery({
    queryKey: ["read", userId], // Include userId in the queryKey for cache purposes
    queryFn: () => {
      return axios.get(`${BASE_URL}/accounts/users/`, {});
    },
  });
};
