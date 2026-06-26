import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { s } from '../theme/spacing';

interface HeaderBarProps {
  title: string;
  subtitle?: string;
}

export function HeaderBar({ title, subtitle }: HeaderBarProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: s(1)
  },
  title: {
    fontSize: s(5),
    fontWeight: '700',
    color: colors.textPrimary,
    fontFamily: 'Inter-Bold',
    letterSpacing: -0.5,
    lineHeight: s(5) * 1.2
  },
  subtitle: {
    fontSize: s(3),
    fontWeight: '400',
    color: colors.textSecondary,
    fontFamily: 'Inter-Regular',
    letterSpacing: 0.2,
    lineHeight: s(3) * 1.4
  }
});
