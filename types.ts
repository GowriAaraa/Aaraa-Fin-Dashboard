export enum ProjectId {
  WABAG = 'WABAG',
  SRM_AP = 'SRM_AP',
  PUNE = 'PUNE',
  BLUE_STAR = 'BLUE_STAR'
}

export interface Project {
  id: ProjectId;
  name: string;
  location: string;
  status: 'Active' | 'On Hold' | 'Completed';
}

export interface FinancialData {
  projectId: ProjectId;
  totalExpenses: number;
  wages: number;
  pettyCash: number;
  materialUsed: number;
  vendorPayments: number;
  budget: number;
  runningBalance: number;
  pendingApprovals: number;
  lastUpdated: string;
  currency: string;
}

export interface AnalysisResult {
  summary: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  recommendation: string;
}
