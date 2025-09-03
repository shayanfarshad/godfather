import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { AppStackParamList } from './types';
import Home from 'src/app/screens/Home';
import Players from 'src/app/screens/Players';
import Rules from 'src/app/screens/Rules';
import Settings from 'src/app/screens/Settings';
import { useTranslation } from 'react-i18next';
import GameStack from './GameStack';


const Stack = createNativeStackNavigator<AppStackParamList>();

export default function AppStack() {

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Players" component={Players} />
      <Stack.Screen name="Rules" component={Rules} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="GamePlay" component={GameStack} />
    </Stack.Navigator>
  );
}
