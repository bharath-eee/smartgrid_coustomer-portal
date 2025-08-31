import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CurrentBillCard = ({ billData, onPayNow, onViewDetails }) => {
  const getDueDateStatus = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return { status: 'overdue', text: `${Math.abs(diffDays)} days overdue`, color: 'text-error' };
    if (diffDays <= 3) return { status: 'urgent', text: `Due in ${diffDays} days`, color: 'text-warning' };
    return { status: 'normal', text: `Due in ${diffDays} days`, color: 'text-text-secondary' };
  };

  const dueDateInfo = getDueDateStatus(billData?.dueDate);

  return (
    <div className="energy-card bg-gradient-to-br from-card to-muted/20 border-l-4 border-l-primary">
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Receipt" size={20} color="var(--color-primary)" />
            <span className="text-sm font-medium text-text-secondary">Current Bill</span>
          </div>
          <h2 className="text-2xl font-bold text-text-primary">₹{billData?.amount?.toLocaleString('en-IN')}</h2>
          <p className={`text-sm font-medium ${dueDateInfo?.color}`}>
            {dueDateInfo?.text}
          </p>
        </div>
        <div className="text-right">
          <div className="text-xs text-text-secondary mb-1">Bill Period</div>
          <div className="text-sm font-medium text-text-primary">{billData?.period}</div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-background/50 rounded-lg p-3">
          <div className="text-xs text-text-secondary mb-1">Units Consumed</div>
          <div className="text-lg font-mono font-semibold text-primary">{billData?.unitsConsumed}</div>
        </div>
        <div className="bg-background/50 rounded-lg p-3">
          <div className="text-xs text-text-secondary mb-1">Rate per Unit</div>
          <div className="text-lg font-mono font-semibold text-secondary">₹{billData?.ratePerUnit}</div>
        </div>
      </div>
      <div className="flex space-x-3">
        <Button 
          variant="default" 
          className="flex-1"
          iconName="CreditCard"
          iconPosition="left"
          onClick={onPayNow}
        >
          Pay Now
        </Button>
        <Button 
          variant="outline"
          iconName="Eye"
          iconPosition="left"
          onClick={onViewDetails}
        >
          View Details
        </Button>
      </div>
      {dueDateInfo?.status === 'overdue' && (
        <div className="mt-4 p-3 bg-error/10 border border-error/20 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="AlertTriangle" size={16} color="var(--color-error)" />
            <span className="text-sm font-medium text-error">Payment Overdue</span>
          </div>
          <p className="text-xs text-error/80 mt-1">
            Late payment charges may apply. Pay now to avoid additional fees.
          </p>
        </div>
      )}
    </div>
  );
};

export default CurrentBillCard;