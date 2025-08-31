import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BillSummary = ({ billData, isExpanded, onToggleExpanded }) => {
  const [showBreakdown, setShowBreakdown] = useState(false);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    })?.format(amount);
  };

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-text-primary">Bill Summary</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleExpanded}
          iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
          iconPosition="right"
        >
          {isExpanded ? 'Less' : 'Details'}
        </Button>
      </div>
      {/* Amount Display */}
      <div className="text-center py-6 border-b border-border">
        <div className="text-sm text-text-secondary mb-2">Amount to Pay</div>
        <div className="text-4xl font-mono font-bold text-primary mb-2">
          {formatCurrency(billData?.totalAmount)}
        </div>
        <div className="flex items-center justify-center space-x-4 text-sm text-text-secondary">
          <span>Bill #{billData?.billNumber}</span>
          <span>•</span>
          <span>Due: {formatDate(billData?.dueDate)}</span>
        </div>
      </div>
      {/* Quick Info */}
      <div className="grid grid-cols-2 gap-4 py-4">
        <div className="text-center">
          <div className="text-sm text-text-secondary">Billing Period</div>
          <div className="font-medium text-text-primary">
            {billData?.billingPeriod}
          </div>
        </div>
        <div className="text-center">
          <div className="text-sm text-text-secondary">Units Consumed</div>
          <div className="font-medium text-text-primary">
            {billData?.unitsConsumed} kWh
          </div>
        </div>
      </div>
      {/* Expanded Details */}
      {isExpanded && (
        <div className="border-t border-border pt-4 space-y-4">
          {/* Meter Information */}
          <div className="bg-muted rounded-lg p-4">
            <h3 className="font-medium text-text-primary mb-3">Meter Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="flex justify-between">
                <span className="text-text-secondary">Meter ID:</span>
                <span className="font-mono text-text-primary">{billData?.meterInfo?.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Connection Type:</span>
                <span className="text-text-primary">{billData?.meterInfo?.connectionType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Previous Reading:</span>
                <span className="font-mono text-text-primary">{billData?.meterInfo?.previousReading}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Current Reading:</span>
                <span className="font-mono text-text-primary">{billData?.meterInfo?.currentReading}</span>
              </div>
            </div>
          </div>

          {/* Charges Breakdown */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-text-primary">Charges Breakdown</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowBreakdown(!showBreakdown)}
                iconName={showBreakdown ? "ChevronUp" : "ChevronDown"}
                iconPosition="right"
              >
                {showBreakdown ? 'Hide' : 'Show'}
              </Button>
            </div>
            
            {showBreakdown && (
              <div className="bg-muted rounded-lg p-4 space-y-2">
                {billData?.charges?.map((charge, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-text-secondary">{charge?.description}</span>
                    <span className="font-mono text-text-primary">
                      {formatCurrency(charge?.amount)}
                    </span>
                  </div>
                ))}
                <div className="border-t border-border pt-2 mt-3">
                  <div className="flex justify-between font-medium">
                    <span className="text-text-primary">Total Amount</span>
                    <span className="font-mono text-primary">
                      {formatCurrency(billData?.totalAmount)}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Payment History */}
          {billData?.paymentHistory && billData?.paymentHistory?.length > 0 && (
            <div>
              <h3 className="font-medium text-text-primary mb-3">Recent Payments</h3>
              <div className="space-y-2">
                {billData?.paymentHistory?.slice(0, 3)?.map((payment, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <div>
                        <div className="text-sm font-medium text-text-primary">
                          {formatDate(payment?.date)}
                        </div>
                        <div className="text-xs text-text-secondary">
                          {payment?.method}
                        </div>
                      </div>
                    </div>
                    <div className="font-mono text-sm text-text-primary">
                      {formatCurrency(payment?.amount)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      {/* Status Indicators */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Shield" size={16} className="text-success" />
          <span className="text-sm text-text-secondary">Secure Payment</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Clock" size={16} className="text-warning" />
          <span className="text-sm text-text-secondary">
            {billData?.daysUntilDue} days left
          </span>
        </div>
      </div>
    </div>
  );
};

export default BillSummary;