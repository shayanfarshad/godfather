import React from 'react';
import {ImageBackground, Pressable, StyleSheet, View} from 'react-native';
import Text from '../../components/Text';
import {backgroundColor} from '../../constants/Constants';
import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react';

const MainScreen = observer(() => {
  const nav = useNavigation();
  return (
    <View style={{flex: 1, backgroundColor: backgroundColor}}>
      <ImageBackground
        source={require('../../assets/images/mafia4.jpeg')}
        style={{width: '100%', height: '100%'}}
        imageStyle={{
          width: '100%',
          height: '100%',
        }}>
        <View
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'space-around',
            paddingRight: '10%',
          }}>
          <View style={styles.viewContainer}>
            <Pressable
              onPress={() => {
                nav.navigate('allplayers');
              }}
              style={styles.pressable}>
              <Text type="bold" style={{fontSize: 20}} >
                بازیکن ها
              </Text>
            </Pressable>
          </View>
          <View style={styles.viewContainer}>
            <Pressable onPress={()=> nav.navigate('learn')} style={styles.pressable}>
              <Text type="bold" style={{fontSize: 20}}>
                آموزش
              </Text>
            </Pressable>
          </View>
          <View style={styles.viewContainer}>
            <Pressable
              onPress={() => {
                nav.navigate('home');
              }}
              style={styles.pressable}>
              <Text type="bold" style={{fontSize: 20}}>
                شروع بازی
              </Text>
            </Pressable>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
});

const styles = StyleSheet.create({
  viewContainer: {
    backgroundColor: 'white',
    width: '50%',
    height: 80,
    borderRadius: 12,
    overflow: 'hidden',
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressable: {
    width: '100%',
    height: '100%',
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export {MainScreen};
