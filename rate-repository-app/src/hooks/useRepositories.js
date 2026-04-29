import { useQuery } from '@apollo/client/react';
import { GET_REPOSITORIES } from '../graphql/queries';
const useRepositories = (variables) => {
  const { data, loading, ...result } = useQuery(GET_REPOSITORIES, {
    variables,
  });
  return {
    repositories: data?.repositories,
    loading,
    ...result,
  };
};
export default useRepositories;