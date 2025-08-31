import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const ConsumptionChart = ({ data, selectedPeriod, chartType = 'line' }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg shadow-energy-lg p-3">
          <p className="text-sm font-medium text-text-primary mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry?.color }}
              ></div>
              <span className="text-sm text-text-secondary">{entry?.name}:</span>
              <span className="text-sm font-medium text-text-primary">
                {entry?.value} kWh
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const formatXAxisLabel = (value) => {
    if (selectedPeriod === 'daily') return value;
    if (selectedPeriod === 'weekly') return `Week ${value}`;
    return value;
  };

  return (
    <div className="bg-card rounded-lg border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Energy Consumption Trend</h3>
          <p className="text-sm text-text-secondary">
            {selectedPeriod === 'daily' && 'Hourly consumption for the selected day'}
            {selectedPeriod === 'weekly' && 'Daily consumption for the selected week'}
            {selectedPeriod === 'monthly' && 'Daily consumption for the selected month'}
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2 px-3 py-1.5 bg-success/10 rounded-full">
            <div className="status-dot online"></div>
            <span className="text-xs font-medium text-success">Live Data</span>
          </div>
          <Button variant="ghost" size="icon">
            <Icon name="Download" size={16} />
          </Button>
        </div>
      </div>

      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'area' ? (
            <AreaChart data={data}>
              <defs>
                <linearGradient id="consumptionGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="time" 
                stroke="var(--color-text-secondary)"
                fontSize={12}
                tickFormatter={formatXAxisLabel}
              />
              <YAxis 
                stroke="var(--color-text-secondary)"
                fontSize={12}
                label={{ value: 'kWh', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="consumption"
                stroke="var(--color-primary)"
                strokeWidth={2}
                fill="url(#consumptionGradient)"
                name="Consumption"
              />
            </AreaChart>
          ) : (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="time" 
                stroke="var(--color-text-secondary)"
                fontSize={12}
                tickFormatter={formatXAxisLabel}
              />
              <YAxis 
                stroke="var(--color-text-secondary)"
                fontSize={12}
                label={{ value: 'kWh', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="consumption"
                stroke="var(--color-primary)"
                strokeWidth={3}
                dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: 'var(--color-primary)', strokeWidth: 2 }}
                name="Consumption"
              />
              <Line
                type="monotone"
                dataKey="predicted"
                stroke="var(--color-warning)"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
                name="Predicted"
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span className="text-sm text-text-secondary">Actual Consumption</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-warning rounded-full"></div>
            <span className="text-sm text-text-secondary">Predicted Usage</span>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-sm text-text-secondary">Average Daily</div>
          <div className="text-lg font-mono font-semibold text-primary">24.8 kWh</div>
        </div>
      </div>
    </div>
  );
};

export default ConsumptionChart;