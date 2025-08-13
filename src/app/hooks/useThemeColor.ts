import { useTheme } from '../theme';
export const useThemeColor = () => {
  const { colors } = useTheme();
  return colors;
};