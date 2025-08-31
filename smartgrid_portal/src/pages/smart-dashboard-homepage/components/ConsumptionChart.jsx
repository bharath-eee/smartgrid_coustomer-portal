import React, { useState } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import Icon from '../../../components/AppIcon';

const ConsumptionChart = () => {
  const [chartPeriod, setChartPeriod] = useState('7days');
  
  const weeklyData = [
    { name: 'Mon', usage: 18.5, cost: 37.2, hour: '00:00' },
    { name: 'Tue', usage: 22.3, cost: 44.8, hour: '00:00' },
    { name: 'Wed', usage: 19.8, cost: 39.7, hour: '00:00' },
    { name: 'Thu', usage: 25.1, cost: 50.4, hour: '00:00' },
    { name: 'Fri', usage: 21.7, cost: 43.6, hour: '00:00' },
    { name: 'Sat', usage: 28.9, cost: 58.1, hour: '00:00' },
    { name: 'Sun', usage: 24.2, cost: 48.6, hour: '00:00' }
  ];

  const monthlyData = [
    { name: 'Week 1', usage: 145.2, cost: 291.8, hour: '00:00' },
    { name: 'Week 2', usage: 158.7, cost: 318.9, hour: '00:00' },
    { name: 'Week 3', usage: 142.3, cost: 286.1, hour: '00:00' },
    { name: 'Week 4', usage: 167.8, cost: 337.2, hour: '00:00' }
  ];

  const hourlyData = [
    { name: '6AM', usage: 1.2, cost: 2.4, hour: '06:00' },
    { name: '9AM', usage: 2.8, cost: 5.6, hour: '09:00' },
    { name: '12PM', usage: 4.1, cost: 8.2, hour: '12:00' },
    { name: '3PM', usage: 3.7, cost: 7.4, hour: '15:00' },
    { name: '6PM', usage: 5.2, cost: 10.4, hour: '18:00' },
    { name: '9PM', usage: 3.9, cost: 7.8, hour: '21:00' },
    { name: '12AM', usage: 1.8, cost: 3.6, hour: '00:00' }
  ];

  const getCurrentData = () => {
    switch(chartPeriod) {
      case '24hours': return hourlyData;
      case '30days': return monthlyData;
      default: return weeklyData;
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-energy-lg">
          <p className="font-medium text-text-primary">{label}</p>
          <div className="space-y-1 mt-2">
            <div className="flex items-center justify-between space-x-4">
              <span className="text-sm text-text-secondary">Usage:</span>
              <span className="font-mono font-medium text-primary">{data?.usage} kWh</span>
            </div>
            <div className="flex items-center justify-between space-x-4">
              <span className="text-sm text-text-secondary">Cost:</span>
              <span className="font-mono font-medium text-secondary">₹{data?.cost}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const periodOptions = [
    { key: '24hours', label: '24 Hours', icon: 'Clock' },
    { key: '7days', label: '7 Days', icon: 'Calendar' },
    { key: '30days', label: '30 Days', icon: 'CalendarDays' }
  ];

  return (
    <div className="energy-card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Consumption Trends</h3>
          <p className="text-sm text-text-secondary">Track your energy usage patterns</p>
        </div>
        <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
          {periodOptions?.map((option) => (
            <button
              key={option?.key}
              onClick={() => setChartPeriod(option?.key)}
              className={`flex items-center space-x-1 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                chartPeriod === option?.key
                  ? 'bg-primary text-primary-foreground'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Icon name={option?.icon} size={14} />
              <span className="hidden sm:inline">{option?.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={getCurrentData()}>
            <defs>
              <linearGradient id="usageGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="name" 
              stroke="var(--color-text-secondary)"
              fontSize={12}
            />
            <YAxis 
              stroke="var(--color-text-secondary)"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="usage"
              stroke="var(--color-primary)"
              strokeWidth={2}
              fill="url(#usageGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span className="text-sm text-text-secondary">Energy Usage (kWh)</span>
          </div>
        </div>
        <div className="text-sm text-text-secondary">
          Hover for detailed breakdown
        </div>
      </div>
    </div>
  );
};

export default ConsumptionChart;