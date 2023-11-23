import React, {useState} from 'react';
import {observer} from 'mobx-react';
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {DHeight, DWidth, backgroundColor} from '../../constants/Constants';
import {useStore} from '../../constants/useStore';
import Text from '../../components/Text';
import {CardItem} from './CardItem';
import {useNavigation} from '@react-navigation/native';
import Header from '../../components/Header';

const GameRules = observer(() => {
  const {roleStore} = useStore();
  const nav = useNavigation();
  const roles = roleStore.getRoles();
  return (
    <View
      style={{
        flex: 1,
        paddingTop: 20,
        paddingBottom: 40,
        paddingHorizontal: 20,
        backgroundColor: backgroundColor,
      }}>
      <Header
        title={'بازی'}
        backIcon={'chevron-left'}
        backPress={() => {
          nav.goBack();
        }}
      />
      <ScrollView>
        <Text style={{color: 'white', fontSize: 18}}>سناریو</Text>
        <Text style={styles.text}>
          در این سناریو شاهد حضور نقش مستقل می‌باشیم. نقش مستقل عضو هیچ کدام از
          ساید‌های شهروند و مافیا نیست. البته نقش نوستراداموس در شب یک مشخص
          می‌کند که به برد کدام ساید کمک کند.
        </Text>
        <Text style={styles.text}>
          نقش کارآگاه در سناریو پدرخوانده حضور ندارد. برای جلوگیری از مشکلات
          اعلام نقش و اطلاق نقش، طراحان این سناریو نقش کارآگاه رو از این سناریو
          حذف کردند و به جای آن نقشی به اسم همشهری کین اضافه کرده‌اند. همشهری
          کین تنها یک استعلام دارد و اگر درست بگیرد، توسط گرداننده اعلام خواهد
          شد.
        </Text>
        <Text style={styles.text}>
          قابلیت حس ششم (ناتویی) و خریداری (مذاکره) به تیم مافیا اضافه شده است
          که باعث شده شباهت زیادی به سناریو شبکه سلامت مذاکره و تکاور داشته
          باشد.
        </Text>
        <Text style={styles.text}>
          رای‌گیری دوم دیگر در فاز شب اتفاق نمی‌افتد و مثل سناریو کلاسیک،
          رای‌گیری به صورت علنی و در فاز روز انجام می‌شود. در مرحله دوم رای‌گیری
          هم تعداد رای محدود نیست و به هر تعدادی از نفرات که خواستید، میتونید
          رای‌ بدید.
        </Text>
        <Text style={styles.text}>
          استعلام وضعیت دیگر به صورت نقش نیست و اصلا نقش جان سخت وجود ندارد. مثل
          استعلام وضعیت در سناریو کلاسیک، در ابتدای روز گرداننده رای‌گیری میکنه
          و در صورتی که اکثریت موافق باشند، وضعیت بازی رو بر اساس تعداد مافیا،
          شهروند و مستقل اعلام میکنه.
        </Text>
      </ScrollView>
    </View>
  );
});
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
    flexDirection: 'row-reverse',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  text: {color: 'white', fontSize: 15, lineHeight: 28},
});

export {GameRules};
