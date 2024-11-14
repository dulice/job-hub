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
import { useRouter } from "vue-router";

export const useDeleteCompany = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deleteCompany(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Company", { id }] });
    },
  });
};

export const useGetCompany = (id, isMyProfile) => {
  return useQuery({
    queryKey: ["Company", { id }],
    queryFn: () => (isMyProfile?.value ? getCompany(id.value) : getCompany(id)),
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: (data) => registerUser(data),
    onSuccess: (data) => {
      queryClient.setQueryData(["User"], data);
      queryClient.invalidateQueries(["User"]);
      router.push("/login");
    },
  });
};

export const useSignIn = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: (data) => login(data),
    onSuccess: (data) => {
      queryClient.setQueryData(["User"], data);
      queryClient.invalidateQueries({ queryKey: ["User"] });
      router.push("/");
    },
  });
};

export const useGetUser = () => {
  return useQuery({
    queryKey: ["User"],
    queryFn: getUser,
    onSuccess: (data) => {
      console.log("dd", data);
    },
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
      queryClient.invalidateQueries({ queryKey: ["User"] });
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
