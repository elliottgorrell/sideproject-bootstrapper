import React from 'react';
import { View, Text } from 'react-native';
import tw from '@/lib/tailwind';
import type { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import type { MainTabNavigatorParamList } from '@/navigation/mainStack';

type ScreenProps = MaterialTopTabScreenProps<
  MainTabNavigatorParamList,
  'Secondary'
>;

const Messages = (props: ScreenProps): React.JSX.Element => (
  <View style={tw`flex-1 flex-col bg-white items-center`}>
    <Text style={tw`text-3xl font-extrabold`}>
      {props.route.params.message}
    </Text>
  </View>
);

export default Messages;
