import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';

const NeighborhoodComparison = () => {
  const [comparisonPeriod, setComparisonPeriod] = useState('month');

  const comparisonData = [
    { name: 'You', usage: 186, efficiency: 87, cost: 1247, rank: 1 },
    { name: 'Avg Neighbor', usage: 215, efficiency: 72, cost: 1435, rank: 2 },
    { name: 'Best in Area', usage: 165, efficiency: 94, cost: 1105, rank: 0 },
    { name: 'Area Average', usage: 238, efficiency: 68, cost: 1590, rank: 3 }
  ];

  const achievements = [
    {
      icon: 'Trophy',
      title: 'Top 15% Efficiency',
      description: 'You rank in top 15% of your neighborhood',
      color: 'success'
    },
    {
      icon: 'TrendingDown',
      title: '18% Below Average',
      description: 'Your consumption is 18% below area average',
      color: 'primary'
    },
    {
      icon: 'Target',
      title: 'Monthly Goal Met',
      description: 'Achieved 87% efficiency target this month',
      color: 'trust'
    }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-energy-lg">
          <p className="font-medium text-text-primary mb-2">{label}</p>
          <div className="space-y-1">
            <div className="flex justify-between space-x-4">
              <span className="text-sm text-text-secondary">Usage:</span>
              <span className="font-mono text-sm font-medium">{data?.usage} kWh</span>
            </div>
            <div className="flex justify-between space-x-4">
              <span className="text-sm text-text-secondary">Efficiency:</span>
              <span className="font-mono text-sm font-medium text-primary">{data?.efficiency}%</span>
            </div>
            <div className="flex justify-between space-x-4">
              <span className="text-sm text-text-secondary">Cost:</span>
              <span className="font-mono text-sm font-medium">₹{data?.cost}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const getBarColor = (name) => {
    if (name === 'You') return 'var(--color-primary)';
    if (name === 'Best in Area') return 'var(--color-success)';
    return 'var(--color-muted)';
  };

  const getColorClass = (color) => {
    const colorMap = {
      success: 'text-success',
      primary: 'text-primary',
      trust: 'text-trust'
    };
    return colorMap?.[color] || 'text-primary';
  };

  const getBgClass = (color) => {
    const colorMap = {
      success: 'bg-success/10',
      primary: 'bg-primary/10',
      trust: 'bg-trust/10'
    };
    return colorMap?.[color] || 'bg-primary/10';
  };

  return (
    <div className="energy-card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Neighborhood Comparison</h3>
          <p className="text-sm text-text-secondary">See how you stack up against your neighbors</p>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Users" size={20} color="var(--color-trust)" />
          <span className="text-sm font-medium text-trust">Community</span>
        </div>
      </div>
      {/* Achievements */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {achievements?.map((achievement, index) => (
          <div key={index} className={`p-3 rounded-lg border ${getBgClass(achievement?.color)} border-${achievement?.color}/20`}>
            <div className="flex items-center space-x-3">
              <div className={`flex items-center justify-center w-8 h-8 rounded-lg bg-white/50`}>
                <Icon name={achievement?.icon} size={16} className={getColorClass(achievement?.color)} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-text-primary">{achievement?.title}</div>
                <div className="text-xs text-text-secondary">{achievement?.description}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Comparison Chart */}
      <div className="h-64 w-full mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={comparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
            <Bar 
              dataKey="usage" 
              fill="var(--color-primary)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      {/* Ranking Summary */}
      <div className="bg-gradient-to-r from-success/5 to-primary/5 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-success/20 rounded-full">
              <Icon name="Award" size={20} color="var(--color-success)" />
            </div>
            <div>
              <div className="text-sm font-medium text-text-primary">Your Neighborhood Rank</div>
              <div className="text-xs text-text-secondary">Based on efficiency score</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-success">#3</div>
            <div className="text-xs text-text-secondary">out of 47 homes</div>
          </div>
        </div>
        
        <div className="mt-4 pt-3 border-t border-border/50">
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">Monthly savings vs average:</span>
            <span className="font-mono font-semibold text-success">₹343</span>
          </div>
        </div>
      </div>
      {/* Challenge CTA */}
      <div className="mt-4 p-3 bg-muted rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon name="Target" size={18} color="var(--color-primary)" />
            <div>
              <div className="text-sm font-medium text-text-primary">Join Efficiency Challenge</div>
              <div className="text-xs text-text-secondary">Compete with neighbors to save more energy</div>
            </div>
          </div>
          <button className="px-3 py-1.5 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-hover transition-colors">
            Join Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default NeighborhoodComparison;