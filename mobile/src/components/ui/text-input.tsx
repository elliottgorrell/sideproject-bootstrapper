import { colors, darkModeVariant } from '@/theme';
import { useState } from 'react';
import {
  TextInput as DefaultTextInput,
  Platform,
  type TextInputProps,
  StyleSheet,
  useColorScheme,
} from 'react-native';

export const TextInput = ({
  placeholderTextColor,
  ...props
}: TextInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const deviceColorScheme = useColorScheme();

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
        {
          borderColor: darkModeVariant(
            deviceColorScheme,
            colors.black,
            colors.white
          ),
          backgroundColor: darkModeVariant(
            deviceColorScheme,
            colors.primary100,
            colors.primary900
          ),
          color: darkModeVariant(
            deviceColorScheme,
            colors.primary900,
            colors.primary100
          ),
        },
        props.style,
        isFocused && Platform.OS !== 'web'
          ? { borderColor: colors.blue500 }
          : {},
      ]}
      placeholderTextColor={placeholderTextColor || colors.primary500}
    />
  );
};

const styles = StyleSheet.create({
  inputStyle: {
    width: '100%',
    borderWidth: 1,
    opacity: 0.2,
    borderRadius: 6,
    height: 48,
    paddingHorizontal: 16,
  },
});
