import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { colors } from '../theme/colors';
import { s } from '../theme/spacing';

interface ProgressBarProps {
  progress: number;
}

export function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <View style={styles.track}>
      <View style={[styles.fill, { width: `${Math.min(Math.max(progress, 0), 1) * 100}%` }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: s(2),
    borderRadius: s(1),
    backgroundColor: colors.primaryLight,
    overflow: 'hidden'
  },
  fill: {
    height: '100%',
    borderRadius: s(1),
    backgroundColor: colors.primary
  }
});
