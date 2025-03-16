import axios from "axios";
import { BASE_URL } from "../constants";
import { useMutation } from "@tanstack/react-query";
import { Forward } from "../types/forward";

export const useForward = () => {
  return useMutation({
    mutationFn: (data: Forward) => {
      return axios.post(`${BASE_URL}/api/forward-bottle/`, data);
    },
  });
};
