import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BillStatusCard = () => {
  const navigate = useNavigate();
  
  const billData = {
    amount: 1247.50,
    dueDate: '2025-09-15',
    status: 'pending',
    billNumber: 'ELE/2025/08/001234',
    units: 186,
    lastPayment: '2025-07-28'
  };

  const handlePayBill = () => {
    navigate('/payment-gateway');
  };

  const handleViewBill = () => {
    navigate('/bill-management-suite');
  };

  const getDaysUntilDue = () => {
    const today = new Date();
    const dueDate = new Date(billData.dueDate);
    const diffTime = dueDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysLeft = getDaysUntilDue();
  const isOverdue = daysLeft < 0;
  const isUrgent = daysLeft <= 3 && daysLeft >= 0;

  return (
    <div className={`energy-card ${isOverdue ? 'border-error' : isUrgent ? 'border-warning' : 'border-border'}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`flex items-center justify-center w-12 h-12 rounded-lg ${
            isOverdue ? 'bg-error/10' : isUrgent ? 'bg-warning/10' : 'bg-primary/10'
          }`}>
            <Icon 
              name="Receipt" 
              size={20} 
              color={isOverdue ? 'var(--color-error)' : isUrgent ? 'var(--color-warning)' : 'var(--color-primary)'} 
            />
          </div>
          <div>
            <h3 className="font-semibold text-text-primary">Current Bill</h3>
            <p className="text-sm text-text-secondary">Bill #{billData?.billNumber}</p>
          </div>
        </div>
        <div className={`consumption-indicator ${isOverdue ? 'high' : isUrgent ? 'medium' : 'low'}`}>
          {isOverdue ? 'Overdue' : isUrgent ? 'Due Soon' : 'Current'}
        </div>
      </div>
      <div className="space-y-4">
        {/* Amount and Due Date */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-mono font-bold text-text-primary">₹{billData?.amount?.toLocaleString('en-IN')}</div>
            <div className="text-sm text-text-secondary">{billData?.units} units consumed</div>
          </div>
          <div className="text-right">
            <div className={`text-sm font-medium ${isOverdue ? 'text-error' : isUrgent ? 'text-warning' : 'text-text-primary'}`}>
              Due: {new Date(billData.dueDate)?.toLocaleDateString('en-IN')}
            </div>
            <div className="text-xs text-text-secondary">
              {isOverdue ? `${Math.abs(daysLeft)} days overdue` : `${daysLeft} days left`}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <Button 
            variant={isOverdue || isUrgent ? "default" : "outline"}
            className="flex-1"
            iconName="CreditCard"
            iconPosition="left"
            onClick={handlePayBill}
          >
            Pay Now
          </Button>
          <Button 
            variant="outline" 
            className="flex-1"
            iconName="FileText"
            iconPosition="left"
            onClick={handleViewBill}
          >
            View Bill
          </Button>
        </div>

        {/* Quick Payment Options */}
        <div className="flex items-center justify-center space-x-4 pt-2 border-t border-border">
          <div className="flex items-center space-x-2 text-xs text-text-secondary">
            <Icon name="Smartphone" size={14} />
            <span>UPI</span>
          </div>
          <div className="flex items-center space-x-2 text-xs text-text-secondary">
            <Icon name="CreditCard" size={14} />
            <span>Cards</span>
          </div>
          <div className="flex items-center space-x-2 text-xs text-text-secondary">
            <Icon name="Banknote" size={14} />
            <span>Net Banking</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillStatusCard;