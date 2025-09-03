// src/app/navigation/GamePlayStack.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';



const Stack = createNativeStackNavigator<GamePlayStackParamList>();

import GameplaySetup from 'src/app/screens/Gameplay';
import { GamePlayStackParamList } from './types';
import SelectPlayersScreen from '../screens/Gameplay/subScreen/SelectPlayerScreen';
import SelectScenarioScreen from '../screens/Gameplay/subScreen/SelectScenarioScreen';
import AssignRolesScreen from '../screens/Gameplay/subScreen/AssignRolesScreen';

export default function GameStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="GameplaySetup" component={GameplaySetup} />
      <Stack.Screen name="SelectPlayers" component={SelectPlayersScreen} />
      <Stack.Screen name="SelectScenario" component={SelectScenarioScreen} />
      <Stack.Screen name="AssignRoles" component={AssignRolesScreen} />
    </Stack.Navigator>
  );
}
