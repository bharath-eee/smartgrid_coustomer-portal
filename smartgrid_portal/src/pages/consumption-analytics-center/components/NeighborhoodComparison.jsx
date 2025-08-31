import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NeighborhoodComparison = ({ comparisonData, rankings, insights }) => {
  const [viewType, setViewType] = useState('consumption');
  const [timeframe, setTimeframe] = useState('monthly');

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
                {entry?.value} {viewType === 'consumption' ? 'kWh' : '₹'}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const getRankingColor = (rank) => {
    if (rank <= 3) return 'text-success';
    if (rank <= 7) return 'text-warning';
    return 'text-error';
  };

  const getRankingBadge = (rank) => {
    if (rank === 1) return { icon: 'Trophy', color: 'var(--color-warning)', bg: 'bg-warning/10' };
    if (rank <= 3) return { icon: 'Medal', color: 'var(--color-success)', bg: 'bg-success/10' };
    if (rank <= 7) return { icon: 'Award', color: 'var(--color-primary)', bg: 'bg-primary/10' };
    return { icon: 'Target', color: 'var(--color-text-secondary)', bg: 'bg-muted' };
  };

  const userRanking = rankings?.find(r => r?.isUser) || rankings?.[0];

  return (
    <div className="bg-card rounded-lg border p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Neighborhood Comparison</h3>
          <p className="text-sm text-text-secondary">See how your energy usage compares with similar households</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex bg-muted rounded-lg p-1">
            <Button
              variant={viewType === 'consumption' ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewType('consumption')}
              iconName="Zap"
              iconSize={16}
            >
              Usage
            </Button>
            <Button
              variant={viewType === 'cost' ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewType('cost')}
              iconName="DollarSign"
              iconSize={16}
            >
              Cost
            </Button>
          </div>
          <Button variant="ghost" size="icon">
            <Icon name="Shield" size={16} />
          </Button>
        </div>
      </div>
      {/* User Ranking Highlight */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getRankingBadge(userRanking?.rank)?.bg}`}>
              <Icon 
                name={getRankingBadge(userRanking?.rank)?.icon} 
                size={24} 
                color={getRankingBadge(userRanking?.rank)?.color}
              />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-text-primary">Your Ranking</h4>
              <p className="text-sm text-text-secondary">Among similar households in your area</p>
            </div>
          </div>
          <div className="text-right">
            <div className={`text-3xl font-bold ${getRankingColor(userRanking?.rank)}`}>
              #{userRanking?.rank}
            </div>
            <div className="text-sm text-text-secondary">out of {rankings?.length}</div>
          </div>
        </div>
      </div>
      {/* Comparison Chart */}
      <div className="h-80 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={comparisonData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="category" 
              stroke="var(--color-text-secondary)"
              fontSize={12}
            />
            <YAxis 
              stroke="var(--color-text-secondary)"
              fontSize={12}
              label={{ 
                value: viewType === 'consumption' ? 'kWh' : '₹', 
                angle: -90, 
                position: 'insideLeft' 
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="neighborhood" 
              fill="var(--color-text-secondary)" 
              radius={[4, 4, 0, 0]}
              name="Neighborhood Avg"
              opacity={0.7}
            />
            <Bar 
              dataKey="you" 
              fill="var(--color-primary)" 
              radius={[4, 4, 0, 0]}
              name="Your Usage"
            />
            <Bar 
              dataKey="efficient" 
              fill="var(--color-success)" 
              radius={[4, 4, 0, 0]}
              name="Top 10%"
              opacity={0.8}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      {/* Detailed Rankings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performers */}
        <div>
          <h4 className="text-sm font-medium text-text-primary mb-4">Top Performers</h4>
          <div className="space-y-3">
            {rankings?.slice(0, 5)?.map((household, index) => (
              <div 
                key={household?.id}
                className={`flex items-center space-x-4 p-3 rounded-lg transition-all ${
                  household?.isUser ? 'bg-primary/10 border border-primary/20' : 'bg-muted'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    index === 0 ? 'bg-warning text-white' :
                    index === 1 ? 'bg-text-secondary text-white' :
                    index === 2 ? 'bg-warning/70 text-white': 'bg-muted text-text-primary'
                  }`}>
                    {household?.rank}
                  </div>
                  <div className="w-8 h-8 bg-gradient-to-br from-trust to-primary rounded-full flex items-center justify-center">
                    <Icon name={household?.isUser ? "User" : "Home"} size={14} color="white" />
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-text-primary">
                      {household?.isUser ? 'You' : `Household ${household?.id}`}
                    </span>
                    <span className="text-sm font-mono font-semibold text-primary">
                      {household?.consumption} kWh
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-text-secondary">
                      {household?.householdSize} members • {household?.homeType}
                    </div>
                    <div className="text-xs text-success font-medium">
                      ₹{household?.monthlyCost}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Insights & Tips */}
        <div>
          <h4 className="text-sm font-medium text-text-primary mb-4">Neighborhood Insights</h4>
          <div className="space-y-4">
            {insights?.map((insight, index) => (
              <div key={index} className={`rounded-lg p-4 ${
                insight?.type === 'positive' ? 'bg-success/10' :
                insight?.type === 'warning'? 'bg-warning/10' : 'bg-primary/10'
              }`}>
                <div className="flex items-start space-x-3">
                  <Icon 
                    name={insight?.icon} 
                    size={20} 
                    color={
                      insight?.type === 'positive' ? 'var(--color-success)' :
                      insight?.type === 'warning' ? 'var(--color-warning)' :
                      'var(--color-primary)'
                    }
                  />
                  <div className="flex-1">
                    <h5 className="text-sm font-medium text-text-primary mb-1">{insight?.title}</h5>
                    <p className="text-xs text-text-secondary mb-2">{insight?.description}</p>
                    {insight?.action && (
                      <div className={`text-xs font-medium ${
                        insight?.type === 'positive' ? 'text-success' :
                        insight?.type === 'warning'? 'text-warning' : 'text-primary'
                      }`}>
                        {insight?.action}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Privacy Notice */}
          <div className="mt-6 p-3 bg-muted rounded-lg">
            <div className="flex items-start space-x-2">
              <Icon name="Shield" size={16} color="var(--color-trust)" />
              <div>
                <h5 className="text-xs font-medium text-text-primary mb-1">Privacy Protected</h5>
                <p className="text-xs text-text-secondary">
                  All data is anonymized and aggregated. Individual household information is never shared.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-4 border-t border-border">
        <Button variant="default" iconName="Target" iconPosition="left">
          Set Efficiency Goal
        </Button>
        <Button variant="outline" iconName="Users" iconPosition="left">
          Join Community Challenge
        </Button>
        <Button variant="ghost" iconName="Share" iconPosition="left">
          Share Achievement
        </Button>
      </div>
    </div>
  );
};

export default NeighborhoodComparison;