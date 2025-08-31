import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import RealTimeMetrics from './components/RealTimeMetrics';
import BillStatusCard from './components/BillStatusCard';
import ConsumptionChart from './components/ConsumptionChart';
import SmartRecommendations from './components/SmartRecommendations';
import QuickActions from './components/QuickActions';
import NeighborhoodComparison from './components/NeighborhoodComparison';
import Icon from '../../components/AppIcon';

const SmartDashboardHomepage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  const formatTime = (date) => {
    return date?.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date) => {
    return date?.toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header 
        onToggleSidebar={handleToggleSidebar}
      />
      {/* Sidebar */}
      <Sidebar 
        isOpen={isSidebarOpen}
        onClose={handleCloseSidebar}
      />
      {/* Main Content */}
      <main className="pt-16 lg:pl-80">
        <div className="p-6 max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-text-primary mb-2">
                  Good {currentTime?.getHours() < 12 ? 'Morning' : currentTime?.getHours() < 17 ? 'Afternoon' : 'Evening'}, John! 👋
                </h1>
                <p className="text-text-secondary">
                  Welcome to your Smart Energy Dashboard - {formatDate(currentTime)}
                </p>
              </div>
              <div className="hidden md:flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-sm text-text-secondary">Current Time</div>
                  <div className="text-lg font-mono font-semibold text-primary">
                    {formatTime(currentTime)}
                  </div>
                </div>
                <div className="flex items-center space-x-2 px-3 py-2 bg-success/10 rounded-lg">
                  <div className="status-dot online"></div>
                  <span className="text-sm font-medium text-success">System Online</span>
                </div>
              </div>
            </div>

            {/* Quick Stats Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-card border border-border rounded-lg p-4 text-center">
                <Icon name="Zap" size={20} color="var(--color-primary)" className="mx-auto mb-2" />
                <div className="text-lg font-mono font-bold text-primary">2.4 kW</div>
                <div className="text-xs text-text-secondary">Live Usage</div>
              </div>
              <div className="bg-card border border-border rounded-lg p-4 text-center">
                <Icon name="IndianRupee" size={20} color="var(--color-secondary)" className="mx-auto mb-2" />
                <div className="text-lg font-mono font-bold text-secondary">₹48.60</div>
                <div className="text-xs text-text-secondary">Today's Cost</div>
              </div>
              <div className="bg-card border border-border rounded-lg p-4 text-center">
                <Icon name="TrendingDown" size={20} color="var(--color-success)" className="mx-auto mb-2" />
                <div className="text-lg font-mono font-bold text-success">-12%</div>
                <div className="text-xs text-text-secondary">vs Yesterday</div>
              </div>
              <div className="bg-card border border-border rounded-lg p-4 text-center">
                <Icon name="Target" size={20} color="var(--color-trust)" className="mx-auto mb-2" />
                <div className="text-lg font-mono font-bold text-trust">87%</div>
                <div className="text-xs text-text-secondary">Efficiency</div>
              </div>
            </div>
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
            {/* Left Column - Primary Metrics */}
            <div className="xl:col-span-2 space-y-6">
              {/* Real-time Metrics */}
              <RealTimeMetrics />
              
              {/* Consumption Chart */}
              <ConsumptionChart />
              
              {/* Smart Recommendations */}
              <SmartRecommendations />
            </div>

            {/* Right Column - Secondary Info */}
            <div className="space-y-6">
              {/* Bill Status */}
              <BillStatusCard />
              
              {/* Quick Actions */}
              <QuickActions />
            </div>
          </div>

          {/* Bottom Section - Community Features */}
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
            <NeighborhoodComparison />
          </div>

          {/* Footer Info */}
          <div className="mt-8 pt-6 border-t border-border">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4 text-sm text-text-secondary">
                <div className="flex items-center space-x-2">
                  <Icon name="Shield" size={16} />
                  <span>Data secured with 256-bit encryption</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Clock" size={16} />
                  <span>Last updated: {formatTime(currentTime)}</span>
                </div>
              </div>
              <div className="text-sm text-text-secondary">
                © {new Date()?.getFullYear()} SmartGrid Portal. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SmartDashboardHomepage;