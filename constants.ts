import { Project, ProjectId, FinancialData } from './types';

export const PROJECTS: Project[] = [
  { id: ProjectId.WABAG, name: 'WABAG Water Treatment', location: 'Chennai', status: 'Active' },
  { id: ProjectId.SRM_AP, name: 'SRM University AP', location: 'Amaravati', status: 'Active' },
  { id: ProjectId.PUNE, name: 'Pune Metro Depot', location: 'Pune', status: 'Active' },
  { id: ProjectId.BLUE_STAR, name: 'Blue Star Facility', location: 'Sri City', status: 'Active' },
];

export const MOCK_FINANCIALS: Record<ProjectId, FinancialData> = {
  [ProjectId.WABAG]: {
    projectId: ProjectId.WABAG,
    totalExpenses: 4500000,
    wages: 1200000,
    pettyCash: 50000,
    materialUsed: 2100000,
    vendorPayments: 1150000,
    budget: 6000000,
    runningBalance: 1500000,
    pendingApprovals: 3,
    lastUpdated: '2024-05-20T10:00:00Z',
    currency: 'INR'
  },
  [ProjectId.SRM_AP]: {
    projectId: ProjectId.SRM_AP,
    totalExpenses: 8200000,
    wages: 2400000,
    pettyCash: 120000,
    materialUsed: 3500000,
    vendorPayments: 2180000,
    budget: 12000000,
    runningBalance: 3800000,
    pendingApprovals: 8,
    lastUpdated: '2024-05-19T14:30:00Z',
    currency: 'INR'
  },
  [ProjectId.PUNE]: {
    projectId: ProjectId.PUNE,
    totalExpenses: 3100000,
    wages: 900000,
    pettyCash: 25000,
    materialUsed: 1500000,
    vendorPayments: 675000,
    budget: 3000000,
    runningBalance: -100000,
    pendingApprovals: 12,
    lastUpdated: '2024-05-20T09:15:00Z',
    currency: 'INR'
  },
  [ProjectId.BLUE_STAR]: {
    projectId: ProjectId.BLUE_STAR,
    totalExpenses: 1500000,
    wages: 400000,
    pettyCash: 15000,
    materialUsed: 800000,
    vendorPayments: 285000,
    budget: 5000000,
    runningBalance: 3500000,
    pendingApprovals: 1,
    lastUpdated: '2024-05-18T16:45:00Z',
    currency: 'INR'
  },
};