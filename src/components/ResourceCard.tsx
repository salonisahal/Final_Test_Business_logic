import React from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { s } from '../theme/spacing';
import { ResourceItem } from '../types';

interface ResourceCardProps {
  item: ResourceItem;
  bookmarked: boolean;
  onPress: () => void;
  onBookmark: () => void;
}

export function ResourceCard({ item, bookmarked, onPress, onBookmark }: ResourceCardProps) {
  return (
    <View style={styles.card}>
      <Pressable
        onPress={onPress}
        android_ripple={{ color: 'rgba(0,0,0,0.08)' }}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={styles.content} pointerEvents="none">
        <Text style={styles.category}>{item.category}</Text>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.summary}>{item.summary}</Text>
        <Text style={styles.duration}>{item.duration}</Text>
      </View>
      <Pressable
        onPress={onBookmark}
        hitSlop={{ top: s(2), bottom: s(2), left: s(2), right: s(2) }}
        android_ripple={{ color: 'rgba(0,0,0,0.08)', borderless: true }}
        style={({ pressed }) => [styles.bookmark, pressed && Platform.OS === 'ios' && { opacity: 0.7 }]}
      >
        <Ionicons name={bookmarked ? 'bookmark' : 'bookmark-outline'} size={s(4)} color={colors.primary} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: s(3),
    borderRadius: s(3),
    backgroundColor: colors.surface,
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
  content: {
    gap: s(1)
  },
  category: {
    fontSize: s(2.5),
    fontWeight: '600',
    color: colors.accent,
    fontFamily: 'Inter-SemiBold',
    letterSpacing: 1.2,
    lineHeight: s(2.5) * 1.4,
    textTransform: 'uppercase'
  },
  title: {
    fontSize: s(4),
    fontWeight: '600',
    color: colors.textPrimary,
    fontFamily: 'Inter-SemiBold',
    letterSpacing: -0.5,
    lineHeight: s(4) * 1.2
  },
  summary: {
    fontSize: s(3),
    fontWeight: '400',
    color: colors.textSecondary,
    fontFamily: 'Inter-Regular',
    letterSpacing: 0.2,
    lineHeight: s(3) * 1.4
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
    position: 'absolute',
    top: s(3),
    right: s(3)
  }
});
