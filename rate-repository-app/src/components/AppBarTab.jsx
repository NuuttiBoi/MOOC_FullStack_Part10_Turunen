import { Pressable, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';
import Text from "./Text";

const styles = StyleSheet.create({
    tab: {
        marginRight: 25,
        paddingVertical: 10,
    },
});

const AppBarTab = ({ to, children }) => {
    return (
        <Link to={to} component={Pressable} style={styles.tab}>
            <Text color="white" fontWeight="bold">{children}</Text>
        </Link>
    );
};

export default AppBarTab;