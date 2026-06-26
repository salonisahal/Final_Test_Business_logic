import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { s } from '../theme/spacing';
import { DashboardMetric } from '../types';
import { ProgressBar } from './ProgressBar';

interface StatCardProps {
  metric: DashboardMetric;
}

export function StatCard({ metric }: StatCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>{metric.title}</Text>
        <Text style={styles.delta}>{metric.delta}</Text>
      </View>
      <Text style={styles.value}>{metric.value}</Text>
      <ProgressBar progress={metric.progress} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: s(3),
    borderRadius: s(3),
    backgroundColor: colors.surface,
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
      android: { elevation: 3 },
      default: {}
    })
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  title: {
    fontSize: s(3),
    fontWeight: '500',
    color: colors.textSecondary,
    fontFamily: 'Inter-Medium',
    letterSpacing: 0.2,
    lineHeight: s(3) * 1.4
  },
  delta: {
    fontSize: s(2.5),
    fontWeight: '600',
    color: colors.success,
    fontFamily: 'Inter-SemiBold',
    letterSpacing: 0.2,
    lineHeight: s(2.5) * 1.4
  },
  value: {
    fontSize: s(5),
    fontWeight: '700',
    color: colors.textPrimary,
    fontFamily: 'Inter-Bold',
    letterSpacing: -0.5,
    lineHeight: s(5) * 1.2
  }
});
