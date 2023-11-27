import React, {useState} from 'react';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import Text from '../../components/Text';
import {DWidth} from '../../constants/Constants';
import {colors, spacing} from '../../theme';

const CardItem = ({item, index}) => {
  const [numberOfLines, setNumberOfLine] = useState(2);

  return (
    <Pressable
      style={[styles.renderItem, {flexDirection: 'column'}]}
      key={item.id}
      onPress={() => {
        console.log({index});
        //   returnPlayer(item);
      }}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        {item?.image && (
          <Image
            source={item.image}
            resizeMode="cover"
            style={{width: 80, height: 130, borderRadius: 10}}
          />
        )}
        <Text style={{fontSize: spacing.lg}}>{item.title}</Text>
      </View>
      <View style={{}}>
        <Text
          onPress={e => {
            if (numberOfLines === 2) {
              setNumberOfLine(0);
            } else {
              setNumberOfLine(2);
            }
          }}
          type="iran"
          numberOfLines={numberOfLines}
          style={{fontSize: 18}}>
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
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
