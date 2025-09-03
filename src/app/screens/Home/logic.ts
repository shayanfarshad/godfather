import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from 'src/app/navigation/types';

type Nav = NativeStackNavigationProp<AppStackParamList, 'Home'>;

export function useHomeLogic() {
  const navigation = useNavigation<Nav>();

  const goPlayers = useCallback(() => navigation.navigate('Players'), [navigation]);
  const goRules = useCallback(() => navigation.navigate('Rules'), [navigation]);
  const goSettings = useCallback(() => navigation.navigate('Settings'), [navigation]);
  const goPlay = useCallback(() => navigation.navigate('GamePlay'), [navigation]);

  return { goPlayers, goRules, goSettings, goPlay };
}
