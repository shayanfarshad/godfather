import React, {useState} from 'react';
import {Pressable, SafeAreaView, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Text } from '../../components/Text';

const HomeScreen = () => {
  const [players, setPlayers] = useState(0);
  const [roles, setRolse] = useState(0);
  const [playersWithOutRoles, setPlayersWithOutRoles] = useState(0);
  const mafiaRoles = ['godfather'];
  const citizenRoles = ['kane'];
  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
        <Text type='bold' style={{fontSize: 30}}>پدرخوانده</Text>
      </View>
      <View style={styles.playersCard}>
        <View>
          <Text>بازیکن ها</Text>
          <Text>بازیکن {players.length}</Text>
        </View>
        <Pressable>
          <Icon name="plus" size={30} color="#900" />
        </Pressable>
      </View>
      <View style={styles.playersCard}>
        <View>
          <Text>نقش ها</Text>
          <Text>نقش {roles.length}</Text>
        </View>
        <Pressable>
          <Icon name="plus" size={30} color="#900" />
        </Pressable>
      </View>
      <View style={styles.playersCard}>
        <View>
          <View>
            <Text>تعیین نقش برای بازیکن ها</Text>
            <View>
              <View>
                <Text>{mafiaRoles.length}</Text>
              </View>
              <View>
                <Text>{citizenRoles.length}</Text>
              </View>
              <View>
                <Text>باقی مانده {playersWithOutRoles.length}</Text>
              </View>
            </View>
          </View>
        </View>
        <Pressable>
          <Text>طراحی بازی جدید</Text>
        </Pressable>
      </View>
      <View>
        <Pressable>
          <Text>شروع بازی</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  playersCard: {},
});

export {HomeScreen};
