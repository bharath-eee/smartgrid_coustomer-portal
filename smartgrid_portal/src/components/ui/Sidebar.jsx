import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Sidebar = ({ isOpen = false, onClose }) => {
  const [expandedSections, setExpandedSections] = useState({
    analytics: false,
    management: false,
  });
  const location = useLocation();

  const navigationSections = [
    {
      title: 'Overview',
      items: [
        { name: 'Smart Dashboard', path: '/smart-dashboard-homepage', icon: 'LayoutDashboard', description: 'Real-time energy overview' },
      ]
    },
    {
      title: 'Analytics & Insights',
      key: 'analytics',
      items: [
        { name: 'Consumption Analytics', path: '/consumption-analytics-center', icon: 'BarChart3', description: 'Detailed usage patterns' },
        { name: 'Energy Insights', path: '/energy-insights-hub', icon: 'Lightbulb', description: 'AI-powered recommendations' },
      ]
    },
    {
      title: 'Management',
      key: 'management',
      items: [
        { name: 'Bill Management', path: '/bill-management-suite', icon: 'Receipt', description: 'Bills and statements' },
        { name: 'Payment Gateway', path: '/payment-gateway', icon: 'CreditCard', description: 'Secure payments' },
        { name: 'Account Settings', path: '/account-settings-hub', icon: 'Settings', description: 'Profile and preferences' },
      ]
    }
  ];

  const quickActions = [
    { name: 'Pay Bill', icon: 'CreditCard', color: 'text-success', bgColor: 'bg-success/10' },
    { name: 'View Usage', icon: 'Activity', color: 'text-primary', bgColor: 'bg-primary/10' },
    { name: 'Set Budget', icon: 'Target', color: 'text-warning', bgColor: 'bg-warning/10' },
    { name: 'Get Support', icon: 'HelpCircle', color: 'text-trust', bgColor: 'bg-trust/10' },
  ];

  const isActivePath = (path) => location?.pathname === path;

  const handleNavigation = (path) => {
    window.location.href = path;
    if (onClose) onClose();
  };

  const toggleSection = (key) => {
    setExpandedSections(prev => ({
      ...prev,
      [key]: !prev?.[key]
    }));
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      {/* Sidebar */}
      <aside className={`
        fixed top-16 left-0 bottom-0 w-80 bg-card border-r border-border z-50
        transform transition-transform duration-300 ease-energy
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:fixed
        scrollbar-thin overflow-y-auto
      `}>
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-text-primary">Navigation</h2>
                <p className="text-sm text-text-secondary">Manage your energy efficiently</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={onClose}
              >
                <Icon name="X" size={20} />
              </Button>
            </div>
          </div>

          {/* Current Status Card */}
          <div className="p-6 border-b border-border">
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className="status-dot online"></div>
                  <span className="text-sm font-medium text-text-primary">System Online</span>
                </div>
                <Icon name="Wifi" size={16} color="var(--color-success)" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-text-secondary">Current Usage</div>
                  <div className="text-lg font-mono font-semibold text-primary">2.4 kW</div>
                </div>
                <div>
                  <div className="text-xs text-text-secondary">Today's Cost</div>
                  <div className="text-lg font-mono font-semibold text-secondary">₹48.60</div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Sections */}
          <div className="flex-1 p-6 space-y-6">
            {navigationSections?.map((section) => (
              <div key={section?.title}>
                {section?.key ? (
                  <button
                    onClick={() => toggleSection(section?.key)}
                    className="flex items-center justify-between w-full mb-3 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
                  >
                    <span className="uppercase tracking-wide">{section?.title}</span>
                    <Icon 
                      name="ChevronDown" 
                      size={14} 
                      className={`transform transition-transform ${
                        expandedSections?.[section?.key] ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                ) : (
                  <h3 className="mb-3 text-sm font-medium text-text-secondary uppercase tracking-wide">
                    {section?.title}
                  </h3>
                )}
                
                <div className={`space-y-1 ${
                  section?.key && !expandedSections?.[section?.key] ? 'hidden' : ''
                }`}>
                  {section?.items?.map((item) => (
                    <button
                      key={item?.path}
                      onClick={() => handleNavigation(item?.path)}
                      className={`
                        w-full flex items-center p-3 rounded-lg transition-all duration-200
                        hover-lift group
                        ${isActivePath(item?.path) 
                          ? 'bg-primary text-primary-foreground shadow-energy-md' 
                          : 'hover:bg-muted text-text-secondary hover:text-text-primary'
                        }
                      `}
                    >
                      <div className={`
                        flex items-center justify-center w-10 h-10 rounded-lg mr-3
                        ${isActivePath(item?.path) 
                          ? 'bg-white/20' :'bg-muted group-hover:bg-primary/10'
                        }
                      `}>
                        <Icon 
                          name={item?.icon} 
                          size={18} 
                          color={isActivePath(item?.path) ? 'currentColor' : 'var(--color-primary)'}
                        />
                      </div>
                      <div className="flex-1 text-left">
                        <div className="font-medium">{item?.name}</div>
                        <div className={`text-xs ${
                          isActivePath(item?.path) 
                            ? 'text-primary-foreground/80' 
                            : 'text-text-secondary'
                        }`}>
                          {item?.description}
                        </div>
                      </div>
                      {isActivePath(item?.path) && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="p-6 border-t border-border">
            <h3 className="mb-4 text-sm font-medium text-text-secondary uppercase tracking-wide">
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {quickActions?.map((action) => (
                <button
                  key={action?.name}
                  className="flex flex-col items-center p-3 rounded-lg hover:bg-muted transition-colors group"
                >
                  <div className={`
                    flex items-center justify-center w-10 h-10 rounded-lg mb-2
                    ${action?.bgColor} group-hover:scale-105 transition-transform
                  `}>
                    <Icon name={action?.icon} size={18} className={action?.color} />
                  </div>
                  <span className="text-xs font-medium text-text-primary">{action?.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-border">
            <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
              <div className="w-8 h-8 bg-gradient-to-br from-trust to-primary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="white" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-text-primary">John Doe</div>
                <div className="text-xs text-success">Premium Plan</div>
              </div>
              <Button variant="ghost" size="icon">
                <Icon name="MoreVertical" size={16} />
              </Button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;