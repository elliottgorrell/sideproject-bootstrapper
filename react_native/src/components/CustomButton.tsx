import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface CustomButtonProps {
  onPress: () => void;
  title: string;
  buttonStyle?: object;
  textStyle?: object;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  onPress,
  title,
  buttonStyle = {},
  textStyle = {},
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, buttonStyle]}>
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  text: {
    color: "#ffffff",
    fontSize: 16,
  },
});

export default CustomButton;
