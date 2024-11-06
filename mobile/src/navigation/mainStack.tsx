import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Home, Secondary, Profile } from '@/screens/main';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import tw from '@/lib/tailwind';
import { Icon } from '@/components/ui';
import type { Ionicons } from '@expo/vector-icons';

type tabIconsType = Record<string, keyof typeof Ionicons.glyphMap>;

const tabIcons: tabIconsType = {
  Home: 'albums-outline',
  Secondary: 'chatbubble',
  Profile: 'person',
};

export interface MainTabNavigatorParamList {
  Home: undefined;
  Secondary: { message: string };
  Profile: undefined;
  [key: string]: undefined | { message: string };
}

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator<MainTabNavigatorParamList>();

export default function MainStack(): React.JSX.Element {
  const insets = useSafeAreaInsets();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Tab"
          options={{ headerShown: false, animationEnabled: false }}
        >
          {() => (
            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarInactiveTintColor: tw.color('neutral-200'),
                tabBarActiveTintColor: tw.color('neutral-500'),
                tabBarIndicatorStyle: {
                  backgroundColor: 'transparent',
                },
                tabBarStyle: {
                  backgroundColor: tw.color('white'),
                  paddingTop: insets.top,
                  paddingLeft: insets.left,
                  paddingRight: insets.right,
                },
                tabBarIconStyle: {
                  minHeight: 40,
                  minWidth: 40,
                },
                tabBarIcon: ({ focused, color }) => {
                  const iconName = tabIcons[route.name];
                  return (
                    <Icon
                      type="Ionicons"
                      name={iconName}
                      size={32}
                      color={color}
                    />
                  );
                },
                tabBarShowLabel: false,
              })}
            >
              <Tab.Screen name="Home" component={Home} />
              <Tab.Screen
                name="Secondary"
                component={Secondary}
                initialParams={{ message: 'Hell World! (From Params)' }}
              />
              <Tab.Screen name="Profile" component={Profile} />
            </Tab.Navigator>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
