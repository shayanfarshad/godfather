import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from './src/screen/Home/HomeScreen';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {PlayersScreen} from './src/screen/Players/playersScreen';
import {RolesScreen} from './src/screen/Roles/RolesScreen';
import {PlayerListScreen} from './src/screen/Players/PlayerListScreen';
import {RoleUpScreen} from './src/screen/Roles/RoleUpScreen';
import {ShowCards} from './src/screen/Game/ShowCards';
import {GamePlay} from './src/screen/Game/GamePlay';
// import {SafeAreaView} from 'react-native-safe-area-context';
const Stack = createNativeStackNavigator();

function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: '#232a36',
        }}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="home"
              component={HomeScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="players"
              component={PlayersScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="playerList"
              component={PlayerListScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="roles"
              component={RolesScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="roleup"
              component={RoleUpScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="showcards"
              component={ShowCards}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="gameplay"
              component={GamePlay}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default App;
