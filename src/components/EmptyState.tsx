import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { s } from '../theme/spacing';

interface EmptyStateProps {
  title: string;
  description: string;
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconWrap}>
        <Ionicons name="sparkles" size={s(6)} color={colors.primary} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: s(6),
    gap: s(2)
  },
  iconWrap: {
    width: s(10),
    height: s(10),
    borderRadius: s(5),
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: s(4),
    fontWeight: '600',
    color: colors.textPrimary,
    fontFamily: 'Inter-SemiBold',
    letterSpacing: -0.5,
    lineHeight: s(4) * 1.2,
    textAlign: 'center'
  },
  description: {
    fontSize: s(3),
    fontWeight: '400',
    color: colors.textSecondary,
    fontFamily: 'Inter-Regular',
    letterSpacing: 0.2,
    lineHeight: s(3) * 1.4,
    textAlign: 'center'
  }
});
