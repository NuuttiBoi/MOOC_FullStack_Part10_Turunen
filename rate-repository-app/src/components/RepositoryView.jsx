import { useParams } from 'react-router-native';
import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepository from '../hooks/useRepository';
import Text from './Text';
import theme from '../theme';
const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  reviewContainer: {
    backgroundColor: 'white',
    padding: 15,
    flexDirection: 'row',
  },
  rating: {
    width: 45,
    height: 45,
    borderRadius: 45 / 2,
    borderWidth: 3,
    borderColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
});
const ItemSeparator = () => <View style={styles.separator} />;
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-GB', {day: 'numeric', month: 'short', year: 'numeric',
  });
};
const ReviewItem = ({ review }) => {
  return (
    <View style={styles.reviewContainer}>
      <View style={styles.rating}>
        <Text color="primary" fontWeight="bold">
          {review.rating}
        </Text>
      </View>
      <View style={styles.content}>
        <Text fontWeight="bold">{review.user.username}</Text>
        <Text color="textSecondary">{formatDate(review.createdAt)}</Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  );
};
const RepositoryView = () => {
  const {id } = useParams();
  const {repository} = useRepository(id);
  if (!repository) {
    return null;
  }
  const reviews = repository.reviews
    ? repository.reviews.edges.map((edge) => edge.node)
    : [];
  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={() => (<RepositoryItem item={repository} showGitHubButton />)}
    />
  );
};
export default RepositoryView;