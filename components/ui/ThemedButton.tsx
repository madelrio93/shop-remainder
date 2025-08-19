import { StyleSheet, TouchableOpacity, type TouchableOpacityProps } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedButtonProps = TouchableOpacityProps & {
  title: string;
  variant?: 'default' | 'primary';
};

export function ThemedButton({ style, title, variant = 'default', ...rest }: ThemedButtonProps) {
  const backgroundColor = useThemeColor(
    {},
    variant === 'primary' ? 'tint' : 'background'
  );
  const textColor = useThemeColor(
    {},
    variant === 'primary' ? 'background' : 'text'
  );
  const borderColor = useThemeColor({}, 'icon');

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor,
          borderColor: variant === 'default' ? borderColor : 'transparent',
        },
        variant === 'default' && styles.defaultButton,
        style,
      ]}
      activeOpacity={0.8}
      {...rest}
    >
      <ThemedText type="defaultSemiBold" style={[{ color: textColor }]}>
        {title}
      </ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  defaultButton: {
    borderWidth: 1,
  },
});
