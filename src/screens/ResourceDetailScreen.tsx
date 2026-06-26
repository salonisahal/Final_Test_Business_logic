import React, { useEffect, useState } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useRoute } from '@react-navigation/native';
import { colors } from '../theme/colors';
import { s } from '../theme/spacing';
import { ResourceItem } from '../types';
import { resourceService } from '../data/mockData';
import { LoadingState } from '../components/LoadingState';
import { EmptyState } from '../components/EmptyState';
import { RootStackParamList } from '../navigation';
import { useAppContext } from '../components/AppProvider';

export default function ResourceDetailScreen() {
  const route = useRoute<RouteProp<RootStackParamList, 'ResourceDetail'>>();
  const { bookmarks, toggleBookmark } = useAppContext();
  const [resource, setResource] = useState<ResourceItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await resourceService.getResourceById(route.params.id);
      setResource(data);
      setLoading(false);
    };
    load();
  }, [route.params.id]);

  if (loading) {
    return (
      <SafeAreaView style={styles.safe}>
        <StatusBar style="dark" />
        <LoadingState label="Loading resource..." />
      </SafeAreaView>
    );
  }

  if (!resource) {
    return (
      <SafeAreaView style={styles.safe}>
        <StatusBar style="dark" />
        <EmptyState title="Resource missing" description="We couldn't find that resource." />
      </SafeAreaView>
    );
  }

  const isBookmarked = bookmarks.includes(resource.id);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.category}>{resource.category}</Text>
            <Text style={styles.title}>{resource.title}</Text>
            <Text style={styles.duration}>{resource.duration}</Text>
          </View>
          <Pressable
            onPress={() => toggleBookmark(resource.id)}
            android_ripple={{ color: 'rgba(0,0,0,0.08)', borderless: true }}
            style={({ pressed }) => [styles.bookmark, pressed && Platform.OS === 'ios' && { opacity: 0.7 }]}
          >
            <Ionicons name={isBookmarked ? 'bookmark' : 'bookmark-outline'} size={s(5)} color={colors.primary} />
          </Pressable>
        </View>
        <Text style={styles.body}>{resource.content}</Text>
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
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: s(2)
  },
  category: {
    fontSize: s(2.75),
    fontWeight: '600',
    color: colors.accent,
    fontFamily: 'Inter-SemiBold',
    letterSpacing: 1.2,
    lineHeight: s(2.75) * 1.4,
    textTransform: 'uppercase'
  },
  title: {
    fontSize: s(5),
    fontWeight: '700',
    color: colors.textPrimary,
    fontFamily: 'Inter-Bold',
    letterSpacing: -0.5,
    lineHeight: s(5) * 1.2
  },
  duration: {
    fontSize: s(2.5),
    fontWeight: '500',
    color: colors.textSecondary,
    fontFamily: 'Inter-Medium',
    letterSpacing: 0.2,
    lineHeight: s(2.5) * 1.4
  },
  bookmark: {
    padding: s(2),
    borderRadius: s(4),
    backgroundColor: colors.surface,
    borderWidth: s(0.25),
    borderColor: colors.border
  },
  body: {
    fontSize: s(3.25),
    fontWeight: '400',
    color: colors.textPrimary,
    fontFamily: 'Inter-Regular',
    letterSpacing: 0.2,
    lineHeight: s(3.25) * 1.4
  }
});
