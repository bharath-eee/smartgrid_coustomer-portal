import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import Icon from '../../../components/AppIcon';


const UsageComparisonChart = ({ data }) => {
  const [chartType, setChartType] = useState('bar');
  const [timeRange, setTimeRange] = useState('6months');

  const getFilteredData = () => {
    const months = timeRange === '6months' ? 6 : 12;
    return data?.slice(-months);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-energy-lg">
          <p className="font-medium text-text-primary">{label}</p>
          <div className="space-y-1 mt-2">
            <p className="text-sm text-primary">
              <span className="font-medium">Usage:</span> {data?.usage} kWh
            </p>
            <p className="text-sm text-secondary">
              <span className="font-medium">Cost:</span> ₹{data?.cost?.toLocaleString('en-IN')}
            </p>
            {data?.comparison && (
              <p className={`text-sm ${data?.comparison > 0 ? 'text-error' : 'text-success'}`}>
                {data?.comparison > 0 ? '+' : ''}{data?.comparison}% vs last year
              </p>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  const filteredData = getFilteredData();

  return (
    <div className="energy-card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="TrendingUp" size={20} color="var(--color-primary)" />
          <h3 className="text-lg font-semibold text-text-primary">Usage Comparison</h3>
        </div>
        <div className="flex items-center space-x-3">
          <select 
            value={timeRange}
            onChange={(e) => setTimeRange(e?.target?.value)}
            className="px-3 py-1.5 border border-border rounded-md bg-input text-sm text-text-primary"
          >
            <option value="6months">Last 6 Months</option>
            <option value="12months">Last 12 Months</option>
          </select>
          <div className="flex border border-border rounded-md overflow-hidden">
            <button
              onClick={() => setChartType('bar')}
              className={`px-3 py-1.5 text-sm ${
                chartType === 'bar' ?'bg-primary text-primary-foreground' :'bg-background text-text-secondary hover:text-text-primary'
              }`}
            >
              <Icon name="BarChart3" size={16} />
            </button>
            <button
              onClick={() => setChartType('line')}
              className={`px-3 py-1.5 text-sm ${
                chartType === 'line' ?'bg-primary text-primary-foreground' :'bg-background text-text-secondary hover:text-text-primary'
              }`}
            >
              <Icon name="TrendingUp" size={16} />
            </button>
          </div>
        </div>
      </div>
      <div className="h-80 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'bar' ? (
            <BarChart data={filteredData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="month" 
                stroke="var(--color-text-secondary)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-text-secondary)"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="usage" 
                fill="var(--color-primary)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          ) : (
            <LineChart data={filteredData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="month" 
                stroke="var(--color-text-secondary)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-text-secondary)"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="usage" 
                stroke="var(--color-primary)"
                strokeWidth={3}
                dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: 'var(--color-primary)', strokeWidth: 2 }}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-success/10 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="TrendingDown" size={16} color="var(--color-success)" />
            <span className="text-sm font-medium text-success">Lowest Usage</span>
          </div>
          <div className="text-lg font-mono font-semibold text-text-primary">
            {Math.min(...filteredData?.map(d => d?.usage))} kWh
          </div>
          <div className="text-xs text-text-secondary">
            {filteredData?.find(d => d?.usage === Math.min(...filteredData?.map(d => d?.usage)))?.month}
          </div>
        </div>

        <div className="bg-warning/10 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="TrendingUp" size={16} color="var(--color-warning)" />
            <span className="text-sm font-medium text-warning">Highest Usage</span>
          </div>
          <div className="text-lg font-mono font-semibold text-text-primary">
            {Math.max(...filteredData?.map(d => d?.usage))} kWh
          </div>
          <div className="text-xs text-text-secondary">
            {filteredData?.find(d => d?.usage === Math.max(...filteredData?.map(d => d?.usage)))?.month}
          </div>
        </div>

        <div className="bg-primary/10 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="BarChart3" size={16} color="var(--color-primary)" />
            <span className="text-sm font-medium text-primary">Average Usage</span>
          </div>
          <div className="text-lg font-mono font-semibold text-text-primary">
            {Math.round(filteredData?.reduce((sum, d) => sum + d?.usage, 0) / filteredData?.length)} kWh
          </div>
          <div className="text-xs text-text-secondary">
            Per month average
          </div>
        </div>
      </div>
      <div className="mt-6 p-4 bg-muted/30 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Lightbulb" size={16} color="var(--color-warning)" className="mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-text-primary mb-1">Usage Insights</h4>
            <p className="text-xs text-text-secondary">
              Your energy consumption has been {filteredData?.[filteredData?.length - 1]?.comparison > 0 ? 'higher' : 'lower'} than last year. 
              Consider implementing energy-saving measures during peak usage months.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsageComparisonChart;