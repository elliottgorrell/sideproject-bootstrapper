import React, { createContext, useContext, useState } from 'react';
import {
  Pressable,
  Text,
  View,
  StyleSheet,
  type PressableProps,
  type TextProps,
  type ViewStyle,
} from 'react-native';
import { useColorScheme } from 'react-native';
import { Icon, type IconProps } from './icon';
import { colors } from '@/theme';

export type ButtonVariant =
  | 'default'
  | 'success'
  | 'destructive'
  | 'info'
  | 'warning';

interface ButtonProps extends PressableProps {
  variant?: ButtonVariant;
  text?: string;
  icon?: IconProps;
  selected?: boolean;
}

const VariantContext = createContext<ButtonVariant>('default');

export const ButtonText = ({ style, children }: TextProps) => {
  const variant = useContext(VariantContext);

  const variantStyles = {
    default: { color: colors.primary100 },
    success: { color: colors.green100 },
    destructive: { color: colors.red50 },
    warning: { color: colors.warning100 },
    info: { color: colors.blue100 },
  };

  return (
    <Text style={[styles.text, variantStyles[variant], style]}>{children}</Text>
  );
};

export const ButtonIcon = ({ name, type, color, size }: IconProps) => {
  const deviceColorScheme = useColorScheme();
  const variant = useContext(VariantContext);

  const variantColors = {
    default:
      deviceColorScheme === 'dark' ? colors.primary900 : colors.primary100,
    success: colors.green50,
    destructive: colors.red50,
    warning: colors.warning100,
    info: colors.blue50,
  };

  const defaultColor = variantColors[variant];

  return (
    <Icon
      name={name}
      type={type}
      size={size || 18}
      color={color || defaultColor}
    />
  );
};

export const Button = ({
  text,
  icon,
  variant = 'default',
  selected,
  style,
  children,
  ...props
}: ButtonProps) => {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  const variantStyles = {
    default: {
      bg: colors.primary500,
      hover: colors.primary900,
    },
    success: {
      bg: colors.green600,
      hover: colors.green700,
    },
    destructive: {
      bg: colors.red600,
      hover: colors.red700,
    },
    warning: {
      bg: colors.warning600,
      hover: colors.warning700,
    },
    info: {
      bg: colors.blue600,
      hover: colors.blue700,
    },
  };

  const renderContent = () => {
    if (icon && text) {
      return (
        <View style={styles.iconTextContainer}>
          <ButtonIcon {...icon} />
          <ButtonText>{text}</ButtonText>
        </View>
      );
    }

    if (icon) {
      return (
        <View style={styles.iconOnlyContainer}>
          {icon ? <ButtonIcon {...icon} /> : null}
          <>{children}</>
        </View>
      );
    }

    if (text) {
      return <ButtonText>{text}</ButtonText>;
    }

    if (typeof children === 'string') {
      return <ButtonText>{children}</ButtonText>;
    }

    return <>children</>;
  };

  return (
    <Pressable
      {...props}
      onHoverIn={() => setHovered(true)}
      onHoverOut={() => setHovered(false)}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      style={[
        styles.button,
        { backgroundColor: variantStyles[variant].bg },
        (hovered || pressed || selected) && {
          backgroundColor: variantStyles[variant].hover,
        },
        style as ViewStyle,
      ]}
    >
      <VariantContext.Provider value={variant}>
        {renderContent()}
      </VariantContext.Provider>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 40,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    gap: 8,
  },
  text: {
    fontWeight: 'bold',
  },
  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconOnlyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
