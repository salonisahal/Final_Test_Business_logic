import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Platform, Pressable, ScrollView, StyleSheet, Text, View, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../theme/colors';
import { s } from '../theme/spacing';
import { ActivityItem, KPI } from '../types';
import { activityService, metricsService } from '../data/mockData';
import { HeaderBar } from '../components/HeaderBar';
import { KpiCard } from '../components/KpiCard';
import { ActionButton } from '../components/ActionButton';
import { LoadingState } from '../components/LoadingState';
import { ErrorState } from '../components/ErrorState';
import { RootStackParamList } from '../navigation';

export default function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [kpis, setKpis] = useState<KPI[]>([]);
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const animations = useRef([new Animated.Value(0), new Animated.Value(0), new Animated.Value(0)]).current;

  const loadData = async () => {
    setError('');
    setLoading(true);
    try {
      const [kpiData, activityData] = await Promise.all([
        metricsService.getHomeMetrics(),
        activityService.getRecentActivities()
      ]);
      setKpis(kpiData);
      setActivities(activityData);
      animations.forEach((anim, index) => {
        anim.setValue(0);
        Animated.timing(anim, {
          toValue: 1,
          duration: 500,
          delay: index * 120,
          useNativeDriver: true
        }).start();
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load home data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const gradients = useMemo(
    () => [
      [colors.primary, colors.primaryDark],
      [colors.info, colors.primary],
      [colors.accent, colors.primary]
    ],
    []
  );

  const renderHeader = () => (
    <View style={styles.headerContent}>
      <HeaderBar title="Welcome back" subtitle="Here is your SaaS pulse for today." />
      <View style={styles.kpiSection}>
        <Text style={styles.sectionTitle}>Key performance</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          directionalLockEnabled
          decelerationRate="fast"
          contentContainerStyle={styles.kpiRow}
        >
          {kpis.map((item, index) => (
            <Animated.View
              key={item.id}
              style={{
                transform: [
                  { translateY: animations[index].interpolate({ inputRange: [0, 1], outputRange: [s(4), 0] }) },
                  { scale: animations[index].interpolate({ inputRange: [0, 1], outputRange: [0.96, 1] }) }
                ],
                opacity: animations[index]
              }}
            >
              <KpiCard item={item} gradient={gradients[index % gradients.length]} />
            </Animated.View>
          ))}
        </ScrollView>
      </View>
      <View style={styles.sectionBlock}>
        <Text style={styles.sectionTitle}>Quick actions</Text>
        <View style={styles.actionRow}>
          <ActionButton label="Dashboard" icon="speedometer" onPress={() => navigation.navigate('MainTabs', { screen: 'Dashboard' })} />
          <ActionButton label="Resources" icon="book" onPress={() => navigation.navigate('MainTabs', { screen: 'Resources' })} />
        </View>
        <View style={styles.actionRow}>
          <ActionButton label="Profile" icon="person" onPress={() => navigation.navigate('MainTabs', { screen: 'Profile' })} />
          <ActionButton label="Contact" icon="chatbubbles" onPress={() => navigation.navigate('Contact')} />
        </View>
      </View>
      <Text style={styles.sectionTitle}>Recent activity</Text>
    </View>
  );

  const renderActivity = ({ item }: { item: ActivityItem }) => (
    <View style={styles.activityCard}>
      <Text style={styles.activityTitle}>{item.title}</Text>
      <Text style={styles.activityDescription}>{item.description}</Text>
      <Text style={styles.activityTime}>{item.timestamp}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      {loading ? (
        <LoadingState label="Loading dashboard..." />
      ) : error ? (
        <ErrorState title="Home data failed" description={error} onRetry={loadData} />
      ) : (
        <FlatList
          data={activities}
          style={styles.list}
          keyExtractor={(item) => item.id}
          renderItem={renderActivity}
          ListHeaderComponent={renderHeader}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          removeClippedSubviews={Platform.OS === 'android'}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={5}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
    ...(Platform.OS === 'web' ? { overflow: 'hidden' as any, maxHeight: '100vh' as any } : {})
  },
  list: {
    flex: 1
  },
  listContent: {
    padding: s(4),
    paddingBottom: s(8)
  },
  headerContent: {
    gap: s(4)
  },
  sectionTitle: {
    fontSize: s(3.5),
    fontWeight: '600',
    color: colors.textPrimary,
    fontFamily: 'Inter-SemiBold',
    letterSpacing: -0.5,
    lineHeight: s(3.5) * 1.2
  },
  kpiSection: {
    gap: s(2)
  },
  kpiRow: {
    gap: s(3)
  },
  sectionBlock: {
    gap: s(2)
  },
  actionRow: {
    flexDirection: 'row',
    gap: s(3)
  },
  activityCard: {
    padding: s(3),
    borderRadius: s(3),
    backgroundColor: colors.surface,
    borderWidth: s(0.25),
    borderColor: colors.border,
    gap: s(1),
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
  activityTitle: {
    fontSize: s(3.5),
    fontWeight: '600',
    color: colors.textPrimary,
    fontFamily: 'Inter-SemiBold',
    letterSpacing: -0.5,
    lineHeight: s(3.5) * 1.2
  },
  activityDescription: {
    fontSize: s(3),
    fontWeight: '400',
    color: colors.textSecondary,
    fontFamily: 'Inter-Regular',
    letterSpacing: 0.2,
    lineHeight: s(3) * 1.4
  },
  activityTime: {
    fontSize: s(2.5),
    fontWeight: '500',
    color: colors.textSecondary,
    fontFamily: 'Inter-Medium',
    letterSpacing: 0.2,
    lineHeight: s(2.5) * 1.4
  },
  separator: {
    height: s(2)
  }
});
