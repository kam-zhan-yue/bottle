import axios from "axios";
import { BASE_URL } from "../constants";
import { useMutation } from "@tanstack/react-query";
import { Reply } from "../types/reply";

export const useReply = () => {
  return useMutation({
    mutationFn: (data: Reply) => {
      return axios.post(`${BASE_URL}/api/reply/`, data);
    },
  });
};
