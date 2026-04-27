import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';



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
    return (
        <View style={styles.container}>
            <ScrollView horizontal contentContainerStyle={styles.scroll}>
                <AppBarTab to="/">Repositories</AppBarTab>
                <AppBarTab to="/signin">Sign in</AppBarTab>
            </ScrollView>
        </View>
    )
};

export default AppBar;