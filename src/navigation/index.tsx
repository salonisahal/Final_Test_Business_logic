import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { s } from '../theme/spacing';
import HomeScreen from '../screens/HomeScreen';
import DashboardScreen from '../screens/DashboardScreen';
import ResourcesScreen from '../screens/ResourcesScreen';
import ResourceDetailScreen from '../screens/ResourceDetailScreen';
import ContactScreen from '../screens/ContactScreen';
import LoginScreen from '../screens/LoginScreen';
import ProfileScreen from '../screens/ProfileScreen';
import PricingScreen from '../screens/PricingScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import { useAppContext } from '../components/AppProvider';
import { LoadingState } from '../components/LoadingState';

export type TabParamList = {
  Home: undefined;
  Dashboard: undefined;
  Resources: undefined;
  Pricing: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  Login: undefined;
  MainTabs: { screen?: keyof TabParamList } | undefined;
  ResourceDetail: { id: string };
  Contact: undefined;
  NotFound: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          borderTopWidth: StyleSheet.hairlineWidth,
          height: Platform.select({ ios: 83, android: 60, default: 60 }),
          paddingBottom: Platform.select({ ios: 28, android: 8, default: 8 }),
          paddingTop: s(2),
          ...Platform.select({ android: { elevation: 8 }, ios: {}, default: {} })
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarLabelStyle: {
          fontSize: s(2.75),
          fontWeight: '500',
          fontFamily: 'Inter-Medium',
          letterSpacing: 0.2
        },
        tabBarIcon: ({ color, size }) => {
          const iconMap: Record<keyof TabParamList, keyof typeof Ionicons.glyphMap> = {
            Home: 'home',
            Dashboard: 'stats-chart',
            Resources: 'book',
            Pricing: 'pricetag',
            Profile: 'person'
          };
          return <Ionicons name={iconMap[route.name]} size={size} color={color} />;
        }
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Resources" component={ResourcesScreen} />
      <Tab.Screen name="Pricing" component={PricingScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export function RootNavigator() {
  const { session, loading } = useAppContext();

  if (loading) {
    return (
      <View style={styles.loading}>
        <LoadingState label="Loading session..." />
      </View>
    );
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.surface,
          ...Platform.select({ android: { elevation: 4 }, ios: {}, default: {} })
        },
        headerTitleStyle: {
          fontFamily: 'Inter-SemiBold',
          fontWeight: '600',
          fontSize: s(4.25),
          color: colors.textPrimary,
          letterSpacing: Platform.select({ ios: -0.4, android: 0, default: 0 })
        } as any,
        headerTintColor: colors.primary,
        headerBackTitleVisible: false,
        headerShadowVisible: true
      }}
    >
      {session ? (
        <>
          <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
          <Stack.Screen name="ResourceDetail" component={ResourceDetailScreen} options={{ title: 'Resource' }} />
          <Stack.Screen name="Contact" component={ContactScreen} />
        </>
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      )}
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Not found' }} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center'
  }
});
