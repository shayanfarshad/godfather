import React, { useState } from 'react';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import Text from '../../components/Text';
import {DWidth} from '../../constants/Constants';

const CardItem = ({item, index}) => {
  const [numberOfLines, setNumberOfLine] = useState(2);

  return (
    <Pressable
      style={[styles.renderItem, {flexDirection: 'column'}]}
      key={index}
      onPress={() => {
        //   returnPlayer(item);
      }}>
      <View>
        <Image
          source={item.image}
          style={{width: 60, height: 60, borderRadius: 10}}
        />
        <Text style={{color: 'white',fontSize:16}}>{item.title}</Text>
      </View>
      <View>
        <Text
          onPress={e => {
            if (numberOfLines === 2) {
              setNumberOfLine(0);
            } else {
              setNumberOfLine(2);
            }
          }}
          numberOfLines={numberOfLines}
          type='light'
          style={{color: 'white',fontSize:14}}>
          {item.description}
        </Text>
      </View>
    </Pressable>
  );
};
export {CardItem};
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
    marginBottom: 15,
    flexDirection: 'row-reverse',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
