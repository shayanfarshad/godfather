import React, {useState} from 'react';
import {ScrollView} from 'react-native';
import Text from '../../../components/Text';
import {spacing} from '../../../theme';
import { t } from 'i18next';

const JackRules = () => {
  const [numberOfLines, setNumberOfLine] = useState(2);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Text style={{fontSize: spacing.lg, marginBottom: 20}}>
        {t('game.description')}
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
        {t('game.jackDescription')}
      </Text>
      <Text style={{fontSize: spacing.lg, marginVertical: 20}}>
        {t('game.gameRules')}
      </Text>
      <Text type="iran" style={{fontSize: 16, marginBottom: 10}}>
        {t('numbers.one')} - {t('game.jackRules.first')}
      </Text>
      <Text type="iran" style={{fontSize: 16, marginBottom: 10}}>
        {t('numbers.two')} - {t('game.jackRules.second')}
      </Text>
      <Text type="iran" style={{fontSize: 16, marginBottom: 10}}>
        {t('numbers.three')} - {t('game.jackRules.third')}
      </Text>
      <Text type="iran" style={{fontSize: 16, marginBottom: 10}}>
        {t('numbers.four')} - {t('game.jackRules.fourth')}
      </Text>
      <Text type="iran" style={{fontSize: 16, marginBottom: 10}}>
        {t('numbers.five')} - {t('game.jackRules.fifth')}
      </Text>
      <Text type="iran" style={{fontSize: 16, marginBottom: 10}}>
        {t('numbers.six')} - {t('game.jackRules.sixth')}
      </Text>
      <Text type="iran" style={{fontSize: 16, marginBottom: 10}}>
        {t('numbers.seven')} - {t('game.jackRules.seventh')}
      </Text>
    </ScrollView>
  );
};

export {JackRules};
