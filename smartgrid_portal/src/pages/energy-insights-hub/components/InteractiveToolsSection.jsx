import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const InteractiveToolsSection = () => {
  const [activeToolIndex, setActiveToolIndex] = useState(0);
  const [budgetData, setBudgetData] = useState({
    monthlyIncome: '',
    currentBill: '',
    targetPercentage: '10'
  });
  const [savingsData, setSavingsData] = useState({
    currentUsage: '',
    targetReduction: '',
    currentRate: '5.50'
  });

  const tools = [
    {
      id: 'budget',
      title: 'Energy Budget Calculator',
      description: 'Set realistic energy budgets based on your income and consumption patterns',
      icon: 'Calculator',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      id: 'savings',
      title: 'Savings Goal Tracker',
      description: 'Track your progress towards energy efficiency goals with visual indicators',
      icon: 'Target',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      id: 'comparison',
      title: 'Neighborhood Comparison',
      description: 'Compare your energy usage with similar homes in your area',
      icon: 'BarChart3',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      id: 'efficiency',
      title: 'Efficiency Score Calculator',
      description: 'Get a comprehensive efficiency score based on your consumption patterns',
      icon: 'Award',
      color: 'text-trust',
      bgColor: 'bg-trust/10'
    }
  ];

  const calculateBudget = () => {
    if (!budgetData?.monthlyIncome || !budgetData?.currentBill) return null;
    
    const income = parseFloat(budgetData?.monthlyIncome);
    const currentBill = parseFloat(budgetData?.currentBill);
    const targetPercentage = parseFloat(budgetData?.targetPercentage);
    
    const recommendedBudget = (income * targetPercentage) / 100;
    const currentPercentage = (currentBill / income) * 100;
    const potentialSavings = currentBill - recommendedBudget;
    
    return {
      recommendedBudget: recommendedBudget?.toFixed(0),
      currentPercentage: currentPercentage?.toFixed(1),
      potentialSavings: potentialSavings > 0 ? potentialSavings?.toFixed(0) : 0,
      status: currentBill <= recommendedBudget ? 'good' : 'needs_improvement'
    };
  };

  const calculateSavings = () => {
    if (!savingsData?.currentUsage || !savingsData?.targetReduction) return null;
    
    const currentUsage = parseFloat(savingsData?.currentUsage);
    const targetReduction = parseFloat(savingsData?.targetReduction);
    const currentRate = parseFloat(savingsData?.currentRate);
    
    const reducedUsage = currentUsage * (targetReduction / 100);
    const newUsage = currentUsage - reducedUsage;
    const monthlySavings = reducedUsage * currentRate;
    const yearlySavings = monthlySavings * 12;
    
    return {
      reducedUsage: reducedUsage?.toFixed(0),
      newUsage: newUsage?.toFixed(0),
      monthlySavings: monthlySavings?.toFixed(0),
      yearlySavings: yearlySavings?.toFixed(0),
      carbonReduction: (reducedUsage * 0.82)?.toFixed(1) // kg CO2 per kWh
    };
  };

  const budgetResults = calculateBudget();
  const savingsResults = calculateSavings();

  const neighborhoodData = [
    { category: 'Your Home', usage: 285, color: 'bg-primary', percentage: 100 },
    { category: 'Similar Homes', usage: 342, color: 'bg-warning', percentage: 120 },
    { category: 'Efficient Homes', usage: 198, color: 'bg-success', percentage: 69 },
    { category: 'Neighborhood Avg', usage: 376, color: 'bg-text-secondary', percentage: 132 }
  ];

  const efficiencyMetrics = [
    { label: 'Heating & Cooling', score: 78, maxScore: 100, color: 'text-success' },
    { label: 'Lighting Efficiency', score: 92, maxScore: 100, color: 'text-success' },
    { label: 'Appliance Usage', score: 65, maxScore: 100, color: 'text-warning' },
    { label: 'Peak Hour Management', score: 45, maxScore: 100, color: 'text-error' },
    { label: 'Renewable Integration', score: 30, maxScore: 100, color: 'text-error' }
  ];

  const overallScore = Math.round(efficiencyMetrics?.reduce((sum, metric) => sum + metric?.score, 0) / efficiencyMetrics?.length);

  const renderToolContent = () => {
    const currentTool = tools?.[activeToolIndex];

    switch (currentTool?.id) {
      case 'budget':
        return (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <Input
                  label="Monthly Income (₹)"
                  type="number"
                  placeholder="50000"
                  value={budgetData?.monthlyIncome}
                  onChange={(e) => setBudgetData({...budgetData, monthlyIncome: e?.target?.value})}
                />
                <Input
                  label="Current Monthly Bill (₹)"
                  type="number"
                  placeholder="3500"
                  value={budgetData?.currentBill}
                  onChange={(e) => setBudgetData({...budgetData, currentBill: e?.target?.value})}
                />
                <Input
                  label="Target Energy Budget (%)"
                  type="number"
                  placeholder="10"
                  value={budgetData?.targetPercentage}
                  onChange={(e) => setBudgetData({...budgetData, targetPercentage: e?.target?.value})}
                  description="Recommended: 8-12% of monthly income"
                />
              </div>
              
              {budgetResults && (
                <div className="space-y-4">
                  <div className={`p-4 rounded-lg border ${
                    budgetResults?.status === 'good' ?'bg-success/10 border-success/20' :'bg-warning/10 border-warning/20'
                  }`}>
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon 
                        name={budgetResults?.status === 'good' ? 'CheckCircle' : 'AlertCircle'} 
                        size={16} 
                        className={budgetResults?.status === 'good' ? 'text-success' : 'text-warning'} 
                      />
                      <span className="font-medium">Budget Analysis</span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Recommended Budget:</span>
                        <span className="font-mono">₹{budgetResults?.recommendedBudget}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Current Spending:</span>
                        <span className="font-mono">{budgetResults?.currentPercentage}% of income</span>
                      </div>
                      {budgetResults?.potentialSavings > 0 && (
                        <div className="flex justify-between">
                          <span>Potential Savings:</span>
                          <span className="font-mono text-success">₹{budgetResults?.potentialSavings}/month</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 'savings':
        return (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <Input
                  label="Current Monthly Usage (kWh)"
                  type="number"
                  placeholder="450"
                  value={savingsData?.currentUsage}
                  onChange={(e) => setSavingsData({...savingsData, currentUsage: e?.target?.value})}
                />
                <Input
                  label="Target Reduction (%)"
                  type="number"
                  placeholder="20"
                  value={savingsData?.targetReduction}
                  onChange={(e) => setSavingsData({...savingsData, targetReduction: e?.target?.value})}
                />
                <Input
                  label="Current Rate (₹/kWh)"
                  type="number"
                  step="0.10"
                  placeholder="5.50"
                  value={savingsData?.currentRate}
                  onChange={(e) => setSavingsData({...savingsData, currentRate: e?.target?.value})}
                />
              </div>
              
              {savingsResults && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <div className="text-xs text-text-secondary">Monthly Savings</div>
                      <div className="text-lg font-mono font-semibold text-primary">₹{savingsResults?.monthlySavings}</div>
                    </div>
                    <div className="p-3 bg-success/10 rounded-lg">
                      <div className="text-xs text-text-secondary">Yearly Savings</div>
                      <div className="text-lg font-mono font-semibold text-success">₹{savingsResults?.yearlySavings}</div>
                    </div>
                    <div className="p-3 bg-warning/10 rounded-lg">
                      <div className="text-xs text-text-secondary">Usage Reduction</div>
                      <div className="text-lg font-mono font-semibold text-warning">{savingsResults?.reducedUsage} kWh</div>
                    </div>
                    <div className="p-3 bg-trust/10 rounded-lg">
                      <div className="text-xs text-text-secondary">CO₂ Reduction</div>
                      <div className="text-lg font-mono font-semibold text-trust">{savingsResults?.carbonReduction} kg</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 'comparison':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              {neighborhoodData?.map((item, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 bg-surface rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-text-primary">{item?.category}</span>
                      <span className="text-sm font-mono">{item?.usage} kWh/month</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-muted rounded-full h-2">
                        <div 
                          className={`${item?.color} h-2 rounded-full transition-all duration-500`}
                          style={{ width: `${Math.min(item?.percentage, 100)}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-text-secondary w-12">{item?.percentage}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 bg-success/10 rounded-lg border border-success/20">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="TrendingDown" size={16} className="text-success" />
                <span className="font-medium text-success">Great Performance!</span>
              </div>
              <p className="text-sm text-text-primary">
                Your energy usage is 17% below the neighborhood average and 44% above the most efficient homes. 
                There's still room for improvement!
              </p>
            </div>
          </div>
        );

      case 'efficiency':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <div className="w-full h-full bg-muted rounded-full"></div>
                <div 
                  className="absolute inset-0 bg-gradient-to-r from-primary to-success rounded-full"
                  style={{
                    background: `conic-gradient(from 0deg, var(--color-primary) 0deg, var(--color-success) ${overallScore * 3.6}deg, var(--color-muted) ${overallScore * 3.6}deg)`
                  }}
                ></div>
                <div className="absolute inset-4 bg-background rounded-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-text-primary">{overallScore}</div>
                    <div className="text-xs text-text-secondary">Score</div>
                  </div>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-text-primary">Overall Efficiency Score</h3>
              <p className="text-sm text-text-secondary">Based on your consumption patterns</p>
            </div>
            <div className="space-y-3">
              {efficiencyMetrics?.map((metric, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-text-primary">{metric?.label}</span>
                    <span className={`text-sm font-mono ${metric?.color}`}>{metric?.score}/100</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-muted rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-500 ${
                          metric?.score >= 80 ? 'bg-success' :
                          metric?.score >= 60 ? 'bg-warning' : 'bg-error'
                        }`}
                        style={{ width: `${metric?.score}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 bg-trust/10 rounded-lg border border-trust/20">
              <h4 className="font-medium text-text-primary mb-2">Improvement Recommendations</h4>
              <ul className="text-sm text-text-secondary space-y-1">
                <li>• Focus on peak hour management to improve your score by 15-20 points</li>
                <li>• Consider upgrading older appliances for better efficiency ratings</li>
                <li>• Explore renewable energy options like solar panels</li>
              </ul>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="energy-card">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
          <Icon name="Wrench" size={24} className="text-accent" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-text-primary">Interactive Tools</h2>
          <p className="text-sm text-text-secondary">Calculate, compare, and optimize your energy usage</p>
        </div>
      </div>
      {/* Tool Navigation */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {tools?.map((tool, index) => (
          <button
            key={tool?.id}
            onClick={() => setActiveToolIndex(index)}
            className={`p-4 rounded-lg border transition-all hover-lift ${
              activeToolIndex === index
                ? 'border-primary bg-primary/5' :'border-border bg-surface hover:border-primary/50'
            }`}
          >
            <div className={`w-10 h-10 ${tool?.bgColor} rounded-lg flex items-center justify-center mb-3 mx-auto`}>
              <Icon name={tool?.icon} size={20} className={tool?.color} />
            </div>
            <h3 className="font-medium text-text-primary text-sm mb-1">{tool?.title}</h3>
            <p className="text-xs text-text-secondary line-clamp-2">{tool?.description}</p>
          </button>
        ))}
      </div>
      {/* Active Tool Content */}
      <div className="bg-surface rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className={`w-10 h-10 ${tools?.[activeToolIndex]?.bgColor} rounded-lg flex items-center justify-center`}>
            <Icon name={tools?.[activeToolIndex]?.icon} size={20} className={tools?.[activeToolIndex]?.color} />
          </div>
          <div>
            <h3 className="font-semibold text-text-primary">{tools?.[activeToolIndex]?.title}</h3>
            <p className="text-sm text-text-secondary">{tools?.[activeToolIndex]?.description}</p>
          </div>
        </div>

        {renderToolContent()}

        <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-border">
          <Button variant="outline" iconName="Download">
            Export Results
          </Button>
          <Button variant="default" iconName="Save">
            Save Configuration
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InteractiveToolsSection;