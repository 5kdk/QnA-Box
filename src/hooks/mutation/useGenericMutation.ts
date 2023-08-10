import { useQueryClient, useMutation, MutationFunction, MutationKey } from '@tanstack/react-query';

interface GenericMutationOptions<T, V> {
  queryKey: MutationKey;
  mutationFn: MutationFunction<unknown, V>;
  onMutate: (variables: V) => T;
}

const useGenericMutation = <T, V>({ queryKey, mutationFn, onMutate }: GenericMutationOptions<T, V>) => {
  const queryClient = useQueryClient();

  return useMutation<unknown, Error, V, { previous: T | undefined }>({
    mutationFn,
    async onMutate(variables) {
      await queryClient.cancelQueries(queryKey);

      const previous = queryClient.getQueryData<T>(queryKey);
      queryClient.setQueryData(queryKey, onMutate(variables));

      return { previous };
    },

    onError(err, variables, context) {
      queryClient.setQueryData(queryKey, context?.previous);
    },

    onSettled() {
      // queryClient.invalidateQueries(queryKey);
    },
  });
};

export default useGenericMutation;
