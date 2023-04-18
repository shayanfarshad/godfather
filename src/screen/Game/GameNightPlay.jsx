import React, {
  StrictMode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {DWidth, backgroundColor, getDayWord} from '../../constants/Constants';
import {FlatList, Image, Pressable, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useStore} from '../../constants/useStore';
import {Text} from '../../components/Text';

const GameNightPlay = () => {
  const nav = useNavigation();
  const {gameStore} = useStore();
  const bottomSheetRef = useRef(null);
  const night = gameStore.night;
  const nightStory = gameStore.nightStory;
  const rolePlayers = gameStore.rolePlayers;

  const [players, setPlayers] = useState();
  const [nightWord, setNightWord] = useState('');
  const [toNight, setToNight] = useState([]);
  const [sheetIndex, setSheetIndex] = useState(1);

  const snapPoints = useMemo(() => [50, 500], []);
  const handleSheetChanges = useCallback(index => {
    console.log('handleSheetChanges', index);
    setSheetIndex(index);
  }, []);

  useEffect(() => {
    const n = getDayWord(night);
    setNightWord(n);
  }, [night]);

  useEffect(() => {
    console.log({nightStory, nightWord});
    if (nightStory && nightWord) {
      const t = nightStory.filter(el => el.name.includes(nightWord));
      // console.log({toNight});
      setToNight(t);
    }
  }, [nightStory, nightWord]);

  useEffect(() => {
    if (rolePlayers) {
      setPlayers(rolePlayers);
      bottomSheetRef?.current?.snapToIndex(1);
    }
  }, [rolePlayers]);

  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        onPress={() => {
          bottomSheetRef?.current?.snapToIndex(0);
        }}
        pressBehavior={'collapse'}
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.6}
        animatedIndex={{value: 0}}
      />
    ),
    [],
  );
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: backgroundColor,
        paddingHorizontal: 20,
      }}>
      <FlatList
        data={players}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.flatContainer}
        numColumns={3}
        ListEmptyComponent={() => {
          return (
            <View style={styles.emptyList}>
              <Image
                source={require('../../assets/images/empty1.png')}
                style={{width: '50%', height: 300}}
              />
              <Text style={{fontSize: 20, color: 'white'}}>
                هیج بازیکنی نداری!
              </Text>
            </View>
          );
        }}
        renderItem={({item}) => {
          return (
            <Pressable onPress={() => {}} style={styles.renderItem}>
              <View style={styles.playerIcon}>
                <Image
                  source={
                    item?.role?.image
                      ? item?.role?.image
                      : require('../../assets/images/player2.png')
                  }
                  style={{width: 80, height: 80}}
                />
              </View>
              <Text style={{fontSize: 16, color: 'white'}}>
                {item?.player?.name}
              </Text>
            </Pressable>
          );
        }}
      />
      <BottomSheet
        enablePanDownToClose={false}
        ref={bottomSheetRef}
        index={0}
        backdropComponent={sheetIndex === 1 ? renderBackdrop : null}
        onDismiss={() => {
          console.log('dismis shod');
          bottomSheetRef?.current?.snapToIndex(0);
        }}
        style={styles.shadow}
        // handleStyle={styles.handle}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        //   backgroundStyle={backgroundStyle}
      >
        <BottomSheetView style={[styles.contentContainer]}>
          <Text style={{fontSize: 20, marginBottom: 10}}>شب {nightWord}</Text>
          <Text style={{fontSize: 18, marginBottom: 10}}>{toNight[0]?.jobs[0]?.role} بیدار شود</Text>
          <Text style={{fontSize: 15, marginBottom: 10}}>{toNight[0]?.description}</Text>
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 50,
    alignItems: 'flex-end',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  flatContainer: {
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    // elevation: 5,
  },
  emptyList: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    marginTop: 80,
  },
  renderItem: {
    width: DWidth / 3.2,
    height: 105,
    marginBottom: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  playerIcon: {
    width: 80,
    height: 80,
    borderRadius: 5,
    overflow: 'hidden',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 15,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.46,
    shadowRadius: 11.14,

    elevation: 10,
  },
  handle: {
    height: 0,
    display: 'none',
  },
});
export {GameNightPlay};
