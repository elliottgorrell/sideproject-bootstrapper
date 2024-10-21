import React from 'react'
import Icon from './Icon'
import { DARK_GRAY, PRIMARY_COLOR } from '../assets/styles'
import { type Ionicons } from '@expo/vector-icons'

export interface TabBarIconT {
  focused: boolean
  iconName: keyof typeof Ionicons.glyphMap
}

const TabBarIcon = ({ focused, iconName }: TabBarIconT): React.JSX.Element => {
  const iconFocused = focused ? PRIMARY_COLOR : DARK_GRAY

  return (
    <Icon name={iconName} size={32} color={iconFocused} />
  )
}

export default TabBarIcon
