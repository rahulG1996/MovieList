import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import debounce from 'lodash/debounce';
import Container from '../../components/Container';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import {getSearchList} from '../../redux/actions';
import {FlashList} from '@shopify/flash-list';
import {RenderMovieCard} from '../../components/MpvieCard';
import {iEmpty, iLeftArrow} from '../../assets';
import {useNavigation} from '@react-navigation/native';
import {ListFooterComponent} from '../MovieList';
import {AppDispatch} from '../../redux/store';

export const Search = () => {
  const [loading, setLoading] = useState(false);
  const [movieList, setMovieList] = useState([]);
  const [page, setPage] = useState(1);
  const [searchKey, setSearchKey] = useState('');
  const [shouldPaginate, setPaginate] = useState(false);
  const navigation = useNavigation();
  const {searchData = [], totalPageSearch = 0} = useSelector(
    ({MovieReducer}) => ({
      searchData: MovieReducer.searchData,
      totalPageSearch: MovieReducer.totalPageSearch,
    }),
    shallowEqual,
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (searchData.length) {
      setLoading(false);
      if (shouldPaginate) {
        setMovieList(prev => [...prev, ...searchData]);
        setPaginate(false);
      } else {
        setMovieList(searchData);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchData]);

  const searchFunction = (e: string) => {
    setSearchKey(e);
    dispatch(getSearchList({key: e, page: page}));
  };
  const delayedSearch = debounce(searchFunction, 2000);

  const onBack = () => {
    navigation.goBack();
  };

  const onEndReached = useCallback(() => {
    if (totalPageSearch > page) {
      setLoading(true);
      setPaginate(true);
      setPage(prev => prev + 1);
      dispatch(getSearchList({key: searchKey, page: page + 1}));
    }
  }, [dispatch, page, totalPageSearch, searchKey]);

  const renderContent = () => {
    if (searchData.length === 0) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image source={iEmpty} style={{width: 200, height: 150}} />
        </View>
      );
    }
    return (
      <FlashList
        data={movieList}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => <RenderMovieCard item={item} />}
        estimatedItemSize={200}
        ListFooterComponent={<ListFooterComponent loading={loading} />}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.1}
      />
    );
  };

  return (
    <Container>
      <View style={styles.container}>
        <TouchableOpacity onPress={onBack}>
          <Image source={iLeftArrow} style={{width: 30, height: 30}} />
        </TouchableOpacity>
        <TextInput
          placeholder="Search Movies"
          autoFocus
          placeholderTextColor="#00000050"
          style={styles.inputStyle}
          onChangeText={delayedSearch}
        />
      </View>
      {renderContent()}
    </Container>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 16,
    backgroundColor: '#00000010',
  },
  inputStyle: {
    borderRadius: 8,
    paddingLeft: 8,
    paddingVertical: 12,
    color: 'black',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#00000050',
    flex: 1,
    marginLeft: 8,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
});
