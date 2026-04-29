import {FlatList, View, StyleSheet, TextInput, Pressable } from 'react-native';

import { useDebounce } from 'use-debounce';
import { Picker } from '@react-native-picker/picker';
import { useNavigate } from 'react-router-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import {useState} from 'react';
import theme from '../theme';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  pickerContainer: {
    backgroundColor: theme.colors.white,
    padding: 10,
  },
  searchInput: {
    backgroundColor: theme.colors.white,
    borderStyle: 'solid',
    borderRadius: 4,
    borderColor: theme.colors.primary,
    padding: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;
export const RepositoryListContainer = ({repositories, order, setOrder, searchKeyword, setSearchKeyword}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];
  const navigate = useNavigate();
  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={
        <View>
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            value={searchKeyword}
            onChangeText={setSearchKeyword}
          />

          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={order}
              onValueChange={(value) => setOrder(value)}>
              <Picker.Item label="Latest repositories" value="latest" />
              <Picker.Item label="Highest rated repositories" value="highest" />
              <Picker.Item label="Lowest rated repositories" value="lowest" />
            </Picker>
          </View>
        </View>
      }
      renderItem={({ item }) => (
        <Pressable onPress={() => navigate(`/repositories/${item.id}`)}>
          <RepositoryItem item={item} />
        </Pressable>
      )} />
  );
};
const RepositoryList = () => {
  const [order, setOrder] = useState('latest');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500);
  const getOrderVariables = () => {
    if (order === 'highest') {
      return {
        orderBy: 'RATING_AVERAGE',
        orderDirection: 'DESC',
      };
    }
    if (order === 'lowest') {
      return {
        orderBy: 'RATING_AVERAGE',
        orderDirection: 'ASC',
      };
    }
    return {
      orderBy: 'CREATED_AT',
      orderDirection: 'DESC',
    };
  };

  const { repositories } = useRepositories({
    ...getOrderVariables(),
    searchKeyword: debouncedSearchKeyword,
  });

  return (
    <RepositoryListContainer
      repositories={repositories}
      order={order}
      setOrder={setOrder}
      searchKeyword={searchKeyword}
      setSearchKeyword={setSearchKeyword}
    />
  );
};
export default RepositoryList;