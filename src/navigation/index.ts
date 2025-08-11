import {AppStackParamList} from './AppNavigator';

// export other navigators from here

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AppStackParamList {}
  }
}
