import React from 'react'
import { Ionicons } from '@expo/vector-icons'

export interface IconT {
  name: keyof typeof Ionicons.glyphMap
  size: number
  color: string
  style?: object
}
const Icon = ({ color, name, size, style }: IconT): React.JSX.Element => (
  <Ionicons name={name} size={size} color={color} style={style} />
)

export default Icon
