import React from 'react';
import {StyleSheet, View, Button} from 'react-native';
import FloatingWriteButton from '../components/FloatingWriteButton';

function CertificationScreen({navigation}) {
  return (
    <View style={styles.block}>
      <View style={styles.semiblock}>
        <View style={styles.button}>
          <Button
            title="자유게시판"
            onPress={() => navigation.navigate('Free')}
          />
          <Button
            title="질문게시판"
            onPress={() => navigation.navigate('Question')}
          />
          <Button
            title="인증게시판"
            onPress={() => navigation.navigate('Certification')}
          />
          <Button
            title="모집게시판"
            onPress={() => navigation.navigate('Recruit')}
          />
        </View>
      </View>

      <View style={styles.item}></View>
      <FloatingWriteButton />
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  item: {
    flex: 1,
  },
  semiblock: {
    alignItems: 'center',
  },
});

export default CertificationScreen;
