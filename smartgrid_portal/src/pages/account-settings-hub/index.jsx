import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import PersonalInfoSection from './components/PersonalInfoSection';
import MeterManagementSection from './components/MeterManagementSection';
import NotificationPreferences from './components/NotificationPreferences';
import SecuritySection from './components/SecuritySection';
import PrivacyControls from './components/PrivacyControls';
import PreferencesSection from './components/PreferencesSection';

const AccountSettingsHub = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('personal');

  const settingsSections = [
    {
      id: 'personal',
      name: 'Personal Information',
      icon: 'User',
      description: 'Manage your profile and contact details'
    },
    {
      id: 'meters',
      name: 'Meter Management',
      icon: 'Zap',
      description: 'Connect and manage your meters'
    },
    {
      id: 'notifications',
      name: 'Notifications',
      icon: 'Bell',
      description: 'Customize your notification preferences'
    },
    {
      id: 'security',
      name: 'Security',
      icon: 'Shield',
      description: 'Password and authentication settings'
    },
    {
      id: 'privacy',
      name: 'Privacy',
      icon: 'Lock',
      description: 'Control your data and privacy settings'
    },
    {
      id: 'preferences',
      name: 'Preferences',
      icon: 'Settings',
      description: 'Language, theme, and display options'
    }
  ];

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'personal':
        return <PersonalInfoSection />;
      case 'meters':
        return <MeterManagementSection />;
      case 'notifications':
        return <NotificationPreferences />;
      case 'security':
        return <SecuritySection />;
      case 'privacy':
        return <PrivacyControls />;
      case 'preferences':
        return <PreferencesSection />;
      default:
        return <PersonalInfoSection />;
    }
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
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Icon name="Settings" size={20} color="white" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-text-primary">Account Settings</h1>
                <p className="text-text-secondary">Manage your account preferences and security settings</p>
              </div>
            </div>

            {/* Breadcrumb */}
            <nav className="flex items-center space-x-2 text-sm text-text-secondary">
              <button 
                onClick={() => window.location.href = '/smart-dashboard-homepage'}
                className="hover:text-text-primary transition-colors"
              >
                Dashboard
              </button>
              <Icon name="ChevronRight" size={14} />
              <span className="text-text-primary">Account Settings</span>
            </nav>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Settings Navigation */}
            <div className="lg:col-span-1">
              <div className="energy-card sticky top-24">
                <h3 className="text-lg font-semibold text-text-primary mb-4">Settings</h3>
                <nav className="space-y-2">
                  {settingsSections?.map((section) => (
                    <button
                      key={section?.id}
                      onClick={() => setActiveSection(section?.id)}
                      className={`
                        w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200
                        ${activeSection === section?.id 
                          ? 'bg-primary text-primary-foreground shadow-energy-md' 
                          : 'hover:bg-muted text-text-secondary hover:text-text-primary'
                        }
                      `}
                    >
                      <div className={`
                        flex items-center justify-center w-8 h-8 rounded-lg
                        ${activeSection === section?.id 
                          ? 'bg-white/20' :'bg-muted'
                        }
                      `}>
                        <Icon 
                          name={section?.icon} 
                          size={16} 
                          color={activeSection === section?.id ? 'currentColor' : 'var(--color-primary)'}
                        />
                      </div>
                      <div className="flex-1 text-left">
                        <div className="font-medium">{section?.name}</div>
                        <div className={`text-xs ${
                          activeSection === section?.id 
                            ? 'text-primary-foreground/80' 
                            : 'text-text-secondary'
                        }`}>
                          {section?.description}
                        </div>
                      </div>
                    </button>
                  ))}
                </nav>

                {/* Quick Actions */}
                <div className="mt-6 pt-6 border-t border-border">
                  <h4 className="text-sm font-medium text-text-secondary uppercase tracking-wide mb-3">
                    Quick Actions
                  </h4>
                  <div className="space-y-2">
                    <button className="w-full flex items-center space-x-2 p-2 text-sm text-text-secondary hover:text-text-primary hover:bg-muted rounded-lg transition-colors">
                      <Icon name="Download" size={14} />
                      <span>Export Data</span>
                    </button>
                    <button className="w-full flex items-center space-x-2 p-2 text-sm text-text-secondary hover:text-text-primary hover:bg-muted rounded-lg transition-colors">
                      <Icon name="HelpCircle" size={14} />
                      <span>Get Help</span>
                    </button>
                    <button className="w-full flex items-center space-x-2 p-2 text-sm text-error hover:bg-error/10 rounded-lg transition-colors">
                      <Icon name="LogOut" size={14} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Settings Content */}
            <div className="lg:col-span-3">
              {renderActiveSection()}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AccountSettingsHub;