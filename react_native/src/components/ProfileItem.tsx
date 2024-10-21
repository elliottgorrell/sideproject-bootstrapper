import React from 'react'
import { Text, View } from 'react-native'

import styles from '../assets/styles'

export interface ProfileItemT {
  name: string
}

const ProfileItem = ({
  name
}: ProfileItemT): React.JSX.Element => (
  <View style={styles.containerProfileItem}>
    <View style={styles.matchesProfileItem}>
      <Text style={styles.matchesTextProfileItem}> Profile </Text>
    </View>

    <Text style={styles.name}>{name}</Text>
  </View>
)

export default ProfileItem
