import React, { useEffect, useState } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { s } from '../theme/spacing';
import { useAppContext } from '../components/AppProvider';
import { LoadingState } from '../components/LoadingState';

export default function ProfileScreen() {
  const { profile, selectedPlan, notificationsEnabled, updateProfile, toggleNotifications, logout, loading } = useAppContext();
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (profile) {
      setName(profile.name);
      setRole(profile.role);
    }
  }, [profile]);

  const handleSave = async () => {
    setMessage('');
    await updateProfile({ name, role });
    setMessage('Profile updated.');
  };

  if (loading || !profile) {
    return (
      <SafeAreaView style={styles.safe}>
        <StatusBar style="dark" />
        <LoadingState label="Loading profile..." />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={s(6)} color={colors.textInverse} />
        </View>
        <Text style={styles.title}>Profile</Text>
        <Text style={styles.subtitle}>Manage your personal settings.</Text>
        <View style={styles.card}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Your name"
            placeholderTextColor={colors.textDisabled}
            autoCapitalize="words"
            autoCorrect={false}
            returnKeyType="next"
            underlineColorAndroid="transparent"
            selectionColor={colors.primary}
            style={styles.input}
          />
          <Text style={styles.label}>Role</Text>
          <TextInput
            value={role}
            onChangeText={setRole}
            placeholder="Your role"
            placeholderTextColor={colors.textDisabled}
            autoCapitalize="words"
            autoCorrect={false}
            returnKeyType="done"
            underlineColorAndroid="transparent"
            selectionColor={colors.primary}
            style={styles.input}
          />
          <Text style={styles.label}>Email</Text>
          <Text style={styles.staticValue}>{profile.email}</Text>
        </View>
        {message ? <Text style={styles.successText}>{message}</Text> : null}
        <Pressable
          onPress={handleSave}
          android_ripple={{ color: 'rgba(0,0,0,0.12)' }}
          style={({ pressed }) => [styles.primaryButton, pressed && Platform.OS === 'ios' && { opacity: 0.7 }]}
        >
          <Text style={styles.primaryButtonText}>Save changes</Text>
        </Pressable>
        <View style={styles.card}>
          <Text style={styles.label}>Subscription plan</Text>
          <Text style={styles.planName}>{selectedPlan?.name ?? 'Starter'}</Text>
          <Text style={styles.planDescription}>{selectedPlan?.description ?? 'Basic plan'}</Text>
        </View>
        <View style={styles.card}>
          <View style={styles.toggleRow}>
            <View>
              <Text style={styles.label}>Notifications</Text>
              <Text style={styles.toggleDescription}>Product updates and announcements</Text>
            </View>
            <Pressable
              onPress={toggleNotifications}
              android_ripple={{ color: 'rgba(0,0,0,0.08)', borderless: true }}
              style={({ pressed }) => [styles.toggle, notificationsEnabled && styles.toggleActive, pressed && Platform.OS === 'ios' && { opacity: 0.7 }]}
            >
              <View style={[styles.toggleKnob, notificationsEnabled && styles.toggleKnobActive]} />
            </Pressable>
          </View>
        </View>
        <Pressable
          onPress={logout}
          android_ripple={{ color: 'rgba(0,0,0,0.12)' }}
          style={({ pressed }) => [styles.logoutButton, pressed && Platform.OS === 'ios' && { opacity: 0.7 }]}
        >
          <Text style={styles.logoutText}>Log out</Text>
        </Pressable>
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
  avatar: {
    width: s(12),
    height: s(12),
    borderRadius: s(6),
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center'
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
      android: { elevation: 2 },
      default: {}
    })
  },
  label: {
    fontSize: s(2.75),
    fontWeight: '600',
    color: colors.textPrimary,
    fontFamily: 'Inter-SemiBold',
    letterSpacing: 0.2,
    lineHeight: s(2.75) * 1.4
  },
  input: {
    borderWidth: s(0.25),
    borderColor: colors.border,
    borderRadius: s(2),
    paddingHorizontal: s(3),
    paddingVertical: s(2),
    backgroundColor: colors.background,
    fontSize: s(3),
    fontFamily: 'Inter-Regular',
    color: colors.textPrimary,
    lineHeight: s(3) * 1.4
  },
  staticValue: {
    fontSize: s(3),
    fontWeight: '500',
    color: colors.textSecondary,
    fontFamily: 'Inter-Medium',
    letterSpacing: 0.2,
    lineHeight: s(3) * 1.4
  },
  planName: {
    fontSize: s(4),
    fontWeight: '700',
    color: colors.textPrimary,
    fontFamily: 'Inter-Bold',
    letterSpacing: -0.5,
    lineHeight: s(4) * 1.2
  },
  planDescription: {
    fontSize: s(3),
    fontWeight: '400',
    color: colors.textSecondary,
    fontFamily: 'Inter-Regular',
    letterSpacing: 0.2,
    lineHeight: s(3) * 1.4
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: s(2)
  },
  toggleDescription: {
    fontSize: s(2.5),
    fontWeight: '400',
    color: colors.textSecondary,
    fontFamily: 'Inter-Regular',
    letterSpacing: 0.2,
    lineHeight: s(2.5) * 1.4
  },
  toggle: {
    width: s(10),
    height: s(5),
    borderRadius: s(2.5),
    backgroundColor: colors.border,
    padding: s(0.5),
    justifyContent: 'center'
  },
  toggleActive: {
    backgroundColor: colors.primary
  },
  toggleKnob: {
    width: s(4),
    height: s(4),
    borderRadius: s(2),
    backgroundColor: colors.surface
  },
  toggleKnobActive: {
    alignSelf: 'flex-end'
  },
  primaryButton: {
    paddingVertical: s(3),
    borderRadius: s(2),
    backgroundColor: colors.primary,
    alignItems: 'center'
  },
  primaryButtonText: {
    fontSize: s(3.5),
    fontWeight: '600',
    color: colors.textInverse,
    fontFamily: 'Inter-SemiBold',
    letterSpacing: 0.2,
    lineHeight: s(3.5) * 1.4
  },
  logoutButton: {
    paddingVertical: s(3),
    borderRadius: s(2),
    backgroundColor: colors.error,
    alignItems: 'center'
  },
  logoutText: {
    fontSize: s(3.5),
    fontWeight: '600',
    color: colors.textInverse,
    fontFamily: 'Inter-SemiBold',
    letterSpacing: 0.2,
    lineHeight: s(3.5) * 1.4
  },
  successText: {
    fontSize: s(2.75),
    fontWeight: '500',
    color: colors.success,
    fontFamily: 'Inter-Medium',
    letterSpacing: 0.2,
    lineHeight: s(2.75) * 1.4
  }
});
