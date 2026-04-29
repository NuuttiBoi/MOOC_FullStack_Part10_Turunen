import {StyleSheet, View, Image, Linking, Pressable} from 'react-native';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    padding: 15,
  },
  row: {
    flexDirection: 'row',
  },
  avatar: {
    width: 50,
    height: 50,
    margin: 10,
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
  button: {
    backgroundColor: theme.colors.primary,
    padding: 15,
    marginTop: 15,
    borderRadius: 4,
  },
  buttonText: {
    textAlign: 'center',
  },
});

const numberFormat = (number) => {
  if(number >= 1000){
    return `${(number / 1000).toFixed(1)  }k`;
  } else {
    return number;
  }
};

const StatItem = ({ value, label }) => (
  <View style={styles.statItem}>
    <Text fontWeight="bold">{numberFormat(value)}</Text>
    <Text color="textSecondary">{label}</Text>
  </View>
);

const RepositoryItem = ({ item, showGitHubButton = false }) => {
  return (
    <View testID="repositoryItem" style={styles.container}>
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
      {showGitHubButton && (
        <Pressable
          style={styles.button}
          onPress={() => Linking.openURL(item.url)}>
          <Text color="white" fontWeight="bold">
                        Open in gitHub
          </Text>
        </Pressable>
      )}
    </View>
  );
};

export default RepositoryItem;