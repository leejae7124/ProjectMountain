import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FeedScreen from './FeedsScreen';
import CalendarScreen from './CalendarScreen';
import SearchScreen from './SearchScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {View, Text, StyleSheet} from 'react-native';
import TransparentCircleButton from '../components/TransparentCircleButton';

const Tab = createBottomTabNavigator();

function MainTab() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        activeTintColor: '#009688',
      }}>
      <Tab.Screen
        name="Feeds"
        component={FeedScreen}
        options={{
          headerLeft: () => (
            <View style={styles.buttons}>
              <TransparentCircleButton name="warning" color="red" />
            </View>
          ),
          title: '로고!!!',
          headerTitleAlign: 'center',
          headerRight: () => (
            <View style={styles.buttons}>
              <TransparentCircleButton name="person" color="#009688" />
            </View>
          ),

          tabBarIcon: ({color, size}) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          title: '카메라',
          tabBarIcon: ({color, size}) => (
            <Icon name="photo-camera" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerLeft: () => (
            <View style={styles.buttons}>
              <TransparentCircleButton name="warning" color="red" />
            </View>
          ),
          title: '로고!!!',
          headerTitleAlign: 'center',
          headerRight: () => (
            <View style={styles.buttons}>
              <TransparentCircleButton name="person" color="#009688" />
            </View>
          ),

          tabBarIcon: ({color, size}) => (
            <Icon name="people" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  block: {
    height: 48,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default MainTab;
