import React, {useState} from 'react';
import {
  ImageBackground,
  Pressable,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Text} from '../../components/Text';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useNavigation} from '@react-navigation/native';
import {useStore} from '../../constants/useStore';
import {observer} from 'mobx-react';

const HomeScreen = observer(() => {
  const nav = useNavigation();
  const {playerStore, gameStore} = useStore();
  const players = playerStore.players;
  const roles = gameStore.roles;
  const [playersWithOutRoles, setPlayersWithOutRoles] = useState(0);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: '#232a36',
      }}>
      <View
        style={{
          flex: 1,
          paddingHorizontal: 10,
          justifyContent: 'space-around',
        }}>
        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text type="bold" style={{fontSize: 30, color: 'white'}}>
            پدرخوانده
          </Text>
        </View>
        <View
          style={{
            overflow: 'hidden',
            height: 110,
            borderRadius: 10,
          }}>
          <ImageBackground
            source={require('../../assets/images/bg1.jpeg')}
            resizeMode="cover"
            imageStyle={{width: '100%'}}
            style={[styles.playersCard, {elevation: 3}]}>
            <View
              style={[
                styles.playersCard,
                {
                  backgroundColor: 'rgba(256,256,256,0.4)',
                  elevation: 3,
                  padding: 10,
                  justifyContent: 'space-between',
                },
              ]}>
              <View style={styles.rightContent}>
                <Text style={{fontSize: 25, lineHeight: 40}}>بازیکن ها</Text>
                <Text style={{fontSize: 18, lineHeight: 40, marginRight: 10}}>
                  {' '}
                  {players?.length} بازیکن
                </Text>
              </View>
              <Pressable
                style={styles.addBtn}
                onPress={() => {
                  nav.navigate('players');
                }}>
                <Icon name="plus" size={20} color="white" />
              </Pressable>
            </View>
          </ImageBackground>
        </View>
        <View
          style={{
            overflow: 'hidden',
            height: 110,
            borderRadius: 10,
          }}>
          <ImageBackground
            source={require('../../assets/images/bg2.jpeg')}
            resizeMode="cover"
            imageStyle={{width: '100%'}}
            style={[styles.playersCard, {elevation: 3}]}>
            <View
              style={[
                styles.playersCard,
                {
                  backgroundColor: 'rgba(256,256,256,0.4)',
                  elevation: 3,
                  padding: 10,
                  justifyContent: 'space-between',
                },
              ]}>
              <View style={styles.rightContent}>
                <Text style={{fontSize: 25, lineHeight: 40}}>نقش ها</Text>
                <Text style={{fontSize: 18, lineHeight: 40, marginRight: 10}}>
                  {roles.length} نقش
                </Text>
              </View>
              <Pressable
                style={styles.addBtn}
                onPress={() => nav.navigate('roles')}>
                <Icon name="plus" size={20} color="white" />
              </Pressable>
            </View>
          </ImageBackground>
        </View>
        <View
          style={{
            overflow: 'hidden',
            height: 110,
            borderRadius: 10,
          }}>
          <ImageBackground
            source={require('../../assets/images/bg4.webp')}
            resizeMode="cover"
            imageStyle={{width: '100%'}}
            style={[styles.playersCard, {elevation: 3}]}>
            <View
              style={[
                styles.playersCard,
                {
                  backgroundColor: 'rgba(256,256,256,0.4)',
                  elevation: 3,
                  padding: 10,
                  justifyContent: 'space-between',
                },
              ]}>
              <View
                style={{
                  width: '100%',
                  height: '100%',
                  flexDirection: 'row-reverse',
                }}>
                <View
                  style={{
                    width: '70%',
                    height: '100%',
                    justifyContent: 'space-around',
                    alignItems: 'flex-end',
                  }}>
                  <Text style={{fontSize: 20, lineHeight: 40}}>
                    تعیین نقش برای بازیکن ها
                  </Text>
                  <View style={{flexDirection: 'row-reverse', height: 40}}>
                    <View
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: 5,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'red',
                        marginLeft: 10,
                      }}>
                      <Text>{roles.length}</Text>
                    </View>
                    <View
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: 5,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#16a5f7',
                      }}>
                      <Text>{players.length}</Text>
                    </View>
                    <View
                      style={{
                        marginRight: 15,
                        height: 30,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text style={{fontSize: 18}}>باقی مانده</Text>
                    </View>
                    <View
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: 5,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#f5d716',
                        marginRight: 10,
                      }}>
                      <Text>{playersWithOutRoles}</Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    width: '30%',
                    height: '100%',
                    justifyContent: 'center',
                  }}>
                  <Pressable
                    style={styles.addBtn}
                    onPress={() => nav.navigate('roleup')}>
                    <Icon name="random" size={20} color="white" />
                  </Pressable>
                </View>
              </View>
            </View>
          </ImageBackground>
        </View>
        <View
          style={{
            width: '100%',
            height: 50,
            backgroundColor: 'white',
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Pressable
            onPress={() => nav.navigate('showcards')}
            style={{
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 20}}>شروع بازی</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  playersCard: {
    width: '100%',
    height: 120,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    borderRadius: 10,
  },
  rightContent: {
    width: '60%',
    height: '90%',
    flexDirection: 'row-reverse',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  addBtn: {
    width: 50,
    height: 50,
    marginLeft: 20,
    backgroundColor: '#253959',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export {HomeScreen};
