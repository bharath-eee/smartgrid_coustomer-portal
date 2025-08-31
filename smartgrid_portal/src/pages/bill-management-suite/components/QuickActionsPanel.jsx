import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionsPanel = ({ onPayBill, onDownloadBill, onSetupAutoPay, onViewAnalytics }) => {
  const quickActions = [
    {
      id: 'pay-bill',
      title: 'Pay Current Bill',
      description: 'Quick payment for outstanding amount',
      icon: 'CreditCard',
      color: 'text-success',
      bgColor: 'bg-success/10',
      borderColor: 'border-success/20',
      action: onPayBill
    },
    {
      id: 'download-bill',
      title: 'Download Bill',
      description: 'Get PDF copy of latest bill',
      icon: 'Download',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      borderColor: 'border-primary/20',
      action: onDownloadBill
    },
    {
      id: 'setup-autopay',
      title: 'Setup AutoPay',
      description: 'Never miss a payment again',
      icon: 'Repeat',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      borderColor: 'border-secondary/20',
      action: onSetupAutoPay
    },
    {
      id: 'view-analytics',
      title: 'Usage Analytics',
      description: 'Detailed consumption insights',
      icon: 'BarChart3',
      color: 'text-trust',
      bgColor: 'bg-trust/10',
      borderColor: 'border-trust/20',
      action: onViewAnalytics
    }
  ];

  const supportActions = [
    {
      id: 'customer-support',
      title: 'Customer Support',
      description: 'Get help with billing issues',
      icon: 'HelpCircle',
      action: () => console.log('Opening customer support')
    },
    {
      id: 'dispute-bill',
      title: 'Dispute Bill',
      description: 'Report billing discrepancies',
      icon: 'AlertTriangle',
      action: () => console.log('Opening dispute form')
    },
    {
      id: 'payment-history',
      title: 'Payment History',
      description: 'View all past transactions',
      icon: 'History',
      action: () => console.log('Opening payment history')
    }
  ];

  return (
    <div className="space-y-6">
      {/* Primary Quick Actions */}
      <div className="energy-card">
        <div className="flex items-center space-x-2 mb-6">
          <Icon name="Zap" size={20} color="var(--color-primary)" />
          <h3 className="text-lg font-semibold text-text-primary">Quick Actions</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quickActions?.map((action) => (
            <button
              key={action?.id}
              onClick={action?.action}
              className={`
                p-4 rounded-lg border transition-all duration-200 hover-lift
                ${action?.bgColor} ${action?.borderColor} hover:shadow-energy-md
                text-left group
              `}
            >
              <div className="flex items-start space-x-3">
                <div className={`
                  w-10 h-10 rounded-lg flex items-center justify-center
                  bg-background/50 group-hover:bg-background/80 transition-colors
                `}>
                  <Icon name={action?.icon} size={18} className={action?.color} />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-text-primary group-hover:text-text-primary">
                    {action?.title}
                  </h4>
                  <p className="text-sm text-text-secondary mt-1">
                    {action?.description}
                  </p>
                </div>
                <Icon name="ChevronRight" size={16} className="text-text-secondary group-hover:text-text-primary transition-colors" />
              </div>
            </button>
          ))}
        </div>
      </div>
      {/* Support & Help */}
      <div className="energy-card">
        <div className="flex items-center space-x-2 mb-6">
          <Icon name="LifeBuoy" size={20} color="var(--color-secondary)" />
          <h3 className="text-lg font-semibold text-text-primary">Support & Help</h3>
        </div>
        
        <div className="space-y-3">
          {supportActions?.map((action) => (
            <button
              key={action?.id}
              onClick={action?.action}
              className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <Icon name={action?.icon} size={16} className="text-text-secondary group-hover:text-primary transition-colors" />
                </div>
                <div className="text-left">
                  <div className="font-medium text-text-primary">{action?.title}</div>
                  <div className="text-sm text-text-secondary">{action?.description}</div>
                </div>
              </div>
              <Icon name="ExternalLink" size={16} className="text-text-secondary group-hover:text-primary transition-colors" />
            </button>
          ))}
        </div>
      </div>
      {/* Emergency Contact */}
      <div className="energy-card bg-gradient-to-r from-error/5 to-warning/5 border-l-4 border-l-error">
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 bg-error/10 rounded-lg flex items-center justify-center">
            <Icon name="Phone" size={18} color="var(--color-error)" />
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-text-primary mb-1">Emergency Support</h4>
            <p className="text-sm text-text-secondary mb-3">
              For urgent billing issues or payment failures, contact our 24/7 support team.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button variant="outline" size="sm" iconName="Phone" iconPosition="left">
                Call: 1800-123-4567
              </Button>
              <Button variant="outline" size="sm" iconName="MessageCircle" iconPosition="left">
                Live Chat
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Recent Activity */}
      <div className="energy-card">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Clock" size={20} color="var(--color-trust)" />
          <h3 className="text-lg font-semibold text-text-primary">Recent Activity</h3>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-success/10 rounded-lg">
            <Icon name="CheckCircle" size={16} color="var(--color-success)" />
            <div className="flex-1">
              <div className="text-sm font-medium text-text-primary">Payment Successful</div>
              <div className="text-xs text-text-secondary">₹2,450 paid on 28 Aug 2025</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-primary/10 rounded-lg">
            <Icon name="FileText" size={16} color="var(--color-primary)" />
            <div className="flex-1">
              <div className="text-sm font-medium text-text-primary">New Bill Generated</div>
              <div className="text-xs text-text-secondary">August 2025 bill available</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-warning/10 rounded-lg">
            <Icon name="Bell" size={16} color="var(--color-warning)" />
            <div className="flex-1">
              <div className="text-sm font-medium text-text-primary">Payment Reminder</div>
              <div className="text-xs text-text-secondary">Due date approaching in 3 days</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActionsPanel;