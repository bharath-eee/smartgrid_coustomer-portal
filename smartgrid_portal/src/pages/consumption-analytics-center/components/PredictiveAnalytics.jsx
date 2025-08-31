import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const PredictiveAnalytics = ({ projectionData, scenarios }) => {
  const [selectedScenario, setSelectedScenario] = useState('current');
  const [projectionPeriod, setProjectionPeriod] = useState('3months');

  const scenarioOptions = [
    { value: 'current', label: 'Current Usage Pattern' },
    { value: 'optimized', label: 'With Optimizations' },
    { value: 'increased', label: 'Increased Usage' },
    { value: 'seasonal', label: 'Seasonal Adjustment' }
  ];

  const periodOptions = [
    { value: '1month', label: 'Next Month' },
    { value: '3months', label: 'Next 3 Months' },
    { value: '6months', label: 'Next 6 Months' },
    { value: '1year', label: 'Next Year' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg shadow-energy-lg p-3">
          <p className="text-sm font-medium text-text-primary mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: entry?.color }}
                ></div>
                <span className="text-sm text-text-secondary">{entry?.name}:</span>
              </div>
              <span className="text-sm font-medium text-text-primary">
                ₹{entry?.value}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const currentScenario = scenarios?.find(s => s?.id === selectedScenario) || scenarios?.[0];

  return (
    <div className="bg-card rounded-lg border p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Predictive Analytics</h3>
          <p className="text-sm text-text-secondary">Projected costs based on usage patterns and scenarios</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Select
            options={scenarioOptions}
            value={selectedScenario}
            onChange={setSelectedScenario}
            placeholder="Select scenario"
            className="min-w-[180px]"
          />
          <Select
            options={periodOptions}
            value={projectionPeriod}
            onChange={setProjectionPeriod}
            placeholder="Select period"
            className="min-w-[150px]"
          />
        </div>
      </div>
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <Icon name="TrendingUp" size={20} color="var(--color-primary)" />
            <span className="text-xs text-primary font-medium">PROJECTED</span>
          </div>
          <div className="text-2xl font-bold text-primary">₹{currentScenario?.projectedCost}</div>
          <div className="text-sm text-text-secondary">Next month estimate</div>
        </div>
        
        <div className="bg-gradient-to-r from-secondary/10 to-secondary/5 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <Icon name="Zap" size={20} color="var(--color-secondary)" />
            <span className="text-xs text-secondary font-medium">CONSUMPTION</span>
          </div>
          <div className="text-2xl font-bold text-secondary">{currentScenario?.projectedUsage} kWh</div>
          <div className="text-sm text-text-secondary">Expected usage</div>
        </div>
        
        <div className="bg-gradient-to-r from-success/10 to-success/5 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <Icon name="PiggyBank" size={20} color="var(--color-success)" />
            <span className="text-xs text-success font-medium">SAVINGS</span>
          </div>
          <div className="text-2xl font-bold text-success">₹{currentScenario?.potentialSavings}</div>
          <div className="text-sm text-text-secondary">Possible savings</div>
        </div>
      </div>
      {/* Projection Chart */}
      <div className="h-80 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={projectionData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="month" 
              stroke="var(--color-text-secondary)"
              fontSize={12}
            />
            <YAxis 
              stroke="var(--color-text-secondary)"
              fontSize={12}
              label={{ value: 'Cost (₹)', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine 
              x="Current" 
              stroke="var(--color-warning)" 
              strokeDasharray="2 2"
              label={{ value: "Current Month", position: "top" }}
            />
            <Line
              type="monotone"
              dataKey="historical"
              stroke="var(--color-text-secondary)"
              strokeWidth={2}
              dot={{ fill: 'var(--color-text-secondary)', strokeWidth: 2, r: 3 }}
              name="Historical"
            />
            <Line
              type="monotone"
              dataKey="projected"
              stroke="var(--color-primary)"
              strokeWidth={3}
              strokeDasharray="5 5"
              dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
              name="Projected"
            />
            <Line
              type="monotone"
              dataKey="optimized"
              stroke="var(--color-success)"
              strokeWidth={2}
              strokeDasharray="3 3"
              dot={{ fill: 'var(--color-success)', strokeWidth: 2, r: 3 }}
              name="Optimized"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      {/* Scenario Details */}
      <div className="bg-muted rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium text-text-primary">Scenario Details: {currentScenario?.name}</h4>
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${
            currentScenario?.impact === 'positive' ? 'bg-success/10 text-success' :
            currentScenario?.impact === 'negative'? 'bg-error/10 text-error' : 'bg-warning/10 text-warning'
          }`}>
            {currentScenario?.impact === 'positive' ? 'Cost Reduction' : 
             currentScenario?.impact === 'negative' ? 'Cost Increase' : 'Neutral'}
          </div>
        </div>
        
        <p className="text-sm text-text-secondary mb-4">{currentScenario?.description}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h5 className="text-xs font-medium text-text-primary mb-2">Key Assumptions</h5>
            <ul className="space-y-1">
              {currentScenario?.assumptions?.map((assumption, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <Icon name="ChevronRight" size={12} className="mt-0.5 text-text-secondary" />
                  <span className="text-xs text-text-secondary">{assumption}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h5 className="text-xs font-medium text-text-primary mb-2">Expected Changes</h5>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-text-secondary">Monthly Cost:</span>
                <span className={`text-xs font-medium ${
                  currentScenario?.costChange > 0 ? 'text-error' : 'text-success'
                }`}>
                  {currentScenario?.costChange > 0 ? '+' : ''}₹{currentScenario?.costChange}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-text-secondary">Usage Change:</span>
                <span className={`text-xs font-medium ${
                  currentScenario?.usageChange > 0 ? 'text-error' : 'text-success'
                }`}>
                  {currentScenario?.usageChange > 0 ? '+' : ''}{currentScenario?.usageChange} kWh
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-text-secondary">Confidence:</span>
                <span className="text-xs font-medium text-primary">{currentScenario?.confidence}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-4 border-t border-border">
        <Button variant="default" iconName="Download" iconPosition="left">
          Download Report
        </Button>
        <Button variant="outline" iconName="Bell" iconPosition="left">
          Set Budget Alert
        </Button>
        <Button variant="ghost" iconName="Share" iconPosition="left">
          Share Insights
        </Button>
      </div>
    </div>
  );
};

export default PredictiveAnalytics;