import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ContactInquiry, PricingPlan, Session, UserProfile } from '../types';
import { mockCredentials, profileService, pricingService } from '../data/mockData';

interface AppState {
  session: Session | null;
  profile: UserProfile | null;
  selectedPlan: PricingPlan | null;
  bookmarks: string[];
  notificationsEnabled: boolean;
  inquiries: ContactInquiry[];
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
  toggleNotifications: () => Promise<void>;
  toggleBookmark: (id: string) => Promise<void>;
  selectPlan: (plan: PricingPlan) => Promise<void>;
  addInquiry: (inquiry: ContactInquiry) => Promise<void>;
}

const AppContext = createContext<AppState | undefined>(undefined);

const STORAGE_KEYS = {
  session: 'saas_session',
  profile: 'saas_profile',
  bookmarks: 'saas_bookmarks',
  notifications: 'saas_notifications',
  plan: 'saas_plan',
  inquiries: 'saas_inquiries'
};

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [sessionRaw, profileRaw, bookmarksRaw, notificationsRaw, planRaw, inquiriesRaw] = await Promise.all([
          AsyncStorage.getItem(STORAGE_KEYS.session),
          AsyncStorage.getItem(STORAGE_KEYS.profile),
          AsyncStorage.getItem(STORAGE_KEYS.bookmarks),
          AsyncStorage.getItem(STORAGE_KEYS.notifications),
          AsyncStorage.getItem(STORAGE_KEYS.plan),
          AsyncStorage.getItem(STORAGE_KEYS.inquiries)
        ]);

        if (sessionRaw) setSession(JSON.parse(sessionRaw));
        if (profileRaw) setProfile(JSON.parse(profileRaw));
        if (bookmarksRaw) setBookmarks(JSON.parse(bookmarksRaw));
        if (notificationsRaw) setNotificationsEnabled(JSON.parse(notificationsRaw));
        if (planRaw) setSelectedPlan(JSON.parse(planRaw));
        if (inquiriesRaw) setInquiries(JSON.parse(inquiriesRaw));

        if (!profileRaw) {
          const initialProfile = await profileService.getProfile();
          setProfile(initialProfile);
          await AsyncStorage.setItem(STORAGE_KEYS.profile, JSON.stringify(initialProfile));
        }

        if (!planRaw) {
          const plans = await pricingService.getPlans();
          setSelectedPlan(plans[1]);
          await AsyncStorage.setItem(STORAGE_KEYS.plan, JSON.stringify(plans[1]));
        }
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    if (email !== mockCredentials.email || password !== mockCredentials.password) {
      throw new Error('Invalid credentials. Try demo@saasboard.io / Welcome123');
    }
    const newSession: Session = {
      token: `token-${Date.now()}`,
      userId: 'user-1',
      createdAt: new Date().toISOString()
    };
    setSession(newSession);
    await AsyncStorage.setItem(STORAGE_KEYS.session, JSON.stringify(newSession));
  }, []);

  const logout = useCallback(async () => {
    setSession(null);
    await AsyncStorage.removeItem(STORAGE_KEYS.session);
  }, []);

  const updateProfile = useCallback(async (updates: Partial<UserProfile>) => {
    setProfile((prev) => {
      const next = { ...(prev || { id: 'user-1', name: '', email: '', role: '' }), ...updates };
      AsyncStorage.setItem(STORAGE_KEYS.profile, JSON.stringify(next));
      return next;
    });
  }, []);

  const toggleNotifications = useCallback(async () => {
    setNotificationsEnabled((prev) => {
      const next = !prev;
      AsyncStorage.setItem(STORAGE_KEYS.notifications, JSON.stringify(next));
      return next;
    });
  }, []);

  const toggleBookmark = useCallback(async (id: string) => {
    setBookmarks((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      AsyncStorage.setItem(STORAGE_KEYS.bookmarks, JSON.stringify(next));
      return next;
    });
  }, []);

  const selectPlan = useCallback(async (plan: PricingPlan) => {
    setSelectedPlan(plan);
    await AsyncStorage.setItem(STORAGE_KEYS.plan, JSON.stringify(plan));
  }, []);

  const addInquiry = useCallback(async (inquiry: ContactInquiry) => {
    setInquiries((prev) => {
      const next = [inquiry, ...prev];
      AsyncStorage.setItem(STORAGE_KEYS.inquiries, JSON.stringify(next));
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({
      session,
      profile,
      selectedPlan,
      bookmarks,
      notificationsEnabled,
      inquiries,
      loading,
      login,
      logout,
      updateProfile,
      toggleNotifications,
      toggleBookmark,
      selectPlan,
      addInquiry
    }),
    [session, profile, selectedPlan, bookmarks, notificationsEnabled, inquiries, loading, login, logout, updateProfile, toggleNotifications, toggleBookmark, selectPlan, addInquiry]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};
