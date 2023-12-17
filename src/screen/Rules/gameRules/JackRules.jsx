import React, {useState} from 'react';
import {ScrollView} from 'react-native';
import Text from '../../../components/Text';
import {translate} from '../../../i18n';
import {spacing} from '../../../theme';

const JackRules = () => {
  const [numberOfLines, setNumberOfLine] = useState(2);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Text style={{fontSize: spacing.lg, marginBottom: 20}}>
        {translate('game.description')}
      </Text>
      <Text
        onPress={e => {
          if (numberOfLines === 2) {
            setNumberOfLine(0);
          } else {
            setNumberOfLine(2);
          }
        }}
        numberOfLines={numberOfLines}
        type="iran"
        style={{fontSize: 16}}>
        {translate('game.jackDescription')}
      </Text>
      <Text style={{fontSize: spacing.lg, marginVertical: 20}}>
        {translate('game.gameRules')}
      </Text>
      <Text type="iran" style={{fontSize: 16, marginBottom: 10}}>
        {translate('numbers.one')} - {translate('game.jackRules.first')}
      </Text>
      <Text type="iran" style={{fontSize: 16, marginBottom: 10}}>
        {translate('numbers.two')} - {translate('game.jackRules.second')}
      </Text>
      <Text type="iran" style={{fontSize: 16, marginBottom: 10}}>
        {translate('numbers.three')} - {translate('game.jackRules.third')}
      </Text>
      <Text type="iran" style={{fontSize: 16, marginBottom: 10}}>
        {translate('numbers.four')} - {translate('game.jackRules.fourth')}
      </Text>
      <Text type="iran" style={{fontSize: 16, marginBottom: 10}}>
        {translate('numbers.five')} - {translate('game.jackRules.fifth')}
      </Text>
      <Text type="iran" style={{fontSize: 16, marginBottom: 10}}>
        {translate('numbers.six')} - {translate('game.jackRules.sixth')}
      </Text>
      <Text type="iran" style={{fontSize: 16, marginBottom: 10}}>
        {translate('numbers.seven')} - {translate('game.jackRules.seventh')}
      </Text>
    </ScrollView>
  );
};

export {JackRules};
