import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Home(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello World</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFFFFF', // equivalent to Tailwind's `bg-white`
    alignItems: 'center',
  },
  text: {
    fontSize: 24, // equivalent to Tailwind's `text-3xl`
    fontWeight: '800', // equivalent to Tailwind's `font-extrabold`
  },
});
