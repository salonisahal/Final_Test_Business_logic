import React from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { s } from '../theme/spacing';
import { PricingPlan, BillingCycle } from '../types';

interface PlanCardProps {
  plan: PricingPlan;
  billing: BillingCycle;
  selected: boolean;
  onSelect: () => void;
}

export function PlanCard({ plan, billing, selected, onSelect }: PlanCardProps) {
  return (
    <Pressable
      onPress={onSelect}
      android_ripple={{ color: 'rgba(0,0,0,0.08)' }}
      style={({ pressed }) => [styles.card, selected && styles.cardSelected, pressed && Platform.OS === 'ios' && { opacity: 0.7 }]}
    >
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>{plan.name}</Text>
          <Text style={styles.description}>{plan.description}</Text>
        </View>
        {selected ? (
          <Ionicons name="checkmark-circle" size={s(5)} color={colors.primary} />
        ) : (
          <Ionicons name="ellipse-outline" size={s(5)} color={colors.border} />
        )}
      </View>
      <Text style={styles.price}>{billing === 'Monthly' ? plan.monthlyPrice : plan.yearlyPrice}</Text>
      <Text style={styles.billingLabel}>{billing} billing</Text>
      <View style={styles.featureList}>
        {plan.features.map((feature) => (
          <View key={feature} style={styles.featureRow}>
            <Ionicons name="checkmark" size={s(3.5)} color={colors.success} />
            <Text style={styles.featureText}>{feature}</Text>
          </View>
        ))}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: s(3),
    borderRadius: s(3),
    backgroundColor: colors.surface,
    borderWidth: s(0.25),
    borderColor: colors.border,
    gap: s(2),
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
  cardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: s(2)
  },
  title: {
    fontSize: s(4),
    fontWeight: '700',
    color: colors.textPrimary,
    fontFamily: 'Inter-Bold',
    letterSpacing: -0.5,
    lineHeight: s(4) * 1.2
  },
  description: {
    fontSize: s(3),
    fontWeight: '400',
    color: colors.textSecondary,
    fontFamily: 'Inter-Regular',
    letterSpacing: 0.2,
    lineHeight: s(3) * 1.4
  },
  price: {
    fontSize: s(6),
    fontWeight: '700',
    color: colors.textPrimary,
    fontFamily: 'Inter-Bold',
    letterSpacing: -0.5,
    lineHeight: s(6) * 1.2
  },
  billingLabel: {
    fontSize: s(2.5),
    fontWeight: '500',
    color: colors.textSecondary,
    fontFamily: 'Inter-Medium',
    letterSpacing: 0.2,
    lineHeight: s(2.5) * 1.4
  },
  featureList: {
    gap: s(1)
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(1)
  },
  featureText: {
    fontSize: s(2.75),
    fontWeight: '400',
    color: colors.textSecondary,
    fontFamily: 'Inter-Regular',
    letterSpacing: 0.2,
    lineHeight: s(2.75) * 1.4
  }
});
