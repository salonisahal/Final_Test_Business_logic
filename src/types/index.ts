export type BillingCycle = 'Monthly' | 'Yearly';
export type DashboardFilter = 'Daily' | 'Monthly';

export interface KPI {
  id: string;
  title: string;
  value: string;
  trend: string;
}

export interface ActivityItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
}

export interface DashboardMetric {
  id: string;
  title: string;
  value: string;
  progress: number;
  delta: string;
}

export type ResourceCategory = 'Articles' | 'Tutorials' | 'FAQs';

export interface ResourceItem {
  id: string;
  title: string;
  category: ResourceCategory;
  summary: string;
  content: string;
  duration: string;
}

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface Session {
  token: string;
  userId: string;
  createdAt: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: string;
  yearlyPrice: string;
  features: string[];
}
