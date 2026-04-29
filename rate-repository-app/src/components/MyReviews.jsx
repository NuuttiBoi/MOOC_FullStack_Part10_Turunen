import { FlatList, View, StyleSheet, Pressable, Alert } from 'react-native';
import { useQuery } from '@apollo/client/react';
import { useNavigate } from 'react-router-native';
import Text from './Text';
import { ME } from '../graphql/queries';
import useDeleteReview from '../hooks/useDeleteReview';
import theme from '../theme';

const styles = StyleSheet.create({
  separator: {
    height: 20,
  },
  item: {
    backgroundColor: 'white',
    padding: 10,
  },
  rating: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    borderWidth: 3,
    borderColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
  },
  viewButton: {
    backgroundColor: theme.colors.primary,
    padding: 20,
    marginRight: 15,
  },
  deleteButton: {
    backgroundColor: theme.colors.error,
    padding: 20,
  },
  buttonText: {
    color: theme.colors.white,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

const formatDate = (date) => {
  const newDate = new Date(date);
  return newDate.toLocaleDateString('en-GB', {day: '2-digit', month: 'short', year: 'numeric',
  });
};

const ItemSeparator = () => <View style={styles.separator} />;
const ReviewItem = ({ review, refetch }) => {
  const navigate = useNavigate();
  const [delReview] = useDeleteReview();

  const viewRepository = () => {
    navigate(`/repositories/${review.repositoryId}`);
  };
  const deleteReview = () => {
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await delReview(review.id);
            refetch();
          },
        },
      ],
    );
  };
  return (
    <View style={styles.item}>
      <View>
        <View style={styles.rating}>
          <Text color="primary" fontWeight="bold">
            {review.rating}
          </Text>
        </View>
        <View style={styles.content}>
          <Text fontWeight="bold">{review.repository.fullName}</Text>
          <Text color="textSecondary">
            {formatDate(review.createdAt)}
          </Text>

          <Text>{review.text}</Text>
        </View>
      </View>
      <View style={styles.buttons}>
        <Pressable style={styles.viewButton} onPress={viewRepository}>
          <Text style={styles.buttonText}>View repository</Text>
        </Pressable>
        <Pressable style={styles.deleteButton} onPress={deleteReview}>
          <Text style={styles.buttonText}>Delete review</Text>
        </Pressable>
      </View>
    </View>
  );
};

const MyReviews = () => {
  const { data, loading, refetch } = useQuery(ME, {
    variables: { includeReviews: true },
    fetchPolicy: 'cache-and-network',
  });
  if (loading) {
    return null;
  } else {
    const reviews = data?.me?.reviews
      ? data.me.reviews.edges.map((edge) => edge.node)
      : [];
    return (
      <FlatList
        data={reviews}
        ItemSeparatorComponent={ItemSeparator}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ReviewItem review={item} refetch={refetch} />
        )}
      />
    );
  }

};

export default MyReviews;