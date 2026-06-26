import React, { useEffect, useMemo, useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, TextInput, View, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '../theme/colors';
import { s } from '../theme/spacing';
import { ResourceItem, ResourceCategory } from '../types';
import { resourceService } from '../data/mockData';
import { ResourceCard } from '../components/ResourceCard';
import { LoadingState } from '../components/LoadingState';
import { EmptyState } from '../components/EmptyState';
import { RootStackParamList } from '../navigation';
import { useAppContext } from '../components/AppProvider';

export default function ResourcesScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { bookmarks, toggleBookmark } = useAppContext();
  const [resources, setResources] = useState<ResourceItem[]>([]);
  const [categories, setCategories] = useState<ResourceCategory[]>([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<ResourceCategory | 'All'>('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const [resourceData, categoryData] = await Promise.all([
        resourceService.getResources(),
        resourceService.getCategories()
      ]);
      setResources(resourceData);
      setCategories(categoryData);
      setLoading(false);
    };
    load();
  }, []);

  const filteredResources = useMemo(() => {
    const term = search.trim().toLowerCase();
    return resources.filter((item) => {
      const matchesCategory = filter === 'All' || item.category === filter;
      const matchesSearch = term.length === 0 || item.title.toLowerCase().includes(term) || item.summary.toLowerCase().includes(term);
      return matchesCategory && matchesSearch;
    });
  }, [resources, search, filter]);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <Text style={styles.title}>Resources</Text>
        <Text style={styles.subtitle}>Search articles, tutorials, and FAQs.</Text>
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search resources"
          placeholderTextColor={colors.textDisabled}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="search"
          underlineColorAndroid="transparent"
          selectionColor={colors.primary}
          style={styles.searchInput}
        />
        <View style={styles.filterRow}>
          {['All', ...categories].map((option) => (
            <Pressable
              key={option}
              onPress={() => setFilter(option as ResourceCategory | 'All')}
              android_ripple={{ color: 'rgba(0,0,0,0.08)' }}
              style={({ pressed }) => [styles.filterChip, filter === option && styles.filterChipActive, pressed && Platform.OS === 'ios' && { opacity: 0.7 }]}
            >
              <Text style={[styles.filterText, filter === option && styles.filterTextActive]}>{option}</Text>
            </Pressable>
          ))}
        </View>
        {loading ? (
          <LoadingState label="Loading resources..." />
        ) : filteredResources.length === 0 ? (
          <EmptyState title="No resources found" description="Try a different keyword or category." />
        ) : (
          <FlatList
            data={filteredResources}
            style={styles.list}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ResourceCard
                item={item}
                bookmarked={bookmarks.includes(item.id)}
                onPress={() => navigation.navigate('ResourceDetail', { id: item.id })}
                onBookmark={() => toggleBookmark(item.id)}
              />
            )}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            removeClippedSubviews={Platform.OS === 'android'}
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            windowSize={5}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
    ...(Platform.OS === 'web' ? { overflow: 'hidden' as any, maxHeight: '100vh' as any } : {})
  },
  container: {
    flex: 1,
    padding: s(4),
    gap: s(2)
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
  searchInput: {
    borderWidth: s(0.25),
    borderColor: colors.border,
    borderRadius: s(2),
    paddingHorizontal: s(3),
    paddingVertical: s(2),
    backgroundColor: colors.surface,
    fontSize: s(3),
    fontFamily: 'Inter-Regular',
    color: colors.textPrimary,
    lineHeight: s(3) * 1.4
  },
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: s(2)
  },
  filterChip: {
    paddingHorizontal: s(3),
    paddingVertical: s(1.5),
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
    fontSize: s(2.75),
    fontWeight: '500',
    color: colors.textSecondary,
    fontFamily: 'Inter-Medium',
    letterSpacing: 0.2,
    lineHeight: s(2.75) * 1.4
  },
  filterTextActive: {
    color: colors.primary
  },
  list: {
    flex: 1
  },
  listContent: {
    paddingTop: s(2),
    paddingBottom: s(10)
  },
  separator: {
    height: s(2)
  }
});
