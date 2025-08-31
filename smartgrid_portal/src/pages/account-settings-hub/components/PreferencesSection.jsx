import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const PreferencesSection = () => {
  const [preferences, setPreferences] = useState({
    language: 'en',
    currency: 'INR',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '12h',
    theme: 'light',
    units: 'metric',
    dashboardLayout: 'default',
    autoRefresh: true,
    refreshInterval: '30s',
    compactMode: false
  });

  const [accessibilitySettings, setAccessibilitySettings] = useState({
    highContrast: false,
    largeText: false,
    reducedMotion: false,
    screenReader: false,
    keyboardNavigation: true
  });

  const languageOptions = [
    { value: 'en', label: 'English', description: 'English (Default)' },
    { value: 'hi', label: 'हिंदी', description: 'Hindi' },
    { value: 'mr', label: 'मराठी', description: 'Marathi' },
    { value: 'gu', label: 'ગુજરાતી', description: 'Gujarati' },
    { value: 'ta', label: 'தமிழ்', description: 'Tamil' }
  ];

  const currencyOptions = [
    { value: 'INR', label: '₹ Indian Rupee (INR)', description: 'Default currency' },
    { value: 'USD', label: '$ US Dollar (USD)', description: 'For reference only' }
  ];

  const dateFormatOptions = [
    { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY', description: '31/08/2024' },
    { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY', description: '08/31/2024' },
    { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD', description: '2024-08-31' }
  ];

  const timeFormatOptions = [
    { value: '12h', label: '12 Hour', description: '2:30 PM' },
    { value: '24h', label: '24 Hour', description: '14:30' }
  ];

  const themeOptions = [
    { value: 'light', label: 'Light Theme', description: 'Default light appearance' },
    { value: 'dark', label: 'Dark Theme', description: 'Coming soon' },
    { value: 'auto', label: 'Auto', description: 'Follow system preference' }
  ];

  const refreshIntervalOptions = [
    { value: '15s', label: '15 seconds', description: 'Very frequent updates' },
    { value: '30s', label: '30 seconds', description: 'Recommended' },
    { value: '1m', label: '1 minute', description: 'Balanced performance' },
    { value: '5m', label: '5 minutes', description: 'Battery saving' }
  ];

  const handlePreferenceChange = (key, value) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleAccessibilityChange = (key, value) => {
    setAccessibilitySettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const savePreferences = () => {
    // Mock save functionality
    console.log('Preferences saved:', preferences, accessibilitySettings);
  };

  return (
    <div className="energy-card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Language & Regional Preferences</h3>
          <p className="text-sm text-text-secondary">Customize your language, currency, and regional settings</p>
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
      {/* Language & Regional Settings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Select
          label="Language"
          description="Choose your preferred language for the interface"
          options={languageOptions}
          value={preferences?.language}
          onChange={(value) => handlePreferenceChange('language', value)}
          searchable
        />

        <Select
          label="Currency"
          description="Display currency for bills and costs"
          options={currencyOptions}
          value={preferences?.currency}
          onChange={(value) => handlePreferenceChange('currency', value)}
        />

        <Select
          label="Date Format"
          description="How dates are displayed throughout the app"
          options={dateFormatOptions}
          value={preferences?.dateFormat}
          onChange={(value) => handlePreferenceChange('dateFormat', value)}
        />

        <Select
          label="Time Format"
          description="12-hour or 24-hour time display"
          options={timeFormatOptions}
          value={preferences?.timeFormat}
          onChange={(value) => handlePreferenceChange('timeFormat', value)}
        />
      </div>
      {/* Display Preferences */}
      <div className="mb-8">
        <h4 className="text-md font-medium text-text-primary mb-4">Display Preferences</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="Theme"
            description="Choose your preferred color theme"
            options={themeOptions}
            value={preferences?.theme}
            onChange={(value) => handlePreferenceChange('theme', value)}
          />

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div>
                <div className="text-sm font-medium text-text-primary">Auto Refresh Data</div>
                <div className="text-xs text-text-secondary">Automatically update dashboard data</div>
              </div>
              <Checkbox
                checked={preferences?.autoRefresh}
                onChange={(e) => handlePreferenceChange('autoRefresh', e?.target?.checked)}
              />
            </div>

            {preferences?.autoRefresh && (
              <Select
                label="Refresh Interval"
                description="How often to update live data"
                options={refreshIntervalOptions}
                value={preferences?.refreshInterval}
                onChange={(value) => handlePreferenceChange('refreshInterval', value)}
              />
            )}
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between p-3 border border-border rounded-lg">
            <div>
              <div className="text-sm font-medium text-text-primary">Compact Mode</div>
              <div className="text-xs text-text-secondary">Show more information in less space</div>
            </div>
            <Checkbox
              checked={preferences?.compactMode}
              onChange={(e) => handlePreferenceChange('compactMode', e?.target?.checked)}
            />
          </div>
        </div>
      </div>
      {/* Accessibility Settings */}
      <div className="mb-8">
        <h4 className="text-md font-medium text-text-primary mb-4">Accessibility Options</h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 border border-border rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon name="Eye" size={18} color="var(--color-primary)" />
              <div>
                <div className="text-sm font-medium text-text-primary">High Contrast Mode</div>
                <div className="text-xs text-text-secondary">Increase contrast for better visibility</div>
              </div>
            </div>
            <Checkbox
              checked={accessibilitySettings?.highContrast}
              onChange={(e) => handleAccessibilityChange('highContrast', e?.target?.checked)}
            />
          </div>

          <div className="flex items-center justify-between p-3 border border-border rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon name="Type" size={18} color="var(--color-primary)" />
              <div>
                <div className="text-sm font-medium text-text-primary">Large Text</div>
                <div className="text-xs text-text-secondary">Increase font size for better readability</div>
              </div>
            </div>
            <Checkbox
              checked={accessibilitySettings?.largeText}
              onChange={(e) => handleAccessibilityChange('largeText', e?.target?.checked)}
            />
          </div>

          <div className="flex items-center justify-between p-3 border border-border rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon name="Zap" size={18} color="var(--color-primary)" />
              <div>
                <div className="text-sm font-medium text-text-primary">Reduced Motion</div>
                <div className="text-xs text-text-secondary">Minimize animations and transitions</div>
              </div>
            </div>
            <Checkbox
              checked={accessibilitySettings?.reducedMotion}
              onChange={(e) => handleAccessibilityChange('reducedMotion', e?.target?.checked)}
            />
          </div>

          <div className="flex items-center justify-between p-3 border border-border rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon name="Volume2" size={18} color="var(--color-primary)" />
              <div>
                <div className="text-sm font-medium text-text-primary">Screen Reader Support</div>
                <div className="text-xs text-text-secondary">Optimize for screen reading software</div>
              </div>
            </div>
            <Checkbox
              checked={accessibilitySettings?.screenReader}
              onChange={(e) => handleAccessibilityChange('screenReader', e?.target?.checked)}
            />
          </div>

          <div className="flex items-center justify-between p-3 border border-border rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon name="Keyboard" size={18} color="var(--color-primary)" />
              <div>
                <div className="text-sm font-medium text-text-primary">Keyboard Navigation</div>
                <div className="text-xs text-text-secondary">Enable full keyboard navigation support</div>
              </div>
            </div>
            <Checkbox
              checked={accessibilitySettings?.keyboardNavigation}
              onChange={(e) => handleAccessibilityChange('keyboardNavigation', e?.target?.checked)}
            />
          </div>
        </div>
      </div>
      {/* Mobile App Connection */}
      <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Smartphone" size={18} color="white" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-text-primary">Mobile App Sync</h4>
              <p className="text-xs text-text-secondary">
                Sync your preferences with the SmartGrid mobile app
              </p>
            </div>
          </div>
          <Button variant="outline" iconName="QrCode" size="sm">
            Connect App
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PreferencesSection;