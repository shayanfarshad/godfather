import {Dimensions} from 'react-native';

export const backgroundColor = '#232a36';
export const DWidth = Dimensions.get('screen').width;
export const DHeight = Dimensions.get('screen').height;
export const getDayWord = day => {
  switch (day) {
    case 0:
      return 'معارفه';
    case 1:
      return 'اول';
    case 2:
      return 'دوم';
    case 3:
      return 'سوم';
    case 4:
      return 'چهارم';
    case 5:
      return 'پنجم';
    case 6:
      return 'ششم';
    case 7:
      return 'هفتم';
    case 8:
      return 'هشتم';
    case 9:
      return 'نهم';
    case 10:
      return 'دهم';
  }
};
