import React from 'react';
import MovieList from '../screen/MovieList';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function AppNavigation() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="MovieList" component={MovieList} />
    </Stack.Navigator>
  );
}

export default AppNavigation;
