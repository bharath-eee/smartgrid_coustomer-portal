import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// Import components
import PaymentMethodCard from './components/PaymentMethodCard';
import BillSummary from './components/BillSummary';
import UPIPayment from './components/UPIPayment';
import CardPayment from './components/CardPayment';
import PaymentSuccess from './components/PaymentSuccess';
import PaymentProgress from './components/PaymentProgress';

const PaymentGateway = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [isBillExpanded, setIsBillExpanded] = useState(false);
  const [paymentData, setPaymentData] = useState(null);
  const location = useLocation();

  // Mock bill data
  const billData = {
    billNumber: 'EB240831001',
    totalAmount: 2847.50,
    dueDate: '2025-01-15',
    billingPeriod: 'Dec 2024',
    unitsConsumed: 245,
    daysUntilDue: 15,
    meterInfo: {
      id: 'MET789456123',
      connectionType: 'Residential',
      previousReading: 12450,
      currentReading: 12695
    },
    charges: [
      { description: 'Energy Charges (245 units)', amount: 2205.50 },
      { description: 'Fixed Charges', amount: 150.00 },
      { description: 'Electricity Duty', amount: 220.55 },
      { description: 'Fuel Surcharge', amount: 147.30 },
      { description: 'Service Tax (18%)', amount: 124.15 }
    ],
    paymentHistory: [
      { date: '2024-12-15', amount: 2654.30, method: 'UPI' },
      { date: '2024-11-14', amount: 2398.75, method: 'Card' },
      { date: '2024-10-16', amount: 2156.90, method: 'Net Banking' }
    ]
  };

  // Payment methods data
  const paymentMethods = [
    {
      id: 'upi',
      type: 'upi',
      name: 'UPI Payment',
      description: 'Pay instantly using UPI apps',
      isSecure: true,
      processingTime: 'Instant',
      discount: 2,
      logos: ['GPay', 'PPe', 'Paytm', 'BHIM']
    },
    {
      id: 'wallet',
      type: 'wallet',
      name: 'Digital Wallets',
      description: 'Paytm, PhonePe, Amazon Pay',
      isSecure: true,
      processingTime: 'Instant',
      discount: 1,
      logos: ['Paytm', 'PPe', 'APay']
    },
    {
      id: 'card',
      type: 'card',
      name: 'Credit/Debit Card',
      description: 'Visa, Mastercard, RuPay accepted',
      isSecure: true,
      processingTime: '2-3 minutes',
      logos: ['Visa', 'MC', 'RuPay']
    },
    {
      id: 'netbanking',
      type: 'netbanking',
      name: 'Net Banking',
      description: 'All major banks supported',
      isSecure: true,
      processingTime: '3-5 minutes',
      logos: ['HDFC', 'ICICI', 'SBI', 'Axis']
    }
  ];

  const progressSteps = [
    { id: 1, name: 'Select Method', icon: 'CreditCard' },
    { id: 2, name: 'Payment Details', icon: 'Edit' },
    { id: 3, name: 'Processing', icon: 'Loader' },
    { id: 4, name: 'Success', icon: 'CheckCircle' }
  ];

  useEffect(() => {
    // Auto-expand bill summary on mobile
    if (window.innerWidth < 768) {
      setIsBillExpanded(false);
    }
  }, []);

  const handleMethodSelect = (method) => {
    setSelectedMethod(method);
    setCurrentStep(2);
  };

  const handlePaymentSuccess = (data) => {
    setPaymentData(data);
    setCurrentStep(4);
  };

  const handleBackToMethods = () => {
    setSelectedMethod(null);
    setCurrentStep(1);
  };

  const handleStartOver = () => {
    setSelectedMethod(null);
    setPaymentData(null);
    setCurrentStep(1);
  };

  const renderPaymentContent = () => {
    if (currentStep === 4 && paymentData) {
      return (
        <PaymentSuccess
          paymentData={paymentData}
          onComplete={handleStartOver}
        />
      );
    }

    if (currentStep === 2 && selectedMethod) {
      if (selectedMethod?.type === 'upi') {
        return (
          <UPIPayment
            amount={billData?.totalAmount}
            onPaymentSuccess={handlePaymentSuccess}
            onBack={handleBackToMethods}
          />
        );
      } else if (selectedMethod?.type === 'card') {
        return (
          <CardPayment
            amount={billData?.totalAmount}
            onPaymentSuccess={handlePaymentSuccess}
            onBack={handleBackToMethods}
          />
        );
      } else {
        // For other payment methods, show a coming soon message
        return (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Clock" size={32} className="text-warning" />
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">Coming Soon</h3>
            <p className="text-text-secondary mb-6">
              {selectedMethod?.name} integration is coming soon. Please try UPI or Card payment.
            </p>
            <Button variant="outline" onClick={handleBackToMethods}>
              Choose Another Method
            </Button>
          </div>
        );
      }
    }

    // Default: Show payment methods
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-text-primary mb-2">Choose Payment Method</h2>
          <p className="text-text-secondary">Select your preferred way to pay your electricity bill</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {paymentMethods?.map((method, index) => (
            <PaymentMethodCard
              key={method?.id}
              method={method}
              isSelected={selectedMethod?.id === method?.id}
              onSelect={handleMethodSelect}
              isRecommended={index === 0}
            />
          ))}
        </div>
        {/* Security Badges */}
        <div className="bg-muted rounded-lg p-6">
          <h3 className="font-medium text-text-primary mb-4">Trusted & Secure</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={20} className="text-success" />
              <span className="text-sm text-text-secondary">SSL Secured</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Lock" size={20} className="text-trust" />
              <span className="text-sm text-text-secondary">PCI Compliant</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="CheckCircle" size={20} className="text-primary" />
              <span className="text-sm text-text-secondary">RBI Approved</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Zap" size={20} className="text-warning" />
              <span className="text-sm text-text-secondary">Instant Refund</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        isCollapsed={false}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      
      <Sidebar 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <main className="pt-16 lg:pl-80">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Icon name="CreditCard" size={24} color="white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-text-primary">Payment Gateway</h1>
                <p className="text-text-secondary">Secure and convenient bill payment</p>
              </div>
            </div>

            {/* Progress Indicator */}
            <PaymentProgress currentStep={currentStep} steps={progressSteps} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Bill Summary - Sidebar */}
            <div className="lg:col-span-1">
              <BillSummary
                billData={billData}
                isExpanded={isBillExpanded}
                onToggleExpanded={() => setIsBillExpanded(!isBillExpanded)}
              />

              {/* Quick Actions */}
              <div className="mt-6 space-y-3">
                <Button
                  variant="outline"
                  onClick={() => window.location.href = '/bill-management-suite'}
                  iconName="Receipt"
                  iconPosition="left"
                  className="w-full"
                >
                  View All Bills
                </Button>
                
                <Button
                  variant="ghost"
                  onClick={() => window.location.href = '/smart-dashboard-homepage'}
                  iconName="Home"
                  iconPosition="left"
                  className="w-full"
                >
                  Back to Dashboard
                </Button>
              </div>
            </div>

            {/* Payment Content - Main Area */}
            <div className="lg:col-span-2">
              <div className="bg-card border border-border rounded-lg p-6">
                {renderPaymentContent()}
              </div>
            </div>
          </div>

          {/* Support Section */}
          <div className="mt-12 bg-muted rounded-lg p-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-text-primary mb-2">Need Help?</h3>
              <p className="text-text-secondary mb-4">
                Our customer support team is available 24/7 to assist you
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6">
                <div className="flex items-center space-x-2">
                  <Icon name="Phone" size={16} className="text-primary" />
                  <span className="text-sm text-text-primary">1800-123-4567</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Mail" size={16} className="text-primary" />
                  <span className="text-sm text-text-primary">support@smartgrid.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="MessageCircle" size={16} className="text-primary" />
                  <span className="text-sm text-text-primary">Live Chat</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PaymentGateway;