import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EfficiencyScoring = ({ userScore, neighborhoodAverage, achievements }) => {
  const getScoreColor = (score) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-error';
  };

  const getScoreBgColor = (score) => {
    if (score >= 80) return 'bg-success';
    if (score >= 60) return 'bg-warning';
    return 'bg-error';
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    return 'Needs Improvement';
  };

  return (
    <div className="bg-card rounded-lg border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Efficiency Score</h3>
          <p className="text-sm text-text-secondary">Your energy efficiency compared to similar households</p>
        </div>
        <Button variant="ghost" size="icon">
          <Icon name="Info" size={16} />
        </Button>
      </div>
      {/* Main Score Display */}
      <div className="text-center mb-8">
        <div className="relative inline-flex items-center justify-center w-32 h-32 mb-4">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r="50"
              stroke="var(--color-muted)"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="60"
              cy="60"
              r="50"
              stroke={userScore >= 80 ? 'var(--color-success)' : userScore >= 60 ? 'var(--color-warning)' : 'var(--color-error)'}
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${(userScore / 100) * 314} 314`}
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className={`text-3xl font-bold ${getScoreColor(userScore)}`}>{userScore}</div>
            <div className="text-xs text-text-secondary">out of 100</div>
          </div>
        </div>
        
        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(userScore)} bg-opacity-10`}>
          <Icon name="Award" size={16} className="mr-2" />
          {getScoreLabel(userScore)}
        </div>
      </div>
      {/* Comparison Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-secondary">Your Score</span>
            <Icon name="User" size={16} color="var(--color-primary)" />
          </div>
          <div className="text-2xl font-bold text-primary">{userScore}</div>
          <div className="text-xs text-text-secondary">+5 from last month</div>
        </div>
        
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-secondary">Neighborhood Avg</span>
            <Icon name="Users" size={16} color="var(--color-secondary)" />
          </div>
          <div className="text-2xl font-bold text-secondary">{neighborhoodAverage}</div>
          <div className={`text-xs ${userScore > neighborhoodAverage ? 'text-success' : 'text-error'}`}>
            {userScore > neighborhoodAverage ? '+' : ''}{userScore - neighborhoodAverage} vs avg
          </div>
        </div>
      </div>
      {/* Achievement Badges */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-text-primary mb-3">Recent Achievements</h4>
        <div className="flex flex-wrap gap-2">
          {achievements?.map((achievement, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 px-3 py-2 bg-success/10 rounded-full"
            >
              <Icon name={achievement?.icon} size={14} color="var(--color-success)" />
              <span className="text-xs font-medium text-success">{achievement?.name}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Improvement Suggestions */}
      <div className="border-t border-border pt-4">
        <h4 className="text-sm font-medium text-text-primary mb-3">Quick Improvements</h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-3 p-2 hover:bg-muted rounded-lg transition-colors">
            <div className="w-8 h-8 bg-warning/10 rounded-full flex items-center justify-center">
              <Icon name="Lightbulb" size={14} color="var(--color-warning)" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-text-primary">Switch to LED bulbs</div>
              <div className="text-xs text-text-secondary">Potential savings: ₹200/month</div>
            </div>
            <div className="text-xs text-success font-medium">+8 points</div>
          </div>
          
          <div className="flex items-center space-x-3 p-2 hover:bg-muted rounded-lg transition-colors">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name="Thermometer" size={14} color="var(--color-primary)" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-text-primary">Optimize AC temperature</div>
              <div className="text-xs text-text-secondary">Set to 24°C for efficiency</div>
            </div>
            <div className="text-xs text-success font-medium">+12 points</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EfficiencyScoring;