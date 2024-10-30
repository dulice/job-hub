import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/vue-query";

import {
  addJob,
  deleteJob,
  getJob,
  getJobs,
  putJob,
  searchJobs,
} from "../api/jobApi";

export const useGetJobs = ({ limit }) => {
  return useInfiniteQuery({
    queryKey: ["jobs"],
    queryFn: ({ pageParam }) => getJobs({ pageParam, limit }),
    getNextPageParam: (lastPage, pages) => lastPage.nextPage,
  });
};

export const useSearchJobs = (q, location) => {
  return useQuery({
    queryKey: ["jobs", "search"],
    queryFn: () => searchJobs(q, location),
  });
};

export const useGetJob = (id) => {
  return useQuery({
    queryKey: ["jobs", { id }],
    queryFn: () => getJob(id),
    enabled: !!id,
    refetchOnWindowFocus: true,
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
