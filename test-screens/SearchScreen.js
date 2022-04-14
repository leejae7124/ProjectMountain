import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StyleSheet, View, Button} from 'react-native';
import FreeScreen from './FreeScreen';
import QuestionScreen from './QuestionScreen';
import CertificationScreen from './CertificationScreen';
import RecruitScreen from './RecruitScreen';
import WriteScreen from './WriteScreen';

const Stack = createNativeStackNavigator();

function SearchScreen() {
  return (
    <Stack.Navigator initialRouteName="Free">
      <Stack.Screen
        name="Free"
        component={FreeScreen}
        options={{
          headerTitleAlign: 'center',
          title: '자유게시판',
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="Question"
        component={QuestionScreen}
        options={{
          headerTitleAlign: 'center',
          title: '질문게시판',
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="Certification"
        component={CertificationScreen}
        options={{
          headerTitleAlign: 'center',
          title: '인증게시판',
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="Recruit"
        component={RecruitScreen}
        options={{
          headerTitleAlign: 'center',
          title: '모집게시판',
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="Write"
        component={WriteScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default SearchScreen;
