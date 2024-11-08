import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import type { MainTabNavigatorParamList } from '@/navigation/mainStack';

type ScreenProps = MaterialTopTabScreenProps<
  MainTabNavigatorParamList,
  'Secondary'
>;

const Messages = (props: ScreenProps): React.JSX.Element => (
  <View style={styles.container}>
    <Text style={styles.text}>{props.route.params.message}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: '800',
  },
});

export default Messages;
