import { supabase } from './supabase';
import { FinancialData, ProjectId } from '../types';
import { MOCK_FINANCIALS } from '../constants';

export const checkSupabaseConnection = async (): Promise<boolean> => {
  try {
    // Perform a simple select to check if we can reach the Postgres database
    // We limit to 1 row to be efficient. 
    // If the table 'financial_data' doesn't exist, this will throw an error.
    const { data, error } = await supabase
      .from('financial_data')
      .select('project_id')
      .limit(1);
    
    if (error) {
      console.warn("Supabase connection check failed:", error.message);
      return false;
    }
    
    return true;
  } catch (err) {
    console.error("Supabase connection error:", err);
    return false;
  }
};

export const fetchProjectFinancials = async (projectId: ProjectId): Promise<FinancialData> => {
  try {
    // Attempt to fetch from Supabase
    const { data, error } = await supabase
      .from('financial_data')
      .select('*')
      .eq('project_id', projectId)
      .single();

    if (error) {
      console.warn(`Supabase fetch error for ${projectId} (using fallback data):`, error.message);
      return MOCK_FINANCIALS[projectId];
    }

    if (data) {
      // Map DB response (snake_case) to application Type (camelCase)
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

  // Final fallback to mock data
  return MOCK_FINANCIALS[projectId];
};