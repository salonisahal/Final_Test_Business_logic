import React, { useEffect, useState } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { colors } from '../theme/colors';
import { s } from '../theme/spacing';
import { BillingCycle, PricingPlan } from '../types';
import { pricingService } from '../data/mockData';
import { PlanCard } from '../components/PlanCard';
import { LoadingState } from '../components/LoadingState';
import { useAppContext } from '../components/AppProvider';

export default function PricingScreen() {
  const { selectedPlan, selectPlan } = useAppContext();
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [billing, setBilling] = useState<BillingCycle>('Monthly');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await pricingService.getPlans();
      setPlans(data);
      setLoading(false);
    };
    load();
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Pricing</Text>
        <Text style={styles.subtitle}>Choose the plan that matches your growth stage.</Text>
        <View style={styles.toggleRow}>
          {(['Monthly', 'Yearly'] as BillingCycle[]).map((option) => (
            <Pressable
              key={option}
              onPress={() => setBilling(option)}
              android_ripple={{ color: 'rgba(0,0,0,0.08)' }}
              style={({ pressed }) => [styles.toggleChip, billing === option && styles.toggleChipActive, pressed && Platform.OS === 'ios' && { opacity: 0.7 }]}
            >
              <Text style={[styles.toggleText, billing === option && styles.toggleTextActive]}>{option}</Text>
            </Pressable>
          ))}
        </View>
        {loading ? (
          <LoadingState label="Loading pricing..." />
        ) : (
          <View style={styles.planList}>
            {plans.map((plan) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                billing={billing}
                selected={selectedPlan?.id === plan.id}
                onSelect={() => selectPlan(plan)}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
    ...(Platform.OS === 'web' ? { overflow: 'hidden' as any, maxHeight: '100vh' as any } : {})
  },
  content: {
    padding: s(4),
    gap: s(3)
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
  },
  toggleRow: {
    flexDirection: 'row',
    gap: s(2)
  },
  toggleChip: {
    paddingHorizontal: s(4),
    paddingVertical: s(2),
    borderRadius: s(4),
    borderWidth: s(0.25),
    borderColor: colors.border,
    backgroundColor: colors.surface
  },
  toggleChipActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight
  },
  toggleText: {
    fontSize: s(3),
    fontWeight: '500',
    color: colors.textSecondary,
    fontFamily: 'Inter-Medium',
    letterSpacing: 0.2,
    lineHeight: s(3) * 1.4
  },
  toggleTextActive: {
    color: colors.primary
  },
  planList: {
    gap: s(3),
    paddingBottom: s(10)
  }
});
