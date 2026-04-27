import {StyleSheet, View, Image} from "react-native";
import Text from "./Text";
import theme from "../theme";


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 15,
    },
    row: {
        flexDirection: 'row',
    },
    avatar: {
        width: 50,
        height: 50,
        margin: 15
    },
    stats: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
    statItem: {
        alignItems: 'center',
        flexDirection: 'column',
    },
    language: {
        alignSelf: 'flex-start',
        marginTop: 2,
        backgroundColor: theme.colors.primary,
    },
    numbers : {
        fontWeight: 'bold'
    }
});

const numberFormat = (number) => {
    if(number >= 1000){
        return (number / 1000).toFixed(1) + 'k'
    } else {
        return number
    }
};

const StatItem = ({ value, label }) => (
    <View style={styles.statItem}>
        <Text fontWeight="bold">{numberFormat(value)}</Text>
        <Text color="textSecondary">{label}</Text>
    </View>
);

const RepositoryItem = ({ item }) => {
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Image style={styles.avatar} source={{ uri: item.ownerAvatarUrl }} />
                <View>
                    <Text fontWeight="bold">{item.fullName}</Text>
                    <Text color="textSecondary">{item.description}</Text>
                    <Text color="white" style={styles.language}>{item.language}</Text>
                </View>
            </View>
            <View style={styles.stats}>
                <StatItem value={item.stargazersCount} label="Stars" />
                <StatItem value={item.forksCount} label="Forks" />
                <StatItem value={item.reviewCount} label="Reviews" />
                <StatItem value={item.ratingAverage} label="Rating" />
            </View>
        </View>
    );
};

export default RepositoryItem;