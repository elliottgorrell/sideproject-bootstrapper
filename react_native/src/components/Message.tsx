import React from "react";
import { Text, View, Image, type ImageSourcePropType } from "react-native";

import styles from "@/assets/styles";
export interface MessageT {
  image: ImageSourcePropType;
  lastMessage: string;
  name: string;
}
const Message = ({ image, lastMessage, name }: MessageT): React.JSX.Element => (
  <View style={styles.containerSecondary}>
    <Image source={image} style={styles.avatar} />
    <View>
      <Text>{name}</Text>
      <Text style={styles.message}>{lastMessage}</Text>
    </View>
  </View>
);

export default Message;
