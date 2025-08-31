import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';

const NotificationPreferences = () => {
  const [preferences, setPreferences] = useState({
    billReminders: {
      email: true,
      sms: true,
      push: true
    },
    consumptionAlerts: {
      email: true,
      sms: false,
      push: true
    },
    maintenanceUpdates: {
      email: true,
      sms: true,
      push: false
    },
    energySavingTips: {
      email: true,
      sms: false,
      push: false
    },
    paymentConfirmations: {
      email: true,
      sms: true,
      push: true
    },
    outageAlerts: {
      email: true,
      sms: true,
      push: true
    }
  });

  const [globalSettings, setGlobalSettings] = useState({
    quietHours: true,
    quietStart: '22:00',
    quietEnd: '08:00',
    weekendOnly: false,
    frequency: 'immediate'
  });

  const notificationTypes = [
    {
      key: 'billReminders',
      title: 'Bill Reminders',
      description: 'Get notified about upcoming bill due dates and payment confirmations',
      icon: 'Receipt',
      color: 'text-primary'
    },
    {
      key: 'consumptionAlerts',
      title: 'Consumption Alerts',
      description: 'Receive alerts when your usage exceeds normal patterns or budget limits',
      icon: 'TrendingUp',
      color: 'text-warning'
    },
    {
      key: 'maintenanceUpdates',
      title: 'Maintenance Updates',
      description: 'Stay informed about planned maintenance and service interruptions',
      icon: 'Settings',
      color: 'text-trust'
    },
    {
      key: 'energySavingTips',
      title: 'Energy Saving Tips',
      description: 'Receive personalized tips and recommendations to reduce your consumption',
      icon: 'Lightbulb',
      color: 'text-success'
    },
    {
      key: 'paymentConfirmations',
      title: 'Payment Confirmations',
      description: 'Get instant confirmation when payments are processed successfully',
      icon: 'CreditCard',
      color: 'text-secondary'
    },
    {
      key: 'outageAlerts',
      title: 'Outage Alerts',
      description: 'Immediate notifications about power outages and restoration updates',
      icon: 'AlertTriangle',
      color: 'text-error'
    }
  ];

  const handlePreferenceChange = (type, channel, value) => {
    setPreferences(prev => ({
      ...prev,
      [type]: {
        ...prev?.[type],
        [channel]: value
      }
    }));
  };

  const handleGlobalSettingChange = (setting, value) => {
    setGlobalSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const savePreferences = () => {
    // Mock save functionality
    console.log('Preferences saved:', preferences, globalSettings);
  };

  return (
    <div className="energy-card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Notification Preferences</h3>
          <p className="text-sm text-text-secondary">Customize how and when you receive notifications</p>
        </div>
        <Button
          variant="default"
          iconName="Save"
          iconPosition="left"
          onClick={savePreferences}
        >
          Save Preferences
        </Button>
      </div>
      {/* Global Settings */}
      <div className="mb-8 p-4 bg-surface rounded-lg">
        <h4 className="text-md font-medium text-text-primary mb-4">Global Settings</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Checkbox
              label="Enable Quiet Hours"
              description="Pause non-urgent notifications during specified hours"
              checked={globalSettings?.quietHours}
              onChange={(e) => handleGlobalSettingChange('quietHours', e?.target?.checked)}
            />
            {globalSettings?.quietHours && (
              <div className="mt-3 ml-6 grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-text-secondary">Start Time</label>
                  <input
                    type="time"
                    value={globalSettings?.quietStart}
                    onChange={(e) => handleGlobalSettingChange('quietStart', e?.target?.value)}
                    className="w-full mt-1 px-2 py-1 text-sm border border-border rounded"
                  />
                </div>
                <div>
                  <label className="text-xs text-text-secondary">End Time</label>
                  <input
                    type="time"
                    value={globalSettings?.quietEnd}
                    onChange={(e) => handleGlobalSettingChange('quietEnd', e?.target?.value)}
                    className="w-full mt-1 px-2 py-1 text-sm border border-border rounded"
                  />
                </div>
              </div>
            )}
          </div>
          <div>
            <Checkbox
              label="Weekend Notifications Only"
              description="Receive non-urgent notifications only on weekends"
              checked={globalSettings?.weekendOnly}
              onChange={(e) => handleGlobalSettingChange('weekendOnly', e?.target?.checked)}
            />
          </div>
        </div>
      </div>
      {/* Notification Types */}
      <div className="space-y-6">
        {notificationTypes?.map((type) => (
          <div key={type?.key} className="border border-border rounded-lg p-4">
            <div className="flex items-start space-x-4">
              <div className={`w-10 h-10 rounded-lg bg-muted flex items-center justify-center ${type?.color}`}>
                <Icon name={type?.icon} size={20} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-md font-medium text-text-primary">{type?.title}</h4>
                </div>
                <p className="text-sm text-text-secondary mb-4">{type?.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-3 p-3 bg-surface rounded-lg">
                    <Icon name="Mail" size={16} color="var(--color-primary)" />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-text-primary">Email</div>
                      <div className="text-xs text-text-secondary">john.doe@email.com</div>
                    </div>
                    <Checkbox
                      checked={preferences?.[type?.key]?.email || false}
                      onChange={(e) => handlePreferenceChange(type?.key, 'email', e?.target?.checked)}
                    />
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-surface rounded-lg">
                    <Icon name="MessageSquare" size={16} color="var(--color-secondary)" />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-text-primary">SMS</div>
                      <div className="text-xs text-text-secondary">+91 98765 43210</div>
                    </div>
                    <Checkbox
                      checked={preferences?.[type?.key]?.sms || false}
                      onChange={(e) => handlePreferenceChange(type?.key, 'sms', e?.target?.checked)}
                    />
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-surface rounded-lg">
                    <Icon name="Smartphone" size={16} color="var(--color-trust)" />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-text-primary">Push</div>
                      <div className="text-xs text-text-secondary">Mobile App</div>
                    </div>
                    <Checkbox
                      checked={preferences?.[type?.key]?.push || false}
                      onChange={(e) => handlePreferenceChange(type?.key, 'push', e?.target?.checked)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Test Notifications */}
      <div className="mt-8 p-4 bg-primary/10 rounded-lg border border-primary/20">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium text-text-primary">Test Your Notifications</h4>
            <p className="text-sm text-text-secondary mt-1">
              Send a test notification to verify your settings are working correctly
            </p>
          </div>
          <Button variant="outline" iconName="Send" size="sm">
            Send Test
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotificationPreferences;