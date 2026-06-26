import { ActivityItem, DashboardFilter, DashboardMetric, KPI, PricingPlan, ResourceItem, ResourceCategory, UserProfile } from '../types';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const randomFail = () => Math.random() < 0.15;

export const mockCredentials = {
  email: 'demo@saasboard.io',
  password: 'Welcome123'
};

const kpis: KPI[] = [
  { id: 'kpi-1', title: 'Active Customers', value: '1,248', trend: '+6.4%' },
  { id: 'kpi-2', title: 'Revenue', value: '$84.2k', trend: '+12.1%' },
  { id: 'kpi-3', title: 'Projects', value: '68', trend: '+3.1%' }
];

const activities: ActivityItem[] = [
  { id: 'act-1', title: 'New enterprise lead', description: 'Orion Labs upgraded to Professional plan.', timestamp: 'Today • 10:32 AM' },
  { id: 'act-2', title: 'Project milestone', description: 'Q3 roadmap reached 72% completion.', timestamp: 'Yesterday • 4:15 PM' },
  { id: 'act-3', title: 'Invoice processed', description: 'Subscription renewal for BluePeak.', timestamp: 'Yesterday • 11:05 AM' },
  { id: 'act-4', title: 'Support resolved', description: 'Ticket #8821 closed successfully.', timestamp: 'Mon • 2:40 PM' }
];

const resources: ResourceItem[] = [
  {
    id: 'res-1',
    title: 'Getting started with Teamspaces',
    category: 'Articles',
    summary: 'Learn how to structure teams, roles, and permissions quickly.',
    content: 'Teamspaces help you organize your workspace by department or project. Start by creating a space, inviting members, and assigning roles. Use shared dashboards to keep everyone aligned on metrics and workflows.',
    duration: '5 min read'
  },
  {
    id: 'res-2',
    title: 'Automating customer onboarding',
    category: 'Tutorials',
    summary: 'Build automated onboarding with checklists and milestones.',
    content: 'Automations let you send onboarding tasks, schedule follow-ups, and track progress. Create a template, assign it to new customers, and monitor completion rates.',
    duration: '10 min watch'
  },
  {
    id: 'res-3',
    title: 'Billing & invoices FAQ',
    category: 'FAQs',
    summary: 'Common questions about billing cycles and invoices.',
    content: 'Invoices are issued on the first of each billing cycle. You can switch between monthly and yearly plans at any time. Pro-rated adjustments apply to upgrades.',
    duration: '3 min read'
  },
  {
    id: 'res-4',
    title: 'Workflow templates',
    category: 'Articles',
    summary: 'Use templates to jumpstart recurring workflows.',
    content: 'Templates streamline repeated tasks. Choose a template, customize fields, and assign owners. Save time by duplicating proven workflows.',
    duration: '6 min read'
  },
  {
    id: 'res-5',
    title: 'Analytics dashboard tutorial',
    category: 'Tutorials',
    summary: 'Create KPI dashboards for every team.',
    content: 'Pick the right metrics, choose a layout, and build filters for teams. Share dashboards with stakeholders and iterate using feedback.',
    duration: '12 min watch'
  },
  {
    id: 'res-6',
    title: 'Security FAQ',
    category: 'FAQs',
    summary: 'Security, privacy, and compliance answers.',
    content: 'We follow industry standard encryption and SSO integrations. Compliance reports are available for Professional and Enterprise tiers.',
    duration: '4 min read'
  }
];

const pricingPlans: PricingPlan[] = [
  {
    id: 'plan-starter',
    name: 'Starter',
    description: 'For lean teams launching fast.',
    monthlyPrice: '$24',
    yearlyPrice: '$240',
    features: ['Up to 5 projects', 'Email support', 'Basic analytics']
  },
  {
    id: 'plan-pro',
    name: 'Professional',
    description: 'For growing SaaS teams.',
    monthlyPrice: '$79',
    yearlyPrice: '$790',
    features: ['Unlimited projects', 'Automation builder', 'Team dashboards']
  },
  {
    id: 'plan-enterprise',
    name: 'Enterprise',
    description: 'For complex organizations.',
    monthlyPrice: '$199',
    yearlyPrice: '$1990',
    features: ['Custom SLAs', 'Dedicated success', 'Advanced security']
  }
];

const baseDailyMetrics: DashboardMetric[] = [
  { id: 'met-1', title: 'Revenue', value: '$4.8k', progress: 0.68, delta: '+4.2%' },
  { id: 'met-2', title: 'Active Users', value: '1,024', progress: 0.74, delta: '+2.3%' },
  { id: 'met-3', title: 'Project Progress', value: '72%', progress: 0.72, delta: '+1.9%' },
  { id: 'met-4', title: 'Completed Tasks', value: '184', progress: 0.58, delta: '+6.8%' }
];

const baseMonthlyMetrics: DashboardMetric[] = [
  { id: 'met-1', title: 'Revenue', value: '$68.4k', progress: 0.82, delta: '+11.4%' },
  { id: 'met-2', title: 'Active Users', value: '18,420', progress: 0.76, delta: '+7.9%' },
  { id: 'met-3', title: 'Project Progress', value: '88%', progress: 0.88, delta: '+5.2%' },
  { id: 'met-4', title: 'Completed Tasks', value: '2,480', progress: 0.69, delta: '+9.1%' }
];

const profile: UserProfile = {
  id: 'user-1',
  name: 'Avery Morgan',
  email: 'demo@saasboard.io',
  role: 'Product Operations'
};

export const metricsRepository = {
  list: () => kpis
};

export const activityRepository = {
  list: () => activities
};

export const dashboardRepository = {
  list: (filter: DashboardFilter) => (filter === 'Daily' ? baseDailyMetrics : baseMonthlyMetrics)
};

export const resourceRepository = {
  list: () => resources,
  findById: (id: string) => resources.find((item) => item.id === id) || null,
  categories: (): ResourceCategory[] => ['Articles', 'Tutorials', 'FAQs']
};

export const pricingRepository = {
  list: () => pricingPlans
};

export const profileRepository = {
  get: () => profile
};

export const metricsService = {
  async getHomeMetrics() {
    await delay(500);
    if (randomFail()) {
      throw new Error('Failed to load KPI metrics.');
    }
    return metricsRepository.list();
  }
};

export const activityService = {
  async getRecentActivities() {
    await delay(500);
    return activityRepository.list();
  }
};

export const dashboardService = {
  async getDashboardMetrics(filter: DashboardFilter) {
    await delay(700);
    if (randomFail()) {
      throw new Error('Dashboard refresh failed.');
    }
    return dashboardRepository.list(filter);
  }
};

export const resourceService = {
  async getResources() {
    await delay(600);
    return resourceRepository.list();
  },
  async getResourceById(id: string) {
    await delay(300);
    return resourceRepository.findById(id);
  },
  async getCategories(): Promise<ResourceCategory[]> {
    await delay(200);
    return resourceRepository.categories();
  }
};

export const pricingService = {
  async getPlans() {
    await delay(400);
    return pricingRepository.list();
  }
};

export const profileService = {
  async getProfile() {
    await delay(400);
    return profileRepository.get();
  }
};
