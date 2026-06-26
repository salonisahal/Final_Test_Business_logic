import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { colors } from '../theme/colors';
import { s } from '../theme/spacing';
import { useAppContext } from '../components/AppProvider';
import { ErrorState } from '../components/ErrorState';

export default function LoginScreen() {
  const { login } = useAppContext();
  const [email, setEmail] = useState('demo@saasboard.io');
  const [password, setPassword] = useState('Welcome123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      await login(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        style={styles.keyboard}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Sign in</Text>
          <Text style={styles.subtitle}>Welcome back to SaaSBoard.</Text>
          {error ? <ErrorState title="Login failed" description={error} /> : null}
          <View style={styles.form}
            pointerEvents={loading ? 'none' : 'auto'}
          >
            <View>
              <Text style={styles.label}>Email</Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="name@company.com"
                placeholderTextColor={colors.textDisabled}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                returnKeyType="next"
                underlineColorAndroid="transparent"
                selectionColor={colors.primary}
                style={styles.input}
              />
            </View>
            <View>
              <Text style={styles.label}>Password</Text>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Your password"
                placeholderTextColor={colors.textDisabled}
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry
                returnKeyType="done"
                underlineColorAndroid="transparent"
                selectionColor={colors.primary}
                style={styles.input}
              />
            </View>
            <Pressable
              onPress={handleLogin}
              android_ripple={{ color: 'rgba(0,0,0,0.12)' }}
              style={({ pressed }) => [styles.button, pressed && Platform.OS === 'ios' && { opacity: 0.7 }]}
            >
              <Text style={styles.buttonText}>{loading ? 'Signing in...' : 'Sign in'}</Text>
            </Pressable>
            <Text style={styles.helper}>Use demo@saasboard.io / Welcome123</Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
    ...(Platform.OS === 'web' ? { overflow: 'hidden' as any, maxHeight: '100vh' as any } : {})
  },
  keyboard: {
    flex: 1
  },
  container: {
    flex: 1,
    padding: s(4),
    gap: s(3),
    justifyContent: 'center'
  },
  title: {
    fontSize: s(6),
    fontWeight: '700',
    color: colors.textPrimary,
    fontFamily: 'Inter-Bold',
    letterSpacing: -0.5,
    lineHeight: s(6) * 1.2
  },
  subtitle: {
    fontSize: s(3),
    fontWeight: '400',
    color: colors.textSecondary,
    fontFamily: 'Inter-Regular',
    letterSpacing: 0.2,
    lineHeight: s(3) * 1.4
  },
  form: {
    gap: s(3)
  },
  label: {
    fontSize: s(2.75),
    fontWeight: '600',
    color: colors.textPrimary,
    fontFamily: 'Inter-SemiBold',
    letterSpacing: 0.2,
    lineHeight: s(2.75) * 1.4,
    marginBottom: s(1)
  },
  input: {
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
  button: {
    marginTop: s(1),
    paddingVertical: s(3),
    borderRadius: s(2),
    backgroundColor: colors.primary,
    alignItems: 'center'
  },
  buttonText: {
    fontSize: s(3.5),
    fontWeight: '600',
    color: colors.textInverse,
    fontFamily: 'Inter-SemiBold',
    letterSpacing: 0.2,
    lineHeight: s(3.5) * 1.4
  },
  helper: {
    fontSize: s(2.5),
    fontWeight: '400',
    color: colors.textSecondary,
    fontFamily: 'Inter-Regular',
    letterSpacing: 0.2,
    lineHeight: s(2.5) * 1.4
  }
});
