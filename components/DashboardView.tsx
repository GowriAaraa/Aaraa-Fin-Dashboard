import React, { useEffect, useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend 
} from 'recharts';
import { 
  ArrowLeft, Download, TrendingUp, TrendingDown, AlertCircle, 
  CheckCircle2, DollarSign, Wallet, Hammer, UserCheck, Sparkles 
} from 'lucide-react';
import { Project, FinancialData, AnalysisResult } from '../types';
import { GlassCard } from './ui/GlassCard';
import { analyzeProjectFinances } from '../services/geminiService';
import { fetchProjectFinancials } from '../services/dataService';

interface DashboardViewProps {
  project: Project;
  onBack: () => void;
}

const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(val);
};

export const DashboardView: React.FC<DashboardViewProps> = ({ project, onBack }) => {
  const [data, setData] = useState<FinancialData | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      // Fetch financial data from Supabase (or fallback)
      const financialData = await fetchProjectFinancials(project.id);
      
      if (isMounted) {
        setData(financialData);

        // Call Gemini for analysis once data is loaded
        if (financialData) {
          setLoadingAnalysis(true);
          analyzeProjectFinances(financialData, project.name)
            .then(res => {
              if (isMounted) setAnalysis(res);
            })
            .finally(() => {
              if (isMounted) setLoadingAnalysis(false);
            });
        }
      }
    };

    loadData();

    return () => { isMounted = false; };
  }, [project]);

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-32 bg-gray-200 dark:bg-gray-800 rounded mb-4"></div>
          <div className="h-4 w-48 bg-gray-200 dark:bg-gray-800 rounded"></div>
        </div>
      </div>
    );
  }

  const budgetUsage = (data.totalExpenses / data.budget) * 100;
  const isOverBudget = data.totalExpenses > data.budget;

  const chartData = [
    { name: 'Budget', value: data.budget },
    { name: 'Actual', value: data.totalExpenses },
  ];

  const expenseDistribution = [
    { name: 'Wages', value: data.wages, color: '#007AFF' },
    { name: 'Materials', value: data.materialUsed, color: '#34C759' },
    { name: 'Vendors', value: data.vendorPayments, color: '#FF9500' },
    { name: 'Petty Cash', value: data.pettyCash, color: '#AF52DE' },
  ];

  return (
    <div className="animate-fade-in pb-12">
      {/* Top Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <button 
            onClick={onBack}
            className="flex items-center text-sm text-gray-500 hover:text-apple-dark dark:text-gray-400 dark:hover:text-gray-200 mb-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Projects
          </button>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{project.name}</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            Last updated: {new Date(data.lastUpdated).toLocaleDateString()}
          </p>
        </div>
        
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm">
            <Download className="w-4 h-4" />
            Export PDF
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-apple-dark dark:bg-white text-white dark:text-black rounded-lg text-sm font-medium hover:bg-black dark:hover:bg-gray-200 transition-colors shadow-lg shadow-gray-400/20 dark:shadow-none">
            <Download className="w-4 h-4" />
            Export Excel
          </button>
        </div>
      </div>

      {/* AI Insight Card */}
      <GlassCard className="mb-8 p-6 bg-gradient-to-br from-white/80 to-blue-50/50 dark:from-gray-900 dark:to-blue-900/20 border-blue-100 dark:border-blue-900/50">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/40 rounded-full">
            <Sparkles className="w-6 h-6 text-apple-blue dark:text-blue-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">AI Financial Analysis</h3>
            {loadingAnalysis ? (
              <div className="animate-pulse flex flex-col gap-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              </div>
            ) : analysis ? (
              <div className="space-y-3">
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{analysis.summary}</p>
                <div className="flex flex-wrap items-center gap-4 mt-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    analysis.riskLevel === 'High' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                    analysis.riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                    'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                  }`}>
                    Risk: {analysis.riskLevel}
                  </span>
                  <span className="text-sm font-medium text-apple-dark dark:text-white flex items-center gap-2">
                    Recommendation: {analysis.recommendation}
                  </span>
                </div>
              </div>
            ) : (
               <p className="text-gray-500 dark:text-gray-400">Analysis unavailable.</p>
            )}
          </div>
        </div>
      </GlassCard>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard 
          title="Total Expenses" 
          value={formatCurrency(data.totalExpenses)} 
          subValue={`${budgetUsage.toFixed(1)}% of Budget`}
          icon={<DollarSign className="w-5 h-5 text-white" />}
          color="bg-blue-500"
          trend={isOverBudget ? 'down' : 'up'}
        />
        <MetricCard 
          title="Running Balance" 
          value={formatCurrency(data.runningBalance)}
          subValue={data.runningBalance < 0 ? "Overdraft" : "Available"}
          icon={<Wallet className="w-5 h-5 text-white" />}
          color={data.runningBalance < 0 ? "bg-red-500" : "bg-green-500"}
        />
        <MetricCard 
          title="Approvals Pending" 
          value={data.pendingApprovals.toString()}
          subValue="Invoices awaiting action"
          icon={<CheckCircle2 className="w-5 h-5 text-white" />}
          color="bg-orange-500"
        />
        <MetricCard 
          title="Material Costs" 
          value={formatCurrency(data.materialUsed)}
          subValue="Consumables & Assets"
          icon={<Hammer className="w-5 h-5 text-white" />}
          color="bg-purple-500"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Budget vs Actual */}
        <GlassCard className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-gray-900 dark:text-white">Budget vs Actual</h3>
            <span className={`text-sm px-2 py-1 rounded ${isOverBudget ? 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400' : 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400'}`}>
              {isOverBudget ? 'Over Budget' : 'On Track'}
            </span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} layout="vertical" barSize={32}>
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF'}} />
                <Tooltip 
                  cursor={{fill: 'transparent'}}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
                  itemStyle={{ color: '#000' }}
                />
                <Bar dataKey="value" radius={[0, 10, 10, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#E5E7EB' : (isOverBudget ? '#EF4444' : '#3B82F6')} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Expense Distribution */}
        <GlassCard className="p-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-6">Expense Breakdown</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expenseDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {expenseDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => formatCurrency(value)}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
                  itemStyle={{ color: '#000' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '10px', color: '#9CA3AF' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>

      {/* Detailed Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DetailList 
          title="Recent Vendor Payments" 
          items={[
            { label: 'Ultratech Cement', value: '₹ 450,000', date: 'Today' },
            { label: 'JCB Rentals Inc', value: '₹ 85,000', date: 'Yesterday' },
            { label: 'Asian Paints', value: '₹ 120,000', date: 'May 18' },
          ]} 
        />
         <DetailList 
          title="Staff Wages (Current Cycle)" 
          items={[
            { label: 'Site Engineers (4)', value: '₹ 180,000', date: 'Pending' },
            { label: 'Labor Force A', value: '₹ 450,000', date: 'Processed' },
            { label: 'Security', value: '₹ 25,000', date: 'Processed' },
          ]} 
        />
      </div>
    </div>
  );
};

const MetricCard: React.FC<{title: string, value: string, subValue: string, icon: React.ReactNode, color: string, trend?: 'up' | 'down'}> = ({
  title, value, subValue, icon, color, trend
}) => (
  <GlassCard className="p-5 flex flex-col justify-between h-full">
    <div className="flex items-start justify-between mb-4">
      <div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{value}</h3>
      </div>
      <div className={`p-2.5 rounded-xl ${color} shadow-lg shadow-opacity-20`}>
        {icon}
      </div>
    </div>
    <div className="flex items-center gap-2 mt-auto">
      {trend && (
        trend === 'up' ? <TrendingUp className="w-4 h-4 text-green-500" /> : <TrendingDown className="w-4 h-4 text-red-500" />
      )}
      <span className="text-xs font-medium text-gray-400 dark:text-gray-500">{subValue}</span>
    </div>
  </GlassCard>
);

const DetailList: React.FC<{title: string, items: {label: string, value: string, date: string}[]}> = ({title, items}) => (
  <GlassCard className="p-6">
    <h3 className="font-semibold text-gray-900 dark:text-white mb-4">{title}</h3>
    <div className="space-y-4">
      {items.map((item, i) => (
        <div key={i} className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors border border-transparent hover:border-gray-100 dark:hover:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400 text-xs font-bold">
              {item.label.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">{item.label}</p>
              <p className="text-xs text-gray-400 dark:text-gray-500">{item.date}</p>
            </div>
          </div>
          <span className="font-semibold text-sm text-gray-700 dark:text-gray-300">{item.value}</span>
        </div>
      ))}
    </div>
    <button className="w-full mt-4 py-2 text-sm text-apple-blue font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
      View All Transactions
    </button>
  </GlassCard>
);