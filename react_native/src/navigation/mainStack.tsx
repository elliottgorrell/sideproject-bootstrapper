import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { PRIMARY_COLOR, DARK_GRAY, BLACK, WHITE } from '../assets/styles'
import { TabBarIcon } from '../components'
import { Home, Secondary, Profile } from '../screens/main'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const Stack = createStackNavigator()
const Tab = createMaterialTopTabNavigator()

export default function MainStack (): React.JSX.Element {
  const insets = useSafeAreaInsets()

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Tab'
          options={{ headerShown: false, animationEnabled: false }}
        >
          {() => (
            <Tab.Navigator
              screenOptions={{
                swipeEnabled: false,
                tabBarInactiveTintColor: DARK_GRAY,
                tabBarActiveTintColor: PRIMARY_COLOR,
                tabBarIndicatorStyle: {
                  backgroundColor: 'transparent'
                },
                tabBarStyle: {
                  backgroundColor: WHITE,
                  borderTopWidth: 0,
                  marginBottom: 0,
                  shadowOpacity: 0.05,
                  shadowRadius: 10,
                  shadowColor: BLACK,
                  shadowOffset: { height: 0, width: 0 },
                  paddingTop: insets.top,
                  paddingLeft: insets.left,
                  paddingRight: insets.right
                },
                tabBarIconStyle: {
                  minHeight: 40,
                  minWidth: 40
                },
                tabBarShowLabel: false
              }}>

              <Tab.Screen
                name='Explore'
                component={Home}
                options={{
                  tabBarIcon: ({ focused }) => (
                    <TabBarIcon
                      focused={focused}
                      iconName='albums-outline'
                    />
                  )
                }}
              />

              <Tab.Screen
                name='Secondary'
                component={Secondary}
                options={{
                  tabBarIcon: ({ focused }) => (
                    <TabBarIcon
                      focused={focused}
                      iconName='chatbubble'
                    />
                  )
                }}
              />

              <Tab.Screen
                name='Profile'
                component={Profile}
                options={{
                  tabBarIcon: ({ focused }) => (
                    <TabBarIcon
                      focused={focused}
                      iconName='person'
                    />
                  )
                }}
              />
            </Tab.Navigator>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}
