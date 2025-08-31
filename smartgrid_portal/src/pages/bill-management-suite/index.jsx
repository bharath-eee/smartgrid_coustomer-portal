import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import CurrentBillCard from './components/CurrentBillCard';
import PaymentMethodsCard from './components/PaymentMethodsCard';
import AutoPaySetup from './components/AutoPaySetup';
import BillHistoryTable from './components/BillHistoryTable';
import UsageComparisonChart from './components/UsageComparisonChart';
import ExpenseTracker from './components/ExpenseTracker';
import QuickActionsPanel from './components/QuickActionsPanel';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const BillManagementSuite = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [autoPayEnabled, setAutoPayEnabled] = useState(false);

  // Mock data for current bill
  const currentBillData = {
    amount: 2450,
    dueDate: '2025-09-05',
    period: 'Aug 2025',
    unitsConsumed: '245 kWh',
    ratePerUnit: '8.50'
  };

  // Mock data for saved payment methods
  const [savedPaymentMethods, setSavedPaymentMethods] = useState([
    {
      id: 1,
      type: 'UPI',
      name: 'UPI - Paytm',
      details: 'john@paytm',
      isDefault: true
    },
    {
      id: 2,
      type: 'Credit Card',
      name: 'HDFC Credit Card',
      details: '**** **** **** 4567',
      isDefault: false
    },
    {
      id: 3,
      type: 'Net Banking',
      name: 'State Bank of India',
      details: 'SBI Net Banking',
      isDefault: false
    },
    {
      id: 4,
      type: 'Wallet',
      name: 'Google Pay',
      details: 'john.doe@gmail.com',
      isDefault: false
    }
  ]);

  // Mock data for autopay settings
  const [autoPaySettings, setAutoPaySettings] = useState({
    paymentMethod: 'UPI - john@paytm',
    daysBefore: 3,
    maxAmount: 5000
  });

  // Mock data for bill history
  const billHistoryData = [
    {
      id: 1,
      date: '2025-08-01',
      period: 'Jul 2025',
      amount: 2180,
      units: '218 kWh',
      status: 'Paid'
    },
    {
      id: 2,
      date: '2025-07-01',
      period: 'Jun 2025',
      amount: 2650,
      units: '265 kWh',
      status: 'Paid'
    },
    {
      id: 3,
      date: '2025-06-01',
      period: 'May 2025',
      amount: 2890,
      units: '289 kWh',
      status: 'Paid'
    },
    {
      id: 4,
      date: '2025-05-01',
      period: 'Apr 2025',
      amount: 2340,
      units: '234 kWh',
      status: 'Paid'
    },
    {
      id: 5,
      date: '2025-04-01',
      period: 'Mar 2025',
      amount: 2120,
      units: '212 kWh',
      status: 'Paid'
    },
    {
      id: 6,
      date: '2025-03-01',
      period: 'Feb 2025',
      amount: 1980,
      units: '198 kWh',
      status: 'Paid'
    }
  ];

  // Mock data for usage comparison chart
  const usageComparisonData = [
    { month: 'Mar', usage: 198, cost: 1980, comparison: -5 },
    { month: 'Apr', usage: 212, cost: 2120, comparison: 8 },
    { month: 'May', usage: 234, cost: 2340, comparison: 12 },
    { month: 'Jun', usage: 289, cost: 2890, comparison: 18 },
    { month: 'Jul', usage: 265, cost: 2650, comparison: 15 },
    { month: 'Aug', usage: 218, cost: 2180, comparison: -2 },
    { month: 'Sep', usage: 245, cost: 2450, comparison: 8 }
  ];

  // Mock data for expense tracker
  const expenseData = {
    energyCharges: 1960,
    fixedCharges: 180,
    taxes: 245,
    otherCharges: 65,
    comparison: 8,
    threeMonthAverage: 2380
  };

  const budgetData = {
    monthlyBudget: 3000
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: 'LayoutDashboard' },
    { id: 'history', name: 'Bill History', icon: 'History' },
    { id: 'analytics', name: 'Usage Analytics', icon: 'BarChart3' },
    { id: 'payments', name: 'Payment Methods', icon: 'CreditCard' },
    { id: 'settings', name: 'Settings', icon: 'Settings' }
  ];

  const handlePayNow = () => {
    navigate('/payment-gateway');
  };

  const handleViewDetails = () => {
    console.log('Viewing bill details');
  };

  const handleAddPaymentMethod = () => {
    console.log('Adding new payment method');
  };

  const handleSetDefaultPayment = (methodId) => {
    setSavedPaymentMethods(methods => 
      methods?.map(method => ({
        ...method,
        isDefault: method?.id === methodId
      }))
    );
  };

  const handleRemovePaymentMethod = (methodId) => {
    setSavedPaymentMethods(methods => 
      methods?.filter(method => method?.id !== methodId)
    );
  };

  const handleDownloadPDF = (billId) => {
    console.log(`Downloading PDF for bill ${billId}`);
  };

  const handleViewBillDetails = (billId) => {
    console.log(`Viewing details for bill ${billId}`);
  };

  const handleSetBudget = (budgetAmount) => {
    console.log(`Setting budget to ${budgetAmount}`);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2 space-y-6">
              <CurrentBillCard 
                billData={currentBillData}
                onPayNow={handlePayNow}
                onViewDetails={handleViewDetails}
              />
              <UsageComparisonChart data={usageComparisonData} />
              <ExpenseTracker 
                monthlyData={expenseData}
                budgetData={budgetData}
                onSetBudget={handleSetBudget}
              />
            </div>
            <div>
              <QuickActionsPanel 
                onPayBill={handlePayNow}
                onDownloadBill={() => handleDownloadPDF(1)}
                onSetupAutoPay={() => setAutoPayEnabled(true)}
                onViewAnalytics={() => navigate('/consumption-analytics-center')}
              />
            </div>
          </div>
        );

      case 'history':
        return (
          <BillHistoryTable 
            bills={billHistoryData}
            onDownloadPDF={handleDownloadPDF}
            onViewDetails={handleViewBillDetails}
          />
        );

      case 'analytics':
        return (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <UsageComparisonChart data={usageComparisonData} />
            <ExpenseTracker 
              monthlyData={expenseData}
              budgetData={budgetData}
              onSetBudget={handleSetBudget}
            />
          </div>
        );

      case 'payments':
        return (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <PaymentMethodsCard 
              savedMethods={savedPaymentMethods}
              onAddMethod={handleAddPaymentMethod}
              onSetDefault={handleSetDefaultPayment}
              onRemoveMethod={handleRemovePaymentMethod}
            />
            <AutoPaySetup 
              isEnabled={autoPayEnabled}
              onToggle={() => setAutoPayEnabled(!autoPayEnabled)}
              settings={autoPaySettings}
              onUpdateSettings={setAutoPaySettings}
            />
          </div>
        );

      case 'settings':
        return (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <AutoPaySetup 
              isEnabled={autoPayEnabled}
              onToggle={() => setAutoPayEnabled(!autoPayEnabled)}
              settings={autoPaySettings}
              onUpdateSettings={setAutoPaySettings}
            />
            <div className="energy-card">
              <div className="flex items-center space-x-2 mb-6">
                <Icon name="Settings" size={20} color="var(--color-primary)" />
                <h3 className="text-lg font-semibold text-text-primary">Billing Preferences</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
                  <div>
                    <div className="font-medium text-text-primary">Email Notifications</div>
                    <div className="text-sm text-text-secondary">Receive bill alerts via email</div>
                  </div>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-success transition-colors">
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
                  </button>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
                  <div>
                    <div className="font-medium text-text-primary">SMS Alerts</div>
                    <div className="text-sm text-text-secondary">Get payment reminders via SMS</div>
                  </div>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-success transition-colors">
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
                  </button>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
                  <div>
                    <div className="font-medium text-text-primary">Paper Bills</div>
                    <div className="text-sm text-text-secondary">Receive physical bill copies</div>
                  </div>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-muted transition-colors">
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        isCollapsed={false}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />
      <Sidebar 
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <main className="pt-16 lg:pl-80">
        <div className="p-6">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Icon name="Receipt" size={20} color="white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-text-primary">Bill Management Suite</h1>
                <p className="text-text-secondary">Comprehensive financial management for your energy bills</p>
              </div>
            </div>

            {/* Current Bill Status Banner */}
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-lg p-4 mt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Icon name="Receipt" size={20} color="var(--color-primary)" />
                    <span className="font-medium text-text-primary">Current Bill: ₹{currentBillData?.amount?.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Calendar" size={16} color="var(--color-warning)" />
                    <span className="text-sm text-warning font-medium">Due: {new Date(currentBillData.dueDate)?.toLocaleDateString('en-IN')}</span>
                  </div>
                </div>
                <Button 
                  variant="default" 
                  size="sm"
                  iconName="CreditCard"
                  iconPosition="left"
                  onClick={handlePayNow}
                >
                  Pay Now
                </Button>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="border-b border-border mb-6">
            <nav className="flex space-x-8 overflow-x-auto">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`
                    flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap
                    ${activeTab === tab?.id
                      ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary hover:border-border'
                    }
                  `}
                >
                  <Icon name={tab?.icon} size={16} />
                  <span>{tab?.name}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="animate-reveal">
            {renderTabContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default BillManagementSuite;