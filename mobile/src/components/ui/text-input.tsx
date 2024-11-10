import { colors } from '@/theme';
import { useState } from 'react';
import {
  TextInput as DefaultTextInput,
  Platform,
  type TextInputProps,
  StyleSheet,
} from 'react-native';

export const TextInput = ({
  placeholderTextColor,
  ...props
}: TextInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleEndEditing = () => {
    setIsFocused(false);
  };

  return (
    <DefaultTextInput
      {...props}
      onFocus={handleFocus}
      onEndEditing={handleEndEditing}
      style={[
        styles.inputStyle,
        isFocused && Platform.OS !== 'web'
          ? { borderColor: colors.blue500 }
          : {},
        props.style,
      ]}
      placeholderTextColor={placeholderTextColor || colors.primary500}
    />
  );
};

const styles = StyleSheet.create({
  inputStyle: {
    width: '100%',
    backgroundColor: colors.primary100, //  dark:bg-neutral-900
    borderWidth: 1,
    borderColor: colors.black, // dark: white
    opacity: 0.2,
    borderRadius: 6, // rounded-md
    height: 48,
    paddingHorizontal: 16,
    color: colors.primary900, // dark:primary50
  },
});
