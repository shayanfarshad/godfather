import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from 'src/app/navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export function useHomeLogic() {
  const navigation = useNavigation<Nav>();

  const goPlayers = useCallback(() => navigation.navigate('Players'), [navigation]);
  const goRules = useCallback(() => navigation.navigate('Rules'), [navigation]);
  const goSettings = useCallback(() => navigation.navigate('Settings'), [navigation]);
  const goPlay = useCallback(() => navigation.navigate('Setup'), [navigation]);

  return { goPlayers, goRules, goSettings, goPlay };
}
