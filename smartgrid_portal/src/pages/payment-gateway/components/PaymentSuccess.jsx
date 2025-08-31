import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PaymentSuccess = ({ paymentData, onComplete }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [autoPayEnabled, setAutoPayEnabled] = useState(false);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    })?.format(amount);
  };

  const formatDateTime = (timestamp) => {
    return new Date(timestamp)?.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const handleDownloadReceipt = async () => {
    setIsDownloading(true);
    
    // Mock download process
    setTimeout(() => {
      setIsDownloading(false);
      // In real implementation, this would trigger a PDF download
      console.log('Receipt downloaded');
    }, 2000);
  };

  const handleSetupAutoPay = () => {
    setAutoPayEnabled(true);
    // In real implementation, this would navigate to autopay setup
  };

  return (
    <div className="max-w-md mx-auto">
      {/* Success Animation */}
      <div className="text-center mb-8">
        <div className="relative inline-flex items-center justify-center w-24 h-24 bg-success/10 rounded-full mb-4">
          <div className="absolute inset-0 bg-success/20 rounded-full animate-ping"></div>
          <div className="relative w-16 h-16 bg-success rounded-full flex items-center justify-center">
            <Icon name="Check" size={32} color="white" strokeWidth={3} />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-text-primary mb-2">Payment Successful!</h1>
        <p className="text-text-secondary">Your electricity bill has been paid successfully</p>
      </div>
      {/* Payment Details Card */}
      <div className="bg-card border border-border rounded-lg p-6 mb-6">
        <div className="text-center border-b border-border pb-4 mb-4">
          <div className="text-3xl font-mono font-bold text-success mb-1">
            {formatCurrency(paymentData?.amount)}
          </div>
          <div className="text-sm text-text-secondary">Amount Paid</div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-text-secondary">Transaction ID</span>
            <span className="font-mono text-text-primary">{paymentData?.transactionId}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-text-secondary">Payment Method</span>
            <span className="text-text-primary">{paymentData?.method}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-text-secondary">Date & Time</span>
            <span className="text-text-primary">{formatDateTime(paymentData?.timestamp)}</span>
          </div>
          
          {paymentData?.cardLast4 && (
            <div className="flex justify-between">
              <span className="text-text-secondary">Card Used</span>
              <span className="font-mono text-text-primary">**** {paymentData?.cardLast4}</span>
            </div>
          )}
          
          <div className="flex justify-between">
            <span className="text-text-secondary">Status</span>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span className="text-success font-medium">Completed</span>
            </div>
          </div>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="space-y-3 mb-6">
        <Button
          variant="outline"
          onClick={handleDownloadReceipt}
          loading={isDownloading}
          iconName="Download"
          iconPosition="left"
          className="w-full"
        >
          Download Receipt
        </Button>
        
        <Button
          variant="ghost"
          iconName="Share"
          iconPosition="left"
          className="w-full"
        >
          Share Receipt
        </Button>
      </div>
      {/* Auto-Pay Promotion */}
      {!autoPayEnabled && (
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-6">
          <div className="flex items-start space-x-3">
            <Icon name="Zap" size={20} className="text-primary mt-0.5" />
            <div className="flex-1">
              <h3 className="font-medium text-primary mb-1">Never miss a payment!</h3>
              <p className="text-sm text-primary/80 mb-3">
                Set up AutoPay and get 2% cashback on all future bill payments.
              </p>
              <Button
                variant="default"
                size="sm"
                onClick={handleSetupAutoPay}
                iconName="ArrowRight"
                iconPosition="right"
              >
                Setup AutoPay
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Next Steps */}
      <div className="bg-muted rounded-lg p-4 mb-6">
        <h3 className="font-medium text-text-primary mb-3">What's Next?</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-3">
            <Icon name="CheckCircle" size={16} className="text-success" />
            <span className="text-sm text-text-secondary">Payment confirmation sent to your email</span>
          </div>
          <div className="flex items-center space-x-3">
            <Icon name="CheckCircle" size={16} className="text-success" />
            <span className="text-sm text-text-secondary">Account balance updated in real-time</span>
          </div>
          <div className="flex items-center space-x-3">
            <Icon name="Clock" size={16} className="text-warning" />
            <span className="text-sm text-text-secondary">Next bill due on 15th Jan 2025</span>
          </div>
        </div>
      </div>
      {/* Support Info */}
      <div className="text-center text-sm text-text-secondary mb-6">
        <p>Need help? Contact our support team</p>
        <div className="flex items-center justify-center space-x-4 mt-2">
          <button className="flex items-center space-x-1 text-primary hover:underline">
            <Icon name="Phone" size={14} />
            <span>1800-123-4567</span>
          </button>
          <button className="flex items-center space-x-1 text-primary hover:underline">
            <Icon name="Mail" size={14} />
            <span>support@smartgrid.com</span>
          </button>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <Button
          variant="outline"
          onClick={() => window.location.href = '/smart-dashboard-homepage'}
          iconName="Home"
          iconPosition="left"
        >
          Go to Dashboard
        </Button>
        
        <Button
          variant="default"
          onClick={onComplete}
          iconName="CreditCard"
          iconPosition="left"
        >
          Pay Another Bill
        </Button>
      </div>
    </div>
  );
};

export default PaymentSuccess;