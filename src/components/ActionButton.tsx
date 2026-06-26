import React from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { s } from '../theme/spacing';

interface ActionButtonProps {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
}

export function ActionButton({ label, icon, onPress }: ActionButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: 'rgba(0,0,0,0.08)' }}
      style={({ pressed }) => [styles.container, pressed && Platform.OS === 'ios' && { opacity: 0.7 }]}
    >
      <View style={styles.iconWrap}>
        <Ionicons name={icon} size={s(5)} color={colors.primary} />
      </View>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: s(3),
    backgroundColor: colors.surface,
    borderRadius: s(3),
    gap: s(2),
    borderWidth: s(0.25),
    borderColor: colors.border,
    ...Platform.select({
      ios: {
        shadowColor: colors.shadowColor,
        shadowOffset: { width: 0, height: s(1) },
        shadowOpacity: 0.08,
        shadowRadius: s(2)
      },
      android: { elevation: 2 },
      default: {}
    })
  },
  iconWrap: {
    width: s(9),
    height: s(9),
    borderRadius: s(4.5),
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center'
  },
  label: {
    fontSize: s(3),
    fontWeight: '500',
    color: colors.textPrimary,
    fontFamily: 'Inter-Medium',
    letterSpacing: 0.2,
    lineHeight: s(3) * 1.4
  }
});
