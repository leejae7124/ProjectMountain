import React, {useContext} from 'react';
import {StyleSheet, View, Button} from 'react-native';
import FloatingWriteButton from '../components/FloatingWriteButton';
import FeedList from '../components/FeedList';
import LogContext from '../contexts/LogContext';

function FreeScreen({navigation}) {
  const {logs} = useContext(LogContext);
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

      <View style={styles.item}>
        <FeedList logs={logs} />
      </View>
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

export default FreeScreen;
