import {View, StyleSheet, ScrollView} from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import { ME } from '../graphql/queries';
import useSignOut from '../hooks/useSignOut';
import {useQuery} from "@apollo/client/react";


const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#24292e',
        paddingHorizontal: 20,
        paddingBottom: 25,
    },
    bar : {
        margin: 20
    },
    scroll: {
        flexDirection: 'row',
    }
});

const AppBar = () => {
    const { data } = useQuery(ME);
    const signOut = useSignOut();
    return (
        <View style={styles.container}>
            <ScrollView horizontal contentContainerStyle={styles.scroll}>
                <AppBarTab to="/">Repositories</AppBarTab>
                {data?.me ? (
                        <AppBarTab to="/" onPress={signOut}>Sign Out</AppBarTab>
                ) : (<AppBarTab to="/signin">Sign in</AppBarTab>
                )}
            </ScrollView>
        </View>
    )
};

export default AppBar;