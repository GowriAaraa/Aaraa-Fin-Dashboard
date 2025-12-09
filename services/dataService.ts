import { supabase } from './supabase';
import { FinancialData, ProjectId } from '../types';
import { MOCK_FINANCIALS } from '../constants';

export const checkSupabaseConnection = async (): Promise<boolean> => {
  try {
    // Perform a lightweight check (head request) to see if we can reach the table
    const { error } = await supabase
      .from('financial_data')
      .select('count', { count: 'exact', head: true });
    
    // If there's no error, we are connected
    return !error;
  } catch (err) {
    return false;
  }
};

export const fetchProjectFinancials = async (projectId: ProjectId): Promise<FinancialData> => {
  try {
    // Attempt to fetch from Supabase
    // Assuming a table 'financial_data' exists with snake_case columns
    const { data, error } = await supabase
      .from('financial_data')
      .select('*')
      .eq('project_id', projectId)
      .single();

    if (error) {
      console.warn('Supabase fetch error (using fallback data):', error.message);
      // Fallback to mock data if table doesn't exist or query fails
      return MOCK_FINANCIALS[projectId];
    }

    if (data) {
      // Map DB response to application Type
      return {
        projectId: projectId,
        totalExpenses: Number(data.total_expenses) || 0,
        wages: Number(data.wages) || 0,
        pettyCash: Number(data.petty_cash) || 0,
        materialUsed: Number(data.material_used) || 0,
        vendorPayments: Number(data.vendor_payments) || 0,
        budget: Number(data.budget) || 0,
        runningBalance: Number(data.running_balance) || 0,
        pendingApprovals: Number(data.pending_approvals) || 0,
        lastUpdated: data.updated_at || new Date().toISOString(),
        currency: data.currency || 'INR'
      };
    }
  } catch (err) {
    console.error('Unexpected error fetching from Supabase:', err);
  }

  // Final fallback
  return MOCK_FINANCIALS[projectId];
};