import React, {useState} from 'react';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import Text from '../../components/Text';
import {DWidth} from '../../constants/Constants';
import {colors, spacing} from '../../theme';
import {observer} from 'mobx-react';
import {translate} from '../../i18n';

const CardItem = observer(({item, index, type}) => {
  const [numberOfLines, setNumberOfLine] = useState(2);

  return (
    <Pressable
      style={[styles.renderItem, {flexDirection: 'column'}]}
      key={item.id}
      onPress={() => {
        //   returnPlayer(item);
      }}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 20,
        }}>
        {item?.image && (
          <Image
            source={item.image}
            resizeMode="contain"
            style={{width: 120, height: 170, borderRadius: 10}}
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
          style={{fontSize: 16}}>
          {item.description}
        </Text>
      </View>
    </Pressable>
  );
});
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
