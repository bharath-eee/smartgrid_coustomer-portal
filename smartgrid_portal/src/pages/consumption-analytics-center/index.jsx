import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// Import all components
import TimelineSelector from './components/TimelineSelector';
import ConsumptionChart from './components/ConsumptionChart';
import EfficiencyScoring from './components/EfficiencyScoring';
import ApplianceBreakdown from './components/ApplianceBreakdown';
import PredictiveAnalytics from './components/PredictiveAnalytics';
import SeasonalComparison from './components/SeasonalComparison';
import NeighborhoodComparison from './components/NeighborhoodComparison';
import AdvancedFilters from './components/AdvancedFilters';

const ConsumptionAnalyticsCenter = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('daily');
  const [appliedFilters, setAppliedFilters] = useState({
    dateRange: 'last30days',
    appliances: [],
    timeOfDay: [],
    consumptionLevel: 'all',
    costRange: 'all',
    weatherCondition: 'all'
  });

  // Mock data for consumption chart
  const consumptionData = [
    { time: '00:00', consumption: 2.1, predicted: 2.3 },
    { time: '02:00', consumption: 1.8, predicted: 1.9 },
    { time: '04:00', consumption: 1.5, predicted: 1.6 },
    { time: '06:00', consumption: 3.2, predicted: 3.1 },
    { time: '08:00', consumption: 4.5, predicted: 4.3 },
    { time: '10:00', consumption: 3.8, predicted: 3.9 },
    { time: '12:00', consumption: 5.2, predicted: 5.1 },
    { time: '14:00', consumption: 6.8, predicted: 6.5 },
    { time: '16:00', consumption: 7.2, predicted: 7.0 },
    { time: '18:00', consumption: 8.5, predicted: 8.3 },
    { time: '20:00', consumption: 6.3, predicted: 6.5 },
    { time: '22:00', consumption: 4.1, predicted: 4.2 }
  ];

  // Mock data for appliance breakdown
  const applianceData = [
    { 
      name: 'Air Conditioner', 
      consumption: 180, 
      cost: 1440, 
      percentage: 45, 
      efficiency: 72 
    },
    { 
      name: 'Refrigerator', 
      consumption: 80, 
      cost: 640, 
      percentage: 20, 
      efficiency: 85 
    },
    { 
      name: 'Water Heater', 
      consumption: 60, 
      cost: 480, 
      percentage: 15, 
      efficiency: 68 
    },
    { 
      name: 'Lighting', 
      consumption: 40, 
      cost: 320, 
      percentage: 10, 
      efficiency: 90 
    },
    { 
      name: 'Television', 
      consumption: 24, 
      cost: 192, 
      percentage: 6, 
      efficiency: 78 
    },
    { 
      name: 'Others', 
      consumption: 16, 
      cost: 128, 
      percentage: 4, 
      efficiency: 65 
    }
  ];

  // Mock data for appliance recommendations
  const applianceRecommendations = [
    {
      title: "Optimize AC Temperature",
      description: "Set AC to 24°C instead of 22°C during peak hours",
      savings: 450,
      priority: "high",
      icon: "Thermometer"
    },
    {
      title: "Replace Old Water Heater",
      description: "Upgrade to energy-efficient model with better insulation",
      savings: 280,
      priority: "medium",
      icon: "Droplets"
    },
    {
      title: "Switch to LED Lighting",
      description: "Replace remaining CFL bulbs with LED alternatives",
      savings: 120,
      priority: "low",
      icon: "Lightbulb"
    },
    {
      title: "Smart Power Strips",
      description: "Use smart strips to eliminate standby power consumption",
      savings: 180,
      priority: "medium",
      icon: "Zap"
    }
  ];

  // Mock data for efficiency scoring
  const achievements = [
    { name: "Energy Saver", icon: "Award" },
    { name: "Peak Optimizer", icon: "Target" },
    { name: "Green Champion", icon: "Leaf" }
  ];

  // Mock data for predictive analytics
  const projectionData = [
    { month: 'Jan', historical: 2400, projected: null, optimized: null },
    { month: 'Feb', historical: 2200, projected: null, optimized: null },
    { month: 'Mar', historical: 2800, projected: null, optimized: null },
    { month: 'Apr', historical: 3200, projected: null, optimized: null },
    { month: 'May', historical: 3800, projected: null, optimized: null },
    { month: 'Current', historical: 2600, projected: 2600, optimized: 2600 },
    { month: 'Jul', historical: null, projected: 4200, optimized: 3600 },
    { month: 'Aug', historical: null, projected: 4500, optimized: 3800 },
    { month: 'Sep', historical: null, projected: 3800, optimized: 3200 },
    { month: 'Oct', historical: null, projected: 3200, optimized: 2800 },
    { month: 'Nov', historical: null, projected: 2800, optimized: 2400 },
    { month: 'Dec', historical: null, projected: 2600, optimized: 2200 }
  ];

  const scenarios = [
    {
      id: 'current',
      name: 'Current Usage Pattern',
      description: 'Based on your current consumption habits and appliance usage patterns',
      projectedCost: 3240,
      projectedUsage: 405,
      potentialSavings: 0,
      impact: 'neutral',
      costChange: 0,
      usageChange: 0,
      confidence: 85,
      assumptions: [
        'No changes to current appliance usage',
        'Same temperature preferences',
        'Current occupancy patterns'
      ]
    },
    {
      id: 'optimized',
      name: 'With Optimizations',
      description: 'Implementing recommended energy-saving measures and behavioral changes',
      projectedCost: 2590,
      projectedUsage: 324,
      potentialSavings: 650,
      impact: 'positive',
      costChange: -650,
      usageChange: -81,
      confidence: 78,
      assumptions: [
        'AC temperature set to 24°C',
        'LED lighting upgrade completed',
        'Smart power strips installed'
      ]
    },
    {
      id: 'increased',
      name: 'Increased Usage',
      description: 'Scenario with additional appliances or increased usage during summer',
      projectedCost: 4320,
      projectedUsage: 540,
      potentialSavings: 0,
      impact: 'negative',
      costChange: 1080,
      usageChange: 135,
      confidence: 72,
      assumptions: [
        'Additional AC unit installed',
        'Extended usage hours',
        'Higher temperature days'
      ]
    }
  ];

  // Mock data for seasonal comparison
  const seasonalData = [
    { 
      season: 'Spring', 
      consumption: 280, 
      lastYear: 295, 
      cost: 2240, 
      change: -5.1, 
      current: false 
    },
    { 
      season: 'Summer', 
      consumption: 420, 
      lastYear: 385, 
      cost: 3360, 
      change: 9.1, 
      current: true 
    },
    { 
      season: 'Monsoon', 
      consumption: 320, 
      lastYear: 340, 
      cost: 2560, 
      change: -5.9, 
      current: false 
    },
    { 
      season: 'Winter', 
      consumption: 240, 
      lastYear: 260, 
      cost: 1920, 
      change: -7.7, 
      current: false 
    }
  ];

  const yearlyTrends = [
    { month: 'Jan', '2024': 240, '2023': 260 },
    { month: 'Feb', '2024': 220, '2023': 245 },
    { month: 'Mar', '2024': 280, '2023': 295 },
    { month: 'Apr', '2024': 350, '2023': 320 },
    { month: 'May', '2024': 420, '2023': 385 },
    { month: 'Jun', '2024': 450, '2023': 410 },
    { month: 'Jul', '2024': 380, '2023': 395 },
    { month: 'Aug', '2024': 360, '2023': 375 },
    { month: 'Sep', '2024': 320, '2023': 340 },
    { month: 'Oct', '2024': 280, '2023': 300 },
    { month: 'Nov', '2024': 250, '2023': 275 },
    { month: 'Dec', '2024': 240, '2023': 260 }
  ];

  // Mock data for neighborhood comparison
  const comparisonData = [
    { category: 'Your Home', you: 400, neighborhood: 450, efficient: 320 },
    { category: 'Similar Size', you: 400, neighborhood: 420, efficient: 340 },
    { category: 'Same Area', you: 400, neighborhood: 480, efficient: 360 },
    { category: 'AC Homes', you: 400, neighborhood: 520, efficient: 380 }
  ];

  const rankings = [
    { id: 1, rank: 1, consumption: 280, monthlyCost: 2240, householdSize: 3, homeType: 'Apartment', isUser: false },
    { id: 2, rank: 2, consumption: 295, monthlyCost: 2360, householdSize: 2, homeType: 'Apartment', isUser: false },
    { id: 3, rank: 3, consumption: 320, monthlyCost: 2560, householdSize: 4, homeType: 'House', isUser: false },
    { id: 4, rank: 4, consumption: 340, monthlyCost: 2720, householdSize: 3, homeType: 'Apartment', isUser: false },
    { id: 5, rank: 5, consumption: 400, monthlyCost: 3200, householdSize: 4, homeType: 'House', isUser: true },
    { id: 6, rank: 6, consumption: 420, monthlyCost: 3360, householdSize: 5, homeType: 'House', isUser: false },
    { id: 7, rank: 7, consumption: 450, monthlyCost: 3600, householdSize: 4, homeType: 'House', isUser: false },
    { id: 8, rank: 8, consumption: 480, monthlyCost: 3840, householdSize: 6, homeType: 'House', isUser: false },
    { id: 9, rank: 9, consumption: 520, monthlyCost: 4160, householdSize: 5, homeType: 'House', isUser: false },
    { id: 10, rank: 10, consumption: 580, monthlyCost: 4640, householdSize: 7, homeType: 'House', isUser: false }
  ];

  const neighborhoodInsights = [
    {
      type: 'positive',
      icon: 'TrendingDown',
      title: 'Below Average Usage',
      description: 'Your consumption is 11% lower than similar households',
      action: 'Keep up the good work!'
    },
    {
      type: 'warning',
      icon: 'Thermometer',
      title: 'AC Usage Peak',
      description: '78% of neighbors optimize AC settings during peak hours',
      action: 'Consider adjusting AC temperature by 2°C'
    },
    {
      type: 'info',
      icon: 'Users',
      title: 'Community Challenge',
      description: 'Join the summer energy saving challenge with 45 neighbors',
      action: 'Participate to win rewards'
    }
  ];

  const getDateRange = () => {
    const today = new Date();
    if (selectedPeriod === 'daily') {
      return today?.toLocaleDateString('en-IN', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
      });
    } else if (selectedPeriod === 'weekly') {
      const weekStart = new Date(today.setDate(today.getDate() - today.getDay()));
      const weekEnd = new Date(today.setDate(today.getDate() - today.getDay() + 6));
      return `${weekStart?.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} - ${weekEnd?.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}`;
    } else {
      return today?.toLocaleDateString('en-IN', { 
        month: 'long', 
        year: 'numeric' 
      });
    }
  };

  const handleFiltersChange = (newFilters) => {
    setAppliedFilters(newFilters);
    // In a real app, this would trigger data refetch with new filters
    console.log('Filters applied:', newFilters);
  };

  useEffect(() => {
    document.title = 'Consumption Analytics Center - SmartGrid Portal';
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />
      
      <Sidebar 
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="lg:ml-80 pt-16">
        <div className="p-6 max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Icon name="BarChart3" size={20} color="white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-text-primary">Consumption Analytics Center</h1>
                <p className="text-text-secondary">Transform your energy data into actionable insights</p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-card rounded-lg border p-4">
                <div className="flex items-center justify-between mb-2">
                  <Icon name="Zap" size={20} color="var(--color-primary)" />
                  <span className="text-xs text-success font-medium">LIVE</span>
                </div>
                <div className="text-2xl font-bold text-primary">2.4 kW</div>
                <div className="text-sm text-text-secondary">Current Usage</div>
              </div>
              
              <div className="bg-card rounded-lg border p-4">
                <div className="flex items-center justify-between mb-2">
                  <Icon name="Calendar" size={20} color="var(--color-secondary)" />
                  <span className="text-xs text-text-secondary">TODAY</span>
                </div>
                <div className="text-2xl font-bold text-secondary">18.6 kWh</div>
                <div className="text-sm text-text-secondary">Daily Total</div>
              </div>
              
              <div className="bg-card rounded-lg border p-4">
                <div className="flex items-center justify-between mb-2">
                  <Icon name="TrendingDown" size={20} color="var(--color-success)" />
                  <span className="text-xs text-success font-medium">IMPROVED</span>
                </div>
                <div className="text-2xl font-bold text-success">-12%</div>
                <div className="text-sm text-text-secondary">vs Last Month</div>
              </div>
              
              <div className="bg-card rounded-lg border p-4">
                <div className="flex items-center justify-between mb-2">
                  <Icon name="Award" size={20} color="var(--color-warning)" />
                  <span className="text-xs text-warning font-medium">RANK</span>
                </div>
                <div className="text-2xl font-bold text-warning">#5</div>
                <div className="text-sm text-text-secondary">in Neighborhood</div>
              </div>
            </div>
          </div>

          {/* Advanced Filters */}
          <AdvancedFilters 
            onFiltersChange={handleFiltersChange}
            appliedFilters={appliedFilters}
          />

          {/* Timeline Selector */}
          <TimelineSelector
            selectedPeriod={selectedPeriod}
            onPeriodChange={setSelectedPeriod}
            dateRange={getDateRange()}
            onDateRangeChange={handleFiltersChange}
          />

          {/* Main Analytics Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
            {/* Consumption Chart - Takes 2 columns */}
            <div className="xl:col-span-2">
              <ConsumptionChart
                data={consumptionData}
                selectedPeriod={selectedPeriod}
                chartType="area"
              />
            </div>

            {/* Efficiency Scoring */}
            <div className="xl:col-span-1">
              <EfficiencyScoring
                userScore={76}
                neighborhoodAverage={68}
                achievements={achievements}
              />
            </div>
          </div>

          {/* Appliance Breakdown */}
          <div className="mb-8">
            <ApplianceBreakdown
              applianceData={applianceData}
              recommendations={applianceRecommendations}
            />
          </div>

          {/* Predictive Analytics */}
          <div className="mb-8">
            <PredictiveAnalytics
              projectionData={projectionData}
              scenarios={scenarios}
            />
          </div>

          {/* Seasonal and Neighborhood Comparison */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
            <SeasonalComparison
              seasonalData={seasonalData}
              yearlyTrends={yearlyTrends}
            />
            
            <NeighborhoodComparison
              comparisonData={comparisonData}
              rankings={rankings}
              insights={neighborhoodInsights}
            />
          </div>

          {/* Action Center */}
          <div className="bg-card rounded-lg border p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-text-primary">Take Action</h3>
                <p className="text-sm text-text-secondary">Based on your analytics, here are recommended next steps</p>
              </div>
              <Icon name="Target" size={24} color="var(--color-primary)" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button 
                variant="default" 
                iconName="Settings" 
                iconPosition="left"
                className="h-auto p-4 flex-col items-start text-left"
              >
                <div className="font-medium mb-1">Optimize Settings</div>
                <div className="text-xs opacity-80">Adjust appliance settings for better efficiency</div>
              </Button>
              
              <Button 
                variant="outline" 
                iconName="Bell" 
                iconPosition="left"
                className="h-auto p-4 flex-col items-start text-left"
              >
                <div className="font-medium mb-1">Set Alerts</div>
                <div className="text-xs opacity-80">Get notified when usage exceeds targets</div>
              </Button>
              
              <Button 
                variant="secondary" 
                iconName="Download" 
                iconPosition="left"
                className="h-auto p-4 flex-col items-start text-left"
              >
                <div className="font-medium mb-1">Export Report</div>
                <div className="text-xs opacity-80">Download detailed analytics report</div>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ConsumptionAnalyticsCenter;