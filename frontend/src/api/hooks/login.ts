import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../constants";
import { Account } from "../types/account";

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: Account) => {
      return axios.post(`${BASE_URL}/accounts/login/`, data);
    },
  });
};
