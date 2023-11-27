import React from 'react';
import {observer} from 'mobx-react';
import {
  Animated,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import {DWidth, backgroundColor} from '../../../constants/Constants';
import {useStore} from '../../../constants/useStore';
import {CardItem} from '../CardItem';
import {useNavigation} from '@react-navigation/native';
import Header from '../../../components/Header';
import {isFarsi, translate} from '../../../i18n';
import {SceneMap, TabView} from 'react-native-tab-view';
import {JackLastMove} from './jackLastMoves';
import {NustraLastMove} from './nustraLastMoves';
import {colors, spacing} from '../../../theme';
import I18n from 'i18n-js';

const LastMoves = observer(() => {
  const nav = useNavigation();
  const {
    langStore: {language},
  } = useStore();
  const renderScene = SceneMap({
    jack: JackLastMove,
    nustra: NustraLastMove,
  });

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'jack', title: translate('game.jackLast')},
    {key: 'nustra', title: translate('game.nustraLast')},
  ]);
  return (
    <View
      style={{
        flex: 1,
        paddingTop: 20,
        paddingBottom: 40,
        backgroundColor: colors.background,
      }}>
      <Header
        title={translate('game.lastMoveCards')}
        // backIcon={isFarsi ? 'chevron-left' : 'chevron-right'}
        backPress={() => {
          nav.goBack();
        }}
      />
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={props => {
          const inputRange = props.navigationState.routes.map((x, i) => i);
          return (
            <View style={styles.tabBar}>
              {props.navigationState.routes.map((route, i) => {
                const opacity = props.position.interpolate({
                  inputRange,
                  outputRange: inputRange.map(inputIndex =>
                    inputIndex === i ? 1 : 0.3,
                  ),
                });

                return (
                  <TouchableOpacity
                    style={styles.tabItem}
                    onPress={() => setIndex(i)}>
                    <Animated.Text
                      style={{
                        opacity,
                        color: colors.text,
                        fontSize: language === 'fa' ? spacing.lg : spacing.md,
                        lineHeight: 32,
                        fontFamily:
                          language === 'fa'
                            ? 'Digi Nofar Bold'
                            : 'Wizard World',
                      }}>
                      {route.title}
                    </Animated.Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          );
        }}
        initialLayout={{width: layout.width}}
      />
      {/* <FlatList
        data={lastMoves}
        keyExtractor={(index, item) => item.id}
        contentContainerStyle={{
          width: DWidth,
          // marginTop: 20,
          marginHorizontal: DWidth * 0.05,
        }}
        renderItem={({item, index}) => {
          return <CardItem item={item} index={index} key={item.id} />;
        }}
      /> */}
    </View>
  );
});
const styles = StyleSheet.create({
  emptyList: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    marginTop: 40,
  },
  renderItem: {
    width: DWidth * 0.9,
    // height: 80,
    flexDirection: 'row-reverse',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  tabBar: {
    flexDirection: 'row',
    // paddingTop: 50,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
});

export {LastMoves};
