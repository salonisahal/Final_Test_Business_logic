import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../theme/colors';
import { s } from '../theme/spacing';
import { KPI } from '../types';

interface KpiCardProps {
  item: KPI;
  gradient: string[];
}

export function KpiCard({ item, gradient }: KpiCardProps) {
  return (
    <LinearGradient colors={gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.value}>{item.value}</Text>
      <View style={styles.trendRow}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{item.trend}</Text>
        </View>
        <Text style={styles.caption}>vs last period</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    width: s(30),
    padding: s(3),
    borderRadius: s(3),
    gap: s(2),
    ...Platform.select({
      ios: {
        shadowColor: colors.shadowColor,
        shadowOffset: { width: 0, height: s(1) },
        shadowOpacity: 0.12,
        shadowRadius: s(3)
      },
      android: { elevation: 4 },
      default: {}
    })
  },
  title: {
    fontSize: s(3),
    fontWeight: '500',
    color: colors.textInverse,
    fontFamily: 'Inter-Medium',
    letterSpacing: 0.2,
    lineHeight: s(3) * 1.4
  },
  value: {
    fontSize: s(6),
    fontWeight: '700',
    color: colors.textInverse,
    fontFamily: 'Inter-Bold',
    letterSpacing: -0.5,
    lineHeight: s(6) * 1.2
  },
  trendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(2)
  },
  badge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: s(2),
    paddingVertical: s(1),
    borderRadius: s(2)
  },
  badgeText: {
    fontSize: s(2.5),
    fontWeight: '600',
    color: colors.textInverse,
    fontFamily: 'Inter-SemiBold',
    letterSpacing: 0.2,
    lineHeight: s(2.5) * 1.4
  },
  caption: {
    fontSize: s(2.5),
    fontWeight: '400',
    color: colors.textInverse,
    fontFamily: 'Inter-Regular',
    letterSpacing: 0.2,
    lineHeight: s(2.5) * 1.4
  }
});
