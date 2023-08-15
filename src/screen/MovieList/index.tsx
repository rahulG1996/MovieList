import React, {useEffect, useState, useCallback} from 'react';
import {ActivityIndicator, Image, Pressable, StyleSheet} from 'react-native';
import Container from '../../components/Container';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {getMovieList} from '../../redux/actions';
import {FlashList} from '@shopify/flash-list';
import {useNavigation} from '@react-navigation/native';
import {RenderMovieCard} from '../../components/MpvieCard';
import {AppDispatch} from '../../redux/store';
import {iSearch} from '../../assets';

export const ListFooterComponent = ({loading = false}) => {
  if (loading) {
    return <ActivityIndicator />;
  }
  return null;
};

const MovieList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  const [movieList, setMovieList] = useState([]);
  const [shouldPaginate, setPaginate] = useState(false);
  const {data = [], totalPage = 0} = useSelector(
    ({MovieReducer}) => ({
      data: MovieReducer.data,
      isLoading: MovieReducer.isLoading,
      totalPage: MovieReducer.totalPage,
    }),
    shallowEqual,
  );

  const [page, setPage] = useState(1);

  const navigation = useNavigation();

  useEffect(() => {
    dispatch(getMovieList(page));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    if (data.length) {
      setLoading(false);
      if (shouldPaginate) {
        setMovieList(prev => [...prev, ...data]);
        setPaginate(false);
      } else {
        setMovieList(data);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const onEndReached = useCallback(() => {
    if (totalPage > page) {
      setLoading(true);
      setPaginate(true);
      setPage(prev => prev + 1);
      dispatch(getMovieList(page + 1));
    }
  }, [dispatch, page, totalPage]);

  const navigateToSearch = useCallback(() => {
    navigation.navigate('Search');
  }, [navigation]);

  return (
    <Container>
      <FlashList
        data={movieList}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => <RenderMovieCard item={item} />}
        estimatedItemSize={200}
        ListFooterComponent={<ListFooterComponent loading={loading} />}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.1}
      />
      <Pressable style={styles.searchIcon} onPress={navigateToSearch}>
        <Image source={iSearch} style={{width: 30, height: 30}} />
      </Pressable>
    </Container>
  );
};

export default MovieList;

const styles = StyleSheet.create({
  searchIcon: {
    position: 'absolute',
    zIndex: 10,
    bottom: 10,
    borderRadius: 40,
    right: 32,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 1,
    backgroundColor: 'white',
    elevation: 4,
    height: 80,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
