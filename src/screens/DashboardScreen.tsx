import React, { useEffect, useState } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { s } from '../theme/spacing';
import { DashboardFilter, DashboardMetric } from '../types';
import { dashboardService } from '../data/mockData';
import { StatCard } from '../components/StatCard';
import { LoadingState } from '../components/LoadingState';
import { ErrorState } from '../components/ErrorState';
import { HeaderBar } from '../components/HeaderBar';

export default function DashboardScreen() {
  const [filter, setFilter] = useState<DashboardFilter>('Daily');
  const [metrics, setMetrics] = useState<DashboardMetric[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadMetrics = async (nextFilter = filter) => {
    setLoading(true);
    setError('');
    try {
      const data = await dashboardService.getDashboardMetrics(nextFilter);
      setMetrics(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load dashboard metrics.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMetrics(filter);
  }, [filter]);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <HeaderBar title="Dashboard" subtitle="Monitor performance in real time." />
        <View style={styles.filterRow}>
          {(['Daily', 'Monthly'] as DashboardFilter[]).map((option) => (
            <Pressable
              key={option}
              onPress={() => setFilter(option)}
              android_ripple={{ color: 'rgba(0,0,0,0.08)' }}
              style={({ pressed }) => [styles.filterChip, filter === option && styles.filterChipActive, pressed && Platform.OS === 'ios' && { opacity: 0.7 }]}
            >
              <Text style={[styles.filterText, filter === option && styles.filterTextActive]}>{option}</Text>
            </Pressable>
          ))}
          <Pressable
            onPress={() => loadMetrics()}
            android_ripple={{ color: 'rgba(0,0,0,0.08)', borderless: true }}
            style={({ pressed }) => [styles.refreshButton, pressed && Platform.OS === 'ios' && { opacity: 0.7 }]}
          >
            <Ionicons name="refresh" size={s(5)} color={colors.primary} />
          </Pressable>
        </View>
        {loading ? (
          <LoadingState label="Refreshing dashboard..." />
        ) : error ? (
          <ErrorState title="Dashboard error" description={error} onRetry={() => loadMetrics()} />
        ) : metrics.length === 0 ? (
          <LoadingState label="No metrics available yet." />
        ) : (
          <View style={styles.grid}>
            {metrics.map((metric) => (
              <StatCard key={metric.id} metric={metric} />
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
    gap: s(4)
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(2)
  },
  filterChip: {
    paddingHorizontal: s(3),
    paddingVertical: s(2),
    borderRadius: s(4),
    borderWidth: s(0.25),
    borderColor: colors.border,
    backgroundColor: colors.surface
  },
  filterChipActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight
  },
  filterText: {
    fontSize: s(3),
    fontWeight: '500',
    color: colors.textSecondary,
    fontFamily: 'Inter-Medium',
    letterSpacing: 0.2,
    lineHeight: s(3) * 1.4
  },
  filterTextActive: {
    color: colors.primary
  },
  refreshButton: {
    marginLeft: 'auto',
    padding: s(2),
    borderRadius: s(4),
    backgroundColor: colors.surface,
    borderWidth: s(0.25),
    borderColor: colors.border
  },
  grid: {
    gap: s(3)
  }
});
