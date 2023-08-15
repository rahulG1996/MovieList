import React from 'react';
import MovieList from '../screen/MovieList';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Search} from '../screen/SearchList';

const Stack = createNativeStackNavigator();

function AppNavigation() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="MovieList" component={MovieList} />
      <Stack.Screen name="Search" component={Search} />
    </Stack.Navigator>
  );
}

export default AppNavigation;
