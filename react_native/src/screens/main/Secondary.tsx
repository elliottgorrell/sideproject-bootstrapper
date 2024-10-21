import React from 'react'
import {
  ImageBackground,
  View
} from 'react-native'
import styles from '../../assets/styles'

const Messages = (): React.JSX.Element => (
  <ImageBackground
    source={require('../../assets/images/bg.png')}
    style={styles.bg}
  >
    <View style={styles.containerSecondary}>
    </View>
  </ImageBackground>
)

export default Messages
