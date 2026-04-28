import { useApolloClient } from '@apollo/client/react';
import useAuthStorage from './useAuthStorage';
const useSignOut = () => {
    const authStorage = useAuthStorage();
    const apolloClient = useApolloClient();
    const signOut = async () => {
        await authStorage.removeAccessToken();
        await apolloClient.resetStore();
        console.log('signed out')
    };
    return signOut;
};
export default useSignOut;