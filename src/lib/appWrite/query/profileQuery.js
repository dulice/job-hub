import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import {
  deleteCompany,
  getCompany,
  getUser,
  login,
  registerUser,
  saveUnsaveJob,
  signout,
  updateUser,
} from "../api/profileApi";

export const useDeleteCompany = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deleteCompany(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Company", { id }] });
    },
  });
};

export const useGetCompany = (id) => {
  return useQuery({
    queryKey: ["Company", { id }],
    queryFn: () => getCompany(id),
    enabled: !!id,
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => registerUser(data),
    onSuccess: (data) => {
      queryClient.setQueryData(["User"], data),
        queryClient.invalidateQueries(["User"]);
    },
  });
};

export const useSignIn = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => login(data),
    onSuccess: (data) => {
      queryClient.setQueryData(["User"], data),
        queryClient.invalidateQueries(["User"]);
    },
  });
};

export const useGetUser = () => {
  return useQuery({
    queryKey: ["User"],
    queryFn: getUser,
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateUser(id, data),
    onSuccess: (data) => {
      queryClient.setQueryData(["User"], data);
      queryClient.invalidateQueries(["User"]);
    },
  });
};

export const useSaveUnsaveJob = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, jobId }) => saveUnsaveJob(id, jobId),
    onSuccess: (data) => {
      queryClient.setQueryData(["User"], data);
      queryClient.invalidateQueries(["User"]);
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: signout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["User"] });
    },
  });
};
