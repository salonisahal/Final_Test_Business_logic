import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { colors } from '../theme/colors';
import { s } from '../theme/spacing';
import { useAppContext } from '../components/AppProvider';
import { LoadingState } from '../components/LoadingState';
import { ErrorState } from '../components/ErrorState';

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Enter a valid email'),
  message: z.string().min(10, 'Message must be at least 10 characters')
});

type FormValues = z.infer<typeof schema>;

export default function ContactScreen() {
  const { addInquiry } = useAppContext();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', email: '', message: '' }
  });

  const onSubmit = async (values: FormValues) => {
    setStatus('loading');
    setErrorMessage('');
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      if (Math.random() < 0.2) {
        throw new Error('Network request failed. Please retry.');
      }
      await addInquiry({
        id: `inq-${Date.now()}`,
        name: values.name,
        email: values.email,
        message: values.message,
        createdAt: new Date().toISOString()
      });
      setStatus('success');
      reset();
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Request failed.');
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
          <Text style={styles.title}>Contact us</Text>
          <Text style={styles.subtitle}>Tell us how we can help your team.</Text>
          {status === 'loading' ? <LoadingState label="Sending message..." /> : null}
          {status === 'error' ? (
            <ErrorState title="Request failed" description={errorMessage} onRetry={handleSubmit(onSubmit)} />
          ) : null}
          {status === 'success' ? (
            <View style={styles.successCard}>
              <Text style={styles.successTitle}>Message sent</Text>
              <Text style={styles.successText}>We will respond within one business day.</Text>
            </View>
          ) : null}
          <View style={styles.form}
            pointerEvents={status === 'loading' ? 'none' : 'auto'}
          >
            <Controller
              control={control}
              name="name"
              render={({ field: { value, onChange } }) => (
                <View>
                  <Text style={styles.label}>Name</Text>
                  <TextInput
                    value={value}
                    onChangeText={onChange}
                    placeholder="Your name"
                    placeholderTextColor={colors.textDisabled}
                    autoCapitalize="words"
                    autoCorrect={false}
                    returnKeyType="next"
                    underlineColorAndroid="transparent"
                    selectionColor={colors.primary}
                    style={styles.input}
                  />
                  {errors.name ? <Text style={styles.errorText}>{errors.name.message}</Text> : null}
                </View>
              )}
            />
            <Controller
              control={control}
              name="email"
              render={({ field: { value, onChange } }) => (
                <View>
                  <Text style={styles.label}>Email</Text>
                  <TextInput
                    value={value}
                    onChangeText={onChange}
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
                  {errors.email ? <Text style={styles.errorText}>{errors.email.message}</Text> : null}
                </View>
              )}
            />
            <Controller
              control={control}
              name="message"
              render={({ field: { value, onChange } }) => (
                <View>
                  <Text style={styles.label}>Message</Text>
                  <TextInput
                    value={value}
                    onChangeText={onChange}
                    placeholder="Tell us about your request"
                    placeholderTextColor={colors.textDisabled}
                    autoCapitalize="sentences"
                    autoCorrect={false}
                    multiline
                    returnKeyType="done"
                    underlineColorAndroid="transparent"
                    selectionColor={colors.primary}
                    style={[styles.input, styles.textArea]}
                  />
                  {errors.message ? <Text style={styles.errorText}>{errors.message.message}</Text> : null}
                </View>
              )}
            />
            <Pressable
              onPress={handleSubmit(onSubmit)}
              android_ripple={{ color: 'rgba(0,0,0,0.12)' }}
              style={({ pressed }) => [styles.submitButton, pressed && Platform.OS === 'ios' && { opacity: 0.7 }]}
            >
              <Text style={styles.submitText}>Send message</Text>
            </Pressable>
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
  textArea: {
    minHeight: s(24),
    textAlignVertical: 'top'
  },
  submitButton: {
    paddingVertical: s(3),
    borderRadius: s(2),
    backgroundColor: colors.primary,
    alignItems: 'center'
  },
  submitText: {
    fontSize: s(3.5),
    fontWeight: '600',
    color: colors.textInverse,
    fontFamily: 'Inter-SemiBold',
    letterSpacing: 0.2,
    lineHeight: s(3.5) * 1.4
  },
  errorText: {
    marginTop: s(1),
    fontSize: s(2.5),
    fontWeight: '400',
    color: colors.error,
    fontFamily: 'Inter-Regular',
    letterSpacing: 0.2,
    lineHeight: s(2.5) * 1.4
  },
  successCard: {
    padding: s(3),
    borderRadius: s(3),
    backgroundColor: colors.primaryLight,
    gap: s(1)
  },
  successTitle: {
    fontSize: s(3.5),
    fontWeight: '600',
    color: colors.textPrimary,
    fontFamily: 'Inter-SemiBold',
    letterSpacing: -0.5,
    lineHeight: s(3.5) * 1.2
  },
  successText: {
    fontSize: s(3),
    fontWeight: '400',
    color: colors.textSecondary,
    fontFamily: 'Inter-Regular',
    letterSpacing: 0.2,
    lineHeight: s(3) * 1.4
  }
});
