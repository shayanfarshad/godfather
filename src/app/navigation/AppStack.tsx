// src/app/navigation/RootNavigator.tsx
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { AppStackParamList } from './types';
import Home from '../screens/Home';
import Players from '../screens/Players';
import Rules from '../screens/Rules';
import Settings from '../screens/Settings';

const Stack = createNativeStackNavigator<AppStackParamList>();

export default function AppStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Players" component={Players} />
            <Stack.Screen name="Rules" component={Rules} />
            <Stack.Screen name="Settings" component={Settings} />
        </Stack.Navigator>
    );
}
