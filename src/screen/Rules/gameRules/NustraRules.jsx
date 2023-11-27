import React, {useState} from 'react';
import {ScrollView} from 'react-native';
import Text from '../../../components/Text';
import {translate} from '../../../i18n';
import {spacing} from '../../../theme';

const NustraRules = () => {
  const [numberOfLines, setNumberOfLine] = useState(2);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Text style={{fontSize: spacing.lg}}>
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
        {translate('game.nustraDescription')}
      </Text>
      <Text style={{fontSize: spacing.lg}}>{translate('game.gameRules')}</Text>
      <Text type="iran" style={{fontSize: 16}}>
        1 - {translate('game.nustraRules.first')}
      </Text>
      <Text type="iran" style={{fontSize: 16}}>
        2 - {translate('game.nustraRules.second')}
      </Text>
      <Text type="iran" style={{fontSize: 16}}>
        3 - {translate('game.nustraRules.third')}
      </Text>
      <Text type="iran" style={{fontSize: 16}}>
        4 - {translate('game.nustraRules.fourth')}
      </Text>
    </ScrollView>
  );
};

export {NustraRules};
