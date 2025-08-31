import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = ({ isCollapsed = false, onToggleSidebar }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const location = useLocation();

  const primaryNavItems = [
    { name: 'Dashboard', path: '/smart-dashboard-homepage', icon: 'LayoutDashboard' },
    { name: 'Analytics', path: '/consumption-analytics-center', icon: 'BarChart3' },
    { name: 'Bills', path: '/bill-management-suite', icon: 'Receipt' },
    { name: 'Payments', path: '/payment-gateway', icon: 'CreditCard' },
  ];

  const secondaryNavItems = [
    { name: 'Insights', path: '/energy-insights-hub', icon: 'Lightbulb' },
    { name: 'Settings', path: '/account-settings-hub', icon: 'Settings' },
  ];

  const isActivePath = (path) => location?.pathname === path;

  const handleNavigation = (path) => {
    window.location.href = path;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Left Section - Logo and Navigation */}
        <div className="flex items-center space-x-8">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Icon name="Zap" size={18} color="white" strokeWidth={2.5} />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-success rounded-full animate-pulse-soft"></div>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-text-primary">SmartGrid</h1>
              <p className="text-xs text-text-secondary -mt-1">Portal</p>
            </div>
          </div>

          {/* Primary Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {primaryNavItems?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`nav-link ${isActivePath(item?.path) ? 'active' : ''}`}
              >
                <Icon name={item?.icon} size={16} className="mr-2" />
                {item?.name}
              </button>
            ))}
            
            {/* More Menu */}
            <div className="relative">
              <button
                onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
                className="nav-link"
              >
                <Icon name="MoreHorizontal" size={16} className="mr-2" />
                More
                <Icon name="ChevronDown" size={14} className="ml-1" />
              </button>
              
              {isMoreMenuOpen && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-popover border border-border rounded-md shadow-energy-lg z-60">
                  <div className="py-1">
                    {secondaryNavItems?.map((item) => (
                      <button
                        key={item?.path}
                        onClick={() => {
                          handleNavigation(item?.path);
                          setIsMoreMenuOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-muted flex items-center ${
                          isActivePath(item?.path) ? 'bg-primary/10 text-primary' : 'text-text-secondary'
                        }`}
                      >
                        <Icon name={item?.icon} size={16} className="mr-3" />
                        {item?.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>
        </div>

        {/* Right Section - Actions and Profile */}
        <div className="flex items-center space-x-4">
          {/* Real-time Status */}
          <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 bg-success/10 rounded-full">
            <div className="status-dot online"></div>
            <span className="text-xs font-medium text-success">Live Data</span>
          </div>

          {/* Current Usage */}
          <div className="hidden lg:flex items-center space-x-2 px-3 py-1.5 bg-card border rounded-lg">
            <Icon name="Activity" size={16} color="var(--color-primary)" />
            <div className="text-right">
              <div className="text-xs text-text-secondary">Current</div>
              <div className="text-sm font-mono font-semibold text-primary">2.4 kW</div>
            </div>
          </div>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Icon name="Bell" size={18} />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full"></div>
          </Button>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onToggleSidebar}
          >
            <Icon name="Menu" size={20} />
          </Button>

          {/* Profile Menu */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-2 p-1.5 rounded-lg hover:bg-muted transition-colors"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-trust to-primary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="white" />
              </div>
              <div className="hidden md:block text-left">
                <div className="text-sm font-medium text-text-primary">John Doe</div>
                <div className="text-xs text-text-secondary">Premium Plan</div>
              </div>
              <Icon name="ChevronDown" size={14} className="hidden md:block text-text-secondary" />
            </button>

            {isProfileOpen && (
              <div className="absolute top-full right-0 mt-1 w-56 bg-popover border border-border rounded-md shadow-energy-lg z-60">
                <div className="p-3 border-b border-border">
                  <div className="font-medium text-text-primary">John Doe</div>
                  <div className="text-sm text-text-secondary">john.doe@email.com</div>
                  <div className="text-xs text-success mt-1">Premium Plan • Active</div>
                </div>
                <div className="py-1">
                  <button
                    onClick={() => {
                      handleNavigation('/account-settings-hub');
                      setIsProfileOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-muted flex items-center"
                  >
                    <Icon name="Settings" size={16} className="mr-3" />
                    Account Settings
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm hover:bg-muted flex items-center">
                    <Icon name="HelpCircle" size={16} className="mr-3" />
                    Help & Support
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm hover:bg-muted flex items-center">
                    <Icon name="FileText" size={16} className="mr-3" />
                    Usage Reports
                  </button>
                  <div className="border-t border-border my-1"></div>
                  <button className="w-full text-left px-4 py-2 text-sm hover:bg-muted flex items-center text-error">
                    <Icon name="LogOut" size={16} className="mr-3" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Mobile Navigation Overlay */}
      {isMoreMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMoreMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;