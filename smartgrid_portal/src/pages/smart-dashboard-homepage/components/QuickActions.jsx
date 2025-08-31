import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const QuickActions = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      id: 'pay-bill',
      title: 'Pay Bill',
      description: 'Quick payment options',
      icon: 'CreditCard',
      color: 'success',
      bgColor: 'bg-success/10',
      route: '/payment-gateway',
      badge: '₹1,247 due'
    },
    {
      id: 'view-usage',
      title: 'Usage Analytics',
      description: 'Detailed consumption data',
      icon: 'BarChart3',
      color: 'primary',
      bgColor: 'bg-primary/10',
      route: '/consumption-analytics-center',
      badge: 'Live data'
    },
    {
      id: 'bill-history',
      title: 'Bill History',
      description: 'Past bills & statements',
      icon: 'FileText',
      color: 'trust',
      bgColor: 'bg-trust/10',
      route: '/bill-management-suite',
      badge: '12 months'
    },
    {
      id: 'energy-tips',
      title: 'Energy Insights',
      description: 'Efficiency recommendations',
      icon: 'Lightbulb',
      color: 'warning',
      bgColor: 'bg-warning/10',
      route: '/energy-insights-hub',
      badge: '5 new tips'
    },
    {
      id: 'support',
      title: 'Get Support',
      description: '24/7 customer assistance',
      icon: 'HelpCircle',
      color: 'secondary',
      bgColor: 'bg-secondary/10',
      route: '/account-settings-hub',
      badge: 'Live chat'
    },
    {
      id: 'settings',
      title: 'Account Settings',
      description: 'Manage preferences',
      icon: 'Settings',
      color: 'text-secondary',
      bgColor: 'bg-muted',
      route: '/account-settings-hub',
      badge: null
    }
  ];

  const handleActionClick = (route) => {
    navigate(route);
  };

  const getColorClass = (color) => {
    const colorMap = {
      success: 'text-success',
      primary: 'text-primary',
      trust: 'text-trust',
      warning: 'text-warning',
      secondary: 'text-secondary',
      'text-secondary': 'text-text-secondary'
    };
    return colorMap?.[color] || 'text-primary';
  };

  return (
    <div className="energy-card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Quick Actions</h3>
          <p className="text-sm text-text-secondary">One-tap access to essential features</p>
        </div>
        <Icon name="Zap" size={20} color="var(--color-primary)" />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {quickActions?.map((action) => (
          <button
            key={action?.id}
            onClick={() => handleActionClick(action?.route)}
            className="group relative p-4 rounded-lg border border-border hover:border-primary/30 bg-background hover:bg-primary/5 transition-all duration-200 hover-lift text-left"
          >
            {/* Badge */}
            {action?.badge && (
              <div className="absolute -top-2 -right-2 px-2 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                {action?.badge}
              </div>
            )}

            {/* Icon */}
            <div className={`flex items-center justify-center w-12 h-12 rounded-lg mb-3 ${action?.bgColor} group-hover:scale-105 transition-transform`}>
              <Icon name={action?.icon} size={20} className={getColorClass(action?.color)} />
            </div>

            {/* Content */}
            <div>
              <h4 className="font-medium text-text-primary mb-1 group-hover:text-primary transition-colors">
                {action?.title}
              </h4>
              <p className="text-xs text-text-secondary leading-relaxed">
                {action?.description}
              </p>
            </div>

            {/* Arrow indicator */}
            <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <Icon name="ArrowRight" size={14} color="var(--color-primary)" />
            </div>
          </button>
        ))}
      </div>
      {/* Bottom CTA */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between p-3 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg">
          <div className="flex items-center space-x-3">
            <Icon name="Smartphone" size={20} color="var(--color-primary)" />
            <div>
              <div className="text-sm font-medium text-text-primary">Download Mobile App</div>
              <div className="text-xs text-text-secondary">Get instant notifications & offline access</div>
            </div>
          </div>
          <button className="flex items-center space-x-1 px-3 py-1.5 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-hover transition-colors">
            <Icon name="Download" size={14} />
            <span>Get App</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;