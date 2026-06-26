import React from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { s } from '../theme/spacing';

interface ErrorStateProps {
  title: string;
  description: string;
  onRetry?: () => void;
}

export function ErrorState({ title, description, onRetry }: ErrorStateProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconWrap}>
        <Ionicons name="warning" size={s(6)} color={colors.error} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      {onRetry ? (
        <Pressable
          onPress={onRetry}
          android_ripple={{ color: 'rgba(0,0,0,0.08)' }}
          style={({ pressed }) => [styles.button, pressed && Platform.OS === 'ios' && { opacity: 0.7 }]}
        >
          <Text style={styles.buttonText}>Try again</Text>
        </Pressable>
      ) : null}
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
    backgroundColor: 'rgba(239, 68, 68, 0.12)',
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
  },
  button: {
    marginTop: s(2),
    paddingHorizontal: s(4),
    paddingVertical: s(2),
    borderRadius: s(2),
    backgroundColor: colors.primary
  },
  buttonText: {
    fontSize: s(3),
    fontWeight: '600',
    color: colors.textInverse,
    fontFamily: 'Inter-SemiBold',
    letterSpacing: 0.2,
    lineHeight: s(3) * 1.4
  }
});
