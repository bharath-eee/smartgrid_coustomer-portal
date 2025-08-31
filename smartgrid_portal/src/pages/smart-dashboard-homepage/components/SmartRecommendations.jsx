import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SmartRecommendations = () => {
  const [dismissedTips, setDismissedTips] = useState([]);

  const recommendations = [
    {
      id: 1,
      type: 'efficiency',
      icon: 'Lightbulb',
      title: 'Peak Hour Optimization',
      message: `Your AC usage during 2-6 PM costs 40% more. Consider pre-cooling your home at 1 PM to save ₹15-20 daily.`,
      priority: 'high',
      savings: '₹450/month',
      action: 'Set Reminder',
      color: 'warning'
    },
    {
      id: 2,
      type: 'congratulation',
      icon: 'Trophy',
      title: 'Efficiency Achievement!',
      message: `Excellent! You've reduced consumption by 18% this week compared to last week. Keep it up!`,priority: 'medium',savings: '₹85 saved',action: 'View Details',color: 'success'
    },
    {
      id: 3,
      type: 'alert',icon: 'AlertTriangle',title: 'Unusual Consumption Detected',
      message: `Your usage spiked 35% yesterday evening. Check if any appliances were left running.`,
      priority: 'high',savings: 'Potential issue',action: 'Investigate',color: 'error'
    },
    {
      id: 4,
      type: 'tip',icon: 'Target',title: 'Monthly Goal Progress',message: `You're 78% towards your monthly efficiency goal. Maintain current usage to achieve ₹200 savings.`,
      priority: 'medium',
      savings: '₹156 progress',
      action: 'Track Goal',
      color: 'primary'
    }
  ];

  const visibleRecommendations = recommendations?.filter(rec => !dismissedTips?.includes(rec?.id));

  const handleDismiss = (id) => {
    setDismissedTips(prev => [...prev, id]);
  };

  const getColorClasses = (color) => {
    const colorMap = {
      success: 'border-success/20 bg-success/5',
      warning: 'border-warning/20 bg-warning/5',
      error: 'border-error/20 bg-error/5',
      primary: 'border-primary/20 bg-primary/5'
    };
    return colorMap?.[color] || colorMap?.primary;
  };

  const getIconColor = (color) => {
    const colorMap = {
      success: 'var(--color-success)',
      warning: 'var(--color-warning)',
      error: 'var(--color-error)',
      primary: 'var(--color-primary)'
    };
    return colorMap?.[color] || colorMap?.primary;
  };

  if (visibleRecommendations?.length === 0) {
    return (
      <div className="energy-card text-center py-8">
        <Icon name="CheckCircle" size={48} color="var(--color-success)" className="mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-text-primary mb-2">All Caught Up!</h3>
        <p className="text-text-secondary">No new recommendations at the moment. Great job managing your energy efficiently!</p>
      </div>
    );
  }

  return (
    <div className="energy-card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Smart Recommendations</h3>
          <p className="text-sm text-text-secondary">AI-powered insights to optimize your energy usage</p>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Brain" size={20} color="var(--color-trust)" />
          <span className="text-sm font-medium text-trust">AI Insights</span>
        </div>
      </div>
      <div className="space-y-4">
        {visibleRecommendations?.slice(0, 3)?.map((rec) => (
          <div
            key={rec?.id}
            className={`border rounded-lg p-4 ${getColorClasses(rec?.color)} hover-lift transition-all duration-200`}
          >
            <div className="flex items-start space-x-4">
              <div className={`flex items-center justify-center w-10 h-10 rounded-lg bg-white/50`}>
                <Icon name={rec?.icon} size={20} color={getIconColor(rec?.color)} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-text-primary">{rec?.title}</h4>
                  <button
                    onClick={() => handleDismiss(rec?.id)}
                    className="text-text-secondary hover:text-text-primary transition-colors"
                  >
                    <Icon name="X" size={16} />
                  </button>
                </div>
                
                <p className="text-sm text-text-secondary mb-3 leading-relaxed">
                  {rec?.message}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`consumption-indicator ${rec?.color === 'success' ? 'low' : rec?.color === 'warning' ? 'medium' : 'high'}`}>
                      {rec?.savings}
                    </div>
                    {rec?.priority === 'high' && (
                      <div className="flex items-center space-x-1 text-xs text-error">
                        <Icon name="AlertCircle" size={12} />
                        <span>High Priority</span>
                      </div>
                    )}
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="ArrowRight"
                    iconPosition="right"
                  >
                    {rec?.action}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {visibleRecommendations?.length > 3 && (
        <div className="mt-4 pt-4 border-t border-border text-center">
          <Button variant="ghost" iconName="Plus" iconPosition="left">
            View {visibleRecommendations?.length - 3} More Recommendations
          </Button>
        </div>
      )}
    </div>
  );
};

export default SmartRecommendations;