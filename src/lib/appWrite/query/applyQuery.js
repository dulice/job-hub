import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { getJobByUser, postApply } from "../api/applyApi";

export const useApplyJob = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['apply'],
        mutationFn: (data) => postApply(data),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['apply']})
        }
    })
}

export const useGetJobByUser = (id) => {
    return useQuery({
        queryKey: ['apply', {id}],
        queryFn: () => getJobByUser(id),
    })
}