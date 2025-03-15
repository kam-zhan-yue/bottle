import { useMutation } from "@tanstack/react-query";
import { Account } from "../types/account";
import { BASE_URL } from "../constants";
import axios from "axios";

export function useCreateAccount() {
  return useMutation({
    mutationFn: (data: Account) => {
      return axios.post(`${BASE_URL}/accounts/register`, data);
    },
  });
}
