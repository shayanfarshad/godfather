import {HomeScreen} from '../screen/Home/HomeScreen';
import {SplashScreen} from '../screen/Splash/SplashScreen';

export const NAVIGATION = {
  stacks: [
    {
      name: 'splash',
      screens: [
        {
          Name: 'SplashPage',
          Component: SplashScreen,
        },
      ],
    },
    {
      name: 'app',
      screens: [
        {
          Name: 'DashboardPage',
          Component: HomeScreen,
        },
      ],
    },
  ],
};
