import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ExpenseTracker = ({ monthlyData, budgetData, onSetBudget }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('current');
  const [showBudgetModal, setShowBudgetModal] = useState(false);

  const expenseCategories = [
    { name: 'Energy Charges', value: monthlyData?.energyCharges, color: 'var(--color-primary)' },
    { name: 'Fixed Charges', value: monthlyData?.fixedCharges, color: 'var(--color-secondary)' },
    { name: 'Taxes & Duties', value: monthlyData?.taxes, color: 'var(--color-warning)' },
    { name: 'Other Charges', value: monthlyData?.otherCharges, color: 'var(--color-trust)' }
  ];

  const totalExpense = expenseCategories?.reduce((sum, cat) => sum + cat?.value, 0);
  const budgetUtilization = (totalExpense / budgetData?.monthlyBudget) * 100;

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0];
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-energy-lg">
          <p className="font-medium text-text-primary">{data?.name}</p>
          <p className="text-sm text-primary">
            ₹{data?.value?.toLocaleString('en-IN')} ({((data?.value / totalExpense) * 100)?.toFixed(1)}%)
          </p>
        </div>
      );
    }
    return null;
  };

  const getBudgetStatus = () => {
    if (budgetUtilization <= 70) return { status: 'good', color: 'text-success', bg: 'bg-success/10' };
    if (budgetUtilization <= 90) return { status: 'warning', color: 'text-warning', bg: 'bg-warning/10' };
    return { status: 'over', color: 'text-error', bg: 'bg-error/10' };
  };

  const budgetStatus = getBudgetStatus();

  return (
    <div className="energy-card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="PieChart" size={20} color="var(--color-primary)" />
          <h3 className="text-lg font-semibold text-text-primary">Expense Tracker</h3>
        </div>
        <div className="flex items-center space-x-3">
          <select 
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e?.target?.value)}
            className="px-3 py-1.5 border border-border rounded-md bg-input text-sm text-text-primary"
          >
            <option value="current">Current Month</option>
            <option value="last">Last Month</option>
            <option value="average">3-Month Average</option>
          </select>
          <Button 
            variant="outline" 
            size="sm"
            iconName="Target"
            iconPosition="left"
            onClick={() => setShowBudgetModal(true)}
          >
            Set Budget
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Pie Chart */}
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={expenseCategories}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {expenseCategories?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry?.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Expense Breakdown */}
        <div className="space-y-3">
          {expenseCategories?.map((category, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: category?.color }}
                ></div>
                <span className="text-sm font-medium text-text-primary">{category?.name}</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-mono font-semibold text-text-primary">
                  ₹{category?.value?.toLocaleString('en-IN')}
                </div>
                <div className="text-xs text-text-secondary">
                  {((category?.value / totalExpense) * 100)?.toFixed(1)}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Budget Status */}
      <div className={`p-4 rounded-lg ${budgetStatus?.bg} mb-6`}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Icon name="Target" size={16} className={budgetStatus?.color} />
            <span className={`text-sm font-medium ${budgetStatus?.color}`}>Monthly Budget</span>
          </div>
          <span className="text-sm font-mono font-semibold text-text-primary">
            ₹{totalExpense?.toLocaleString('en-IN')} / ₹{budgetData?.monthlyBudget?.toLocaleString('en-IN')}
          </span>
        </div>
        
        <div className="w-full bg-background/50 rounded-full h-2 mb-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${
              budgetStatus?.status === 'good' ? 'bg-success' :
              budgetStatus?.status === 'warning' ? 'bg-warning' : 'bg-error'
            }`}
            style={{ width: `${Math.min(budgetUtilization, 100)}%` }}
          ></div>
        </div>
        
        <div className="flex justify-between text-xs">
          <span className={budgetStatus?.color}>
            {budgetUtilization?.toFixed(1)}% utilized
          </span>
          <span className="text-text-secondary">
            ₹{(budgetData?.monthlyBudget - totalExpense)?.toLocaleString('en-IN')} remaining
          </span>
        </div>
      </div>
      {/* Spending Insights */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-text-primary">Spending Insights</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3 bg-primary/10 rounded-lg">
            <div className="flex items-center space-x-2 mb-1">
              <Icon name="TrendingUp" size={14} color="var(--color-primary)" />
              <span className="text-xs font-medium text-primary">Highest Category</span>
            </div>
            <div className="text-sm font-semibold text-text-primary">
              {expenseCategories?.reduce((max, cat) => cat?.value > max?.value ? cat : max)?.name}
            </div>
            <div className="text-xs text-text-secondary">
              {((expenseCategories?.reduce((max, cat) => cat?.value > max?.value ? cat : max)?.value / totalExpense) * 100)?.toFixed(1)}% of total
            </div>
          </div>
          
          <div className="p-3 bg-secondary/10 rounded-lg">
            <div className="flex items-center space-x-2 mb-1">
              <Icon name="Calendar" size={14} color="var(--color-secondary)" />
              <span className="text-xs font-medium text-secondary">vs Last Month</span>
            </div>
            <div className="text-sm font-semibold text-text-primary">
              {monthlyData?.comparison > 0 ? '+' : ''}{monthlyData?.comparison}%
            </div>
            <div className="text-xs text-text-secondary">
              {monthlyData?.comparison > 0 ? 'Increase' : 'Decrease'} in spending
            </div>
          </div>
        </div>
      </div>
      {/* Budget Modal */}
      {showBudgetModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text-primary">Set Monthly Budget</h3>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setShowBudgetModal(false)}
              >
                <Icon name="X" size={20} />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Monthly Budget (₹)
                </label>
                <input 
                  type="number"
                  defaultValue={budgetData?.monthlyBudget}
                  className="w-full p-3 border border-border rounded-md bg-input text-text-primary"
                  placeholder="Enter budget amount"
                />
              </div>
              
              <div className="p-3 bg-muted/30 rounded-lg">
                <div className="text-sm text-text-secondary">
                  <p>Current month average: ₹{totalExpense?.toLocaleString('en-IN')}</p>
                  <p>Last 3 months average: ₹{monthlyData?.threeMonthAverage?.toLocaleString('en-IN')}</p>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <Button variant="default" className="flex-1">
                  Save Budget
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowBudgetModal(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseTracker;