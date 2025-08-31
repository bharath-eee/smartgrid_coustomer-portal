import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// Import all components
import SeasonalTipsCard from './components/SeasonalTipsCard';
import ApplianceCalculator from './components/ApplianceCalculator';
import CarbonFootprintTracker from './components/CarbonFootprintTracker';
import SuccessStoriesSection from './components/SuccessStoriesSection';
import EducationalContentHub from './components/EducationalContentHub';
import InteractiveToolsSection from './components/InteractiveToolsSection';

const EnergyInsightsHub = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');

  const navigationSections = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'seasonal', label: 'Seasonal Tips', icon: 'Calendar' },
    { id: 'calculator', label: 'Cost Calculator', icon: 'Calculator' },
    { id: 'carbon', label: 'Carbon Tracker', icon: 'Leaf' },
    { id: 'tools', label: 'Interactive Tools', icon: 'Wrench' },
    { id: 'education', label: 'Learning Hub', icon: 'BookOpen' },
    { id: 'stories', label: 'Success Stories', icon: 'Award' }
  ];

  const quickStats = [
    {
      label: 'Your Efficiency Score',
      value: '78',
      unit: '/100',
      change: '+12',
      changeType: 'positive',
      icon: 'Award',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      label: 'Potential Monthly Savings',
      value: '₹1,240',
      unit: '',
      change: '+₹180',
      changeType: 'positive',
      icon: 'TrendingDown',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      label: 'Carbon Footprint',
      value: '245.6',
      unit: 'kg CO₂',
      change: '-18.2',
      changeType: 'positive',
      icon: 'Leaf',
      color: 'text-trust',
      bgColor: 'bg-trust/10'
    },
    {
      label: 'Learning Progress',
      value: '12',
      unit: '/20 articles',
      change: '+3',
      changeType: 'positive',
      icon: 'BookOpen',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    }
  ];

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'seasonal':
        return <SeasonalTipsCard />;
      case 'calculator':
        return <ApplianceCalculator />;
      case 'carbon':
        return <CarbonFootprintTracker />;
      case 'tools':
        return <InteractiveToolsSection />;
      case 'education':
        return <EducationalContentHub />;
      case 'stories':
        return <SuccessStoriesSection />;
      default:
        return (
          <div className="space-y-8">
            {/* Quick Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickStats?.map((stat, index) => (
                <div key={index} className="energy-card">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 ${stat?.bgColor} rounded-xl flex items-center justify-center`}>
                      <Icon name={stat?.icon} size={24} className={stat?.color} />
                    </div>
                    <div className={`flex items-center space-x-1 text-sm ${
                      stat?.changeType === 'positive' ? 'text-success' : 'text-error'
                    }`}>
                      <Icon 
                        name={stat?.changeType === 'positive' ? 'TrendingUp' : 'TrendingDown'} 
                        size={14} 
                      />
                      <span>{stat?.change}</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-2xl font-mono font-semibold text-text-primary">
                      {stat?.value}
                      <span className="text-sm font-normal text-text-secondary ml-1">{stat?.unit}</span>
                    </div>
                    <div className="text-sm text-text-secondary">{stat?.label}</div>
                  </div>
                </div>
              ))}
            </div>
            {/* Featured Sections */}
            <div className="grid lg:grid-cols-2 gap-8">
              <SeasonalTipsCard />
              <ApplianceCalculator />
            </div>
            <CarbonFootprintTracker />
            <div className="grid lg:grid-cols-2 gap-8">
              <EducationalContentHub />
              <InteractiveToolsSection />
            </div>
            <SuccessStoriesSection />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <Sidebar 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      <main className="pt-16 lg:pl-80">
        <div className="p-6">
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-trust to-primary rounded-xl flex items-center justify-center">
                  <Icon name="Lightbulb" size={24} color="white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-text-primary">Energy Insights Hub</h1>
                  <p className="text-text-secondary">
                    Transform complex energy concepts into actionable knowledge
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="hidden md:flex items-center space-x-2 px-4 py-2 bg-success/10 rounded-lg">
                <div className="status-dot online"></div>
                <span className="text-sm font-medium text-success">Learning Mode Active</span>
              </div>
              <Button variant="outline" iconName="Download">
                Export Insights
              </Button>
              <Button variant="default" iconName="Share">
                Share Progress
              </Button>
            </div>
          </div>

          {/* Section Navigation */}
          <div className="flex flex-wrap gap-2 mb-8 p-1 bg-muted rounded-lg">
            {navigationSections?.map((section) => (
              <button
                key={section?.id}
                onClick={() => setActiveSection(section?.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeSection === section?.id
                    ? 'bg-background text-text-primary shadow-sm'
                    : 'text-text-secondary hover:text-text-primary hover:bg-background/50'
                }`}
              >
                <Icon name={section?.icon} size={16} />
                <span>{section?.label}</span>
              </button>
            ))}
          </div>

          {/* Dynamic Content */}
          <div className="animate-reveal">
            {renderActiveSection()}
          </div>

          {/* Bottom CTA Section */}
          <div className="mt-12 p-8 bg-gradient-to-r from-primary/10 via-secondary/10 to-trust/10 rounded-xl text-center">
            <div className="max-w-2xl mx-auto">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Zap" size={32} color="white" />
              </div>
              <h2 className="text-2xl font-bold text-text-primary mb-4">
                Ready to Optimize Your Energy Usage?
              </h2>
              <p className="text-text-secondary mb-6">
                Apply these insights to your daily routine and start seeing immediate results in your energy bills. 
                Our personalized recommendations are based on your actual consumption patterns.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="default" iconName="Target" className="px-8">
                  Set Energy Goals
                </Button>
                <Button variant="outline" iconName="Calendar" className="px-8">
                  Schedule Consultation
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EnergyInsightsHub;