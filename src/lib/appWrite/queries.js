import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import {
  addJob,
  deleteCompany,
  deleteJob,
  getCompany,
  getJob,
  getJobs,
  getUser,
  login,
  putJob,
  registerUser,
  signout,
  updateUser,
} from "./api";

export const useGetJobs = () => {
  return useQuery({
    queryKey: ["jobs"],
    queryFn: getJobs,
  });
};

export const useGetJob = (id) => {
  return useQuery({
    queryKey: ["jobs", { id }],
    queryFn: () => getJob(id),
  });
};

export const useUpdateJob = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => putJob(id, data),
    onSuccess: (data) => {
      queryClient.setQueryData(["jobs", { id: data.$id }], data);
      queryClient.invalidateQueries(["jobs", { id: data.$id }]);
    },
  });
};

export const useAddJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => addJob(data),
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: ["jobs"] });
      const snapshot = queryClient.getQueryData(["jobs"]);
      queryClient.setQueryData(["jobs"], (old) => [...old, data]);
      return { snapshot };
    },
    onError: (err, data, context) => {
      queryClient.setQueryData(["jobs"], context.snapshot);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
  });
};

export const useDeleteJob = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deleteJob(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
  });
};

export const useDeleteCompany = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deleteCompany(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Company", {id}] });
    },
  });
};

export const useGetCompany = (id) => {
  return useQuery({
    queryKey: ["Company", {id}],
    queryFn: () => getCompany(id),
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

export const useLogout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: signout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["User"] });
    },
  });
};
