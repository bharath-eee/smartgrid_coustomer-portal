import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const UPIPayment = ({ amount, onPaymentSuccess, onBack }) => {
  const [upiId, setUpiId] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('qr'); // 'qr' or 'id'
  const [isProcessing, setIsProcessing] = useState(false);
  const [timer, setTimer] = useState(300); // 5 minutes

  const popularUPIApps = [
    { name: 'GPay', icon: 'Smartphone', color: 'text-success' },
    { name: 'PhonePe', icon: 'Zap', color: 'text-trust' },
    { name: 'Paytm', icon: 'Wallet', color: 'text-warning' },
    { name: 'BHIM', icon: 'Shield', color: 'text-primary' }
  ];

  useEffect(() => {
    // Generate QR code data (mock implementation)
    const qrData = `upi://pay?pa=smartgrid@paytm&pn=SmartGrid Portal&am=${amount}&cu=INR&tn=Electricity Bill Payment`;
    setQrCode(qrData);
  }, [amount]);

  useEffect(() => {
    let interval;
    if (paymentMethod === 'qr' && timer > 0) {
      interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer, paymentMethod]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const handleUPIPayment = async () => {
    if (!upiId?.trim()) return;
    
    setIsProcessing(true);
    
    // Mock payment processing
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentSuccess({
        method: 'UPI',
        transactionId: 'UPI' + Date.now(),
        amount: amount,
        timestamp: new Date()?.toISOString()
      });
    }, 3000);
  };

  const handleQRPayment = () => {
    setIsProcessing(true);
    
    // Mock QR payment processing
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentSuccess({
        method: 'UPI QR',
        transactionId: 'QR' + Date.now(),
        amount: amount,
        timestamp: new Date()?.toISOString()
      });
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <Icon name="ArrowLeft" size={20} />
        </Button>
        <div>
          <h2 className="text-xl font-semibold text-text-primary">UPI Payment</h2>
          <p className="text-sm text-text-secondary">Pay securely using UPI</p>
        </div>
      </div>
      {/* Payment Method Toggle */}
      <div className="flex bg-muted rounded-lg p-1">
        <button
          onClick={() => setPaymentMethod('qr')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            paymentMethod === 'qr' ?'bg-background text-text-primary shadow-sm' :'text-text-secondary hover:text-text-primary'
          }`}
        >
          <Icon name="QrCode" size={16} className="mr-2 inline" />
          Scan QR Code
        </button>
        <button
          onClick={() => setPaymentMethod('id')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            paymentMethod === 'id' ?'bg-background text-text-primary shadow-sm' :'text-text-secondary hover:text-text-primary'
          }`}
        >
          <Icon name="AtSign" size={16} className="mr-2 inline" />
          Enter UPI ID
        </button>
      </div>
      {/* QR Code Payment */}
      {paymentMethod === 'qr' && (
        <div className="text-center space-y-4">
          <div className="bg-white p-6 rounded-lg border-2 border-dashed border-border inline-block">
            <div className="w-48 h-48 bg-muted rounded-lg flex items-center justify-center mb-4">
              <div className="text-center">
                <Icon name="QrCode" size={64} className="text-text-secondary mb-2" />
                <p className="text-sm text-text-secondary">QR Code</p>
              </div>
            </div>
            <div className="text-sm text-text-secondary">
              Amount: ₹{amount?.toLocaleString('en-IN')}
            </div>
          </div>
          
          <div className="flex items-center justify-center space-x-2 text-sm text-text-secondary">
            <Icon name="Clock" size={16} />
            <span>Valid for {formatTime(timer)}</span>
          </div>

          <div className="space-y-3">
            <p className="text-sm text-text-secondary">
              Scan with any UPI app to pay instantly
            </p>
            
            {/* Popular UPI Apps */}
            <div className="flex justify-center space-x-4">
              {popularUPIApps?.map((app, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center mb-1">
                    <Icon name={app?.icon} size={20} className={app?.color} />
                  </div>
                  <span className="text-xs text-text-secondary">{app?.name}</span>
                </div>
              ))}
            </div>
          </div>

          <Button
            variant="default"
            onClick={handleQRPayment}
            loading={isProcessing}
            className="w-full"
          >
            I have paid
          </Button>
        </div>
      )}
      {/* UPI ID Payment */}
      {paymentMethod === 'id' && (
        <div className="space-y-4">
          <Input
            label="UPI ID"
            type="text"
            placeholder="yourname@paytm"
            value={upiId}
            onChange={(e) => setUpiId(e?.target?.value)}
            description="Enter your UPI ID (e.g., 9876543210@paytm)"
          />

          {/* Saved UPI IDs */}
          <div>
            <h3 className="text-sm font-medium text-text-primary mb-3">Recent UPI IDs</h3>
            <div className="space-y-2">
              {['john.doe@gpay', 'john@paytm', '9876543210@ybl']?.map((id, index) => (
                <button
                  key={index}
                  onClick={() => setUpiId(id)}
                  className="w-full flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <Icon name="AtSign" size={16} className="text-primary" />
                    <span className="text-sm font-mono text-text-primary">{id}</span>
                  </div>
                  <Icon name="ChevronRight" size={16} className="text-text-secondary" />
                </button>
              ))}
            </div>
          </div>

          <Button
            variant="default"
            onClick={handleUPIPayment}
            loading={isProcessing}
            disabled={!upiId?.trim()}
            className="w-full"
          >
            Pay ₹{amount?.toLocaleString('en-IN')}
          </Button>
        </div>
      )}
      {/* Security Info */}
      <div className="bg-success/10 border border-success/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Shield" size={20} className="text-success mt-0.5" />
          <div>
            <h3 className="font-medium text-success mb-1">Secure UPI Payment</h3>
            <p className="text-sm text-success/80">
              Your payment is protected by bank-grade security. We never store your UPI PIN or banking details.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UPIPayment;