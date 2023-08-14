import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Image, Text, View} from 'react-native';
import Container from '../../components/Container';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {getMovieList} from '../../redux/actions';
import {FlashList} from '@shopify/flash-list';

export const RenderMovieCard = ({item}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        marginVertical: 8,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#00000020',
        padding: 8,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.8,
        shadowRadius: 1,
        backgroundColor: 'white',
        elevation: 5,
      }}>
      <View>
        <Image
          source={{uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}`}}
          style={{width: 100, height: 80, borderRadius: 8}}
        />
      </View>
      <View style={{marginLeft: 16, flex: 1}}>
        <Text style={{fontWeight: 'bold'}} numberOfLines={1}>
          {item.original_title}
        </Text>
        <Text
          style={{color: '#00000080', fontSize: 12, paddingVertical: 4}}
          numberOfLines={3}>
          {item.overview}
        </Text>
        <Text style={{fontSize: 12}} numberOfLines={3}>
          {'Release Date ' + item.release_date}
        </Text>
      </View>
    </View>
  );
};

export const ListFooterComponent = ({loading = false}) => {
  if (loading) {
    return <ActivityIndicator />;
  }
  return null;
};

const MovieList = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [movieList, setMovieList] = useState([]);
  const [shouldPaginate, setPaginate] = useState(false);
  const {data = [], isLoading = false} = useSelector(
    ({MovieReducer}) => ({
      data: MovieReducer.data,
      isLoading: MovieReducer.isLoading,
    }),
    shallowEqual,
  );

  useEffect(() => {
    dispatch(getMovieList());
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

  console.log(movieList.length);

  const onEndReached = () => {
    setLoading(true);
    setPaginate(true);
    dispatch(getMovieList());
  };

  return (
    <Container>
      <FlashList
        data={movieList}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => <RenderMovieCard item={item} />}
        estimatedItemSize={200}
        ListFooterComponent={<ListFooterComponent loading={loading} />}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.1}
      />
    </Container>
  );
};

export default MovieList;
