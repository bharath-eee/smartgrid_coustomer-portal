import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const AutoPaySetup = ({ isEnabled, onToggle, settings, onUpdateSettings }) => {
  const [showSettings, setShowSettings] = useState(false);
  const [localSettings, setLocalSettings] = useState(settings);

  const handleSaveSettings = () => {
    onUpdateSettings(localSettings);
    setShowSettings(false);
  };

  return (
    <div className="energy-card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="Repeat" size={20} color="var(--color-secondary)" />
          <h3 className="text-lg font-semibold text-text-primary">AutoPay Setup</h3>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-text-secondary">
            {isEnabled ? 'Enabled' : 'Disabled'}
          </span>
          <button
            onClick={onToggle}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              isEnabled ? 'bg-success' : 'bg-muted'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                isEnabled ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>
      {isEnabled ? (
        <div className="space-y-4">
          <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="CheckCircle" size={16} color="var(--color-success)" />
              <span className="text-sm font-medium text-success">AutoPay Active</span>
            </div>
            <div className="text-sm text-text-secondary">
              <p>Payment Method: {settings?.paymentMethod}</p>
              <p>Auto-pay on: {settings?.daysBefore} days before due date</p>
              <p>Maximum Amount: ₹{settings?.maxAmount?.toLocaleString('en-IN')}</p>
            </div>
          </div>

          <Button 
            variant="outline" 
            className="w-full"
            iconName="Settings"
            iconPosition="left"
            onClick={() => setShowSettings(!showSettings)}
          >
            Modify Settings
          </Button>

          {showSettings && (
            <div className="p-4 border border-border rounded-lg space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Payment Method
                </label>
                <select 
                  value={localSettings?.paymentMethod}
                  onChange={(e) => setLocalSettings({...localSettings, paymentMethod: e?.target?.value})}
                  className="w-full p-2 border border-border rounded-md bg-input text-text-primary"
                >
                  <option value="UPI - john@paytm">UPI - john@paytm</option>
                  <option value="Credit Card - **** 4567">Credit Card - **** 4567</option>
                  <option value="Net Banking - SBI">Net Banking - SBI</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Auto-pay timing
                </label>
                <select 
                  value={localSettings?.daysBefore}
                  onChange={(e) => setLocalSettings({...localSettings, daysBefore: parseInt(e?.target?.value)})}
                  className="w-full p-2 border border-border rounded-md bg-input text-text-primary"
                >
                  <option value={1}>1 day before due date</option>
                  <option value={3}>3 days before due date</option>
                  <option value={5}>5 days before due date</option>
                  <option value={7}>7 days before due date</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Maximum Amount (₹)
                </label>
                <input 
                  type="number"
                  value={localSettings?.maxAmount}
                  onChange={(e) => setLocalSettings({...localSettings, maxAmount: parseInt(e?.target?.value)})}
                  className="w-full p-2 border border-border rounded-md bg-input text-text-primary"
                  min="1000"
                  max="50000"
                  step="500"
                />
                <p className="text-xs text-text-secondary mt-1">
                  Bills exceeding this amount will require manual approval
                </p>
              </div>

              <div className="flex space-x-3">
                <Button variant="default" onClick={handleSaveSettings}>
                  Save Changes
                </Button>
                <Button variant="outline" onClick={() => setShowSettings(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-6">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Repeat" size={24} color="var(--color-text-secondary)" />
          </div>
          <h4 className="text-lg font-medium text-text-primary mb-2">Set up AutoPay</h4>
          <p className="text-sm text-text-secondary mb-6">
            Never miss a payment again. AutoPay ensures your bills are paid on time, every time.
          </p>
          
          <div className="space-y-3 text-left mb-6">
            <div className="flex items-center space-x-3">
              <Icon name="CheckCircle" size={16} color="var(--color-success)" />
              <span className="text-sm text-text-secondary">Automatic payment before due date</span>
            </div>
            <div className="flex items-center space-x-3">
              <Icon name="Shield" size={16} color="var(--color-success)" />
              <span className="text-sm text-text-secondary">Secure and encrypted transactions</span>
            </div>
            <div className="flex items-center space-x-3">
              <Icon name="Bell" size={16} color="var(--color-success)" />
              <span className="text-sm text-text-secondary">SMS and email confirmations</span>
            </div>
          </div>

          <Button 
            variant="default" 
            className="w-full"
            iconName="Plus"
            iconPosition="left"
            onClick={onToggle}
          >
            Enable AutoPay
          </Button>
        </div>
      )}
    </div>
  );
};

export default AutoPaySetup;