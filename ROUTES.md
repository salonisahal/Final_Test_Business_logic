# Final_test_Business_Logic — Screens & Navigation

## How to run
cd /home/hewlett/projects/frontendX_backend_merged/frontend_runs/run_213bb798_20260626_055632/project
npm install && npx expo start
# Press 'a' for Android, 'i' for iOS simulator, 'w' for web,
# or scan the QR code with the Expo Go app on a physical iOS/Android device.

## Screens
| Screen | File | Description |
|--------|------|-------------|
| Login | src/screens/LoginScreen.tsx | Demo sign-in with mock credentials and session persistence. |
| Home | src/screens/HomeScreen.tsx | Welcome, KPI cards, quick actions, and recent activity feed. |
| Dashboard | src/screens/DashboardScreen.tsx | Daily/Monthly KPI dashboard with progress cards and refresh. |
| Resources | src/screens/ResourcesScreen.tsx | Searchable knowledge center with filters and bookmarks. |
| ResourceDetail | src/screens/ResourceDetailScreen.tsx | Resource content view with bookmark toggle. |
| Pricing | src/screens/PricingScreen.tsx | Monthly/Yearly plan selection synced to profile. |
| Profile | src/screens/ProfileScreen.tsx | Profile editing, notification toggle, plan summary, logout. |
| Contact | src/screens/ContactScreen.tsx | Contact form with validation and submission states. |
| NotFound | src/screens/NotFoundScreen.tsx | Fallback screen for unknown routes. |

## Navigation map
- Login -> MainTabs (successful sign-in).
- Home -> Dashboard (tap Quick Action: Dashboard).
- Home -> Resources (tap Quick Action: Resources).
- Home -> Profile (tap Quick Action: Profile).
- Home -> Contact (tap Quick Action: Contact).
- Resources -> ResourceDetail (tap a resource card).
- Pricing -> Profile (select a plan updates profile summary).
- Profile -> Login (tap Log out).

## Shared components
- src/components/ActionButton.tsx: Quick action tile button with icon.
- src/components/AppProvider.tsx: Context provider for session, bookmarks, plan, settings.
- src/components/EmptyState.tsx: Empty state card with icon and messaging.
- src/components/ErrorState.tsx: Error card with retry action.
- src/components/HeaderBar.tsx: Screen section header with title/subtitle.
- src/components/KpiCard.tsx: Gradient KPI card for Home metrics.
- src/components/LoadingState.tsx: Loading placeholder with icon.
- src/components/PlanCard.tsx: Pricing plan selector card.
- src/components/ProgressBar.tsx: Animated progress bar track.
- src/components/ResourceCard.tsx: Resource list card with bookmark action.
- src/components/StatCard.tsx: Dashboard metric card with progress.

## Design tokens
primary, primaryDark, primaryLight, accent, background, surface, card, border, textPrimary, textSecondary, textDisabled, textInverse, success, warning, error, info, shadowColor.
