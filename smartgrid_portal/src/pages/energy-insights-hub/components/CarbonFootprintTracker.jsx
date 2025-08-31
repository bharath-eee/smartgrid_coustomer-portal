import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CarbonFootprintTracker = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const carbonData = {
    month: {
      totalEmissions: 245.6,
      reduction: 18.2,
      comparison: {
        average: 298.4,
        efficient: 180.2
      },
      breakdown: [
        { category: 'Air Conditioning', emissions: 89.4, percentage: 36.4, icon: 'Wind', color: 'text-blue-600' },
        { category: 'Water Heating', emissions: 52.8, percentage: 21.5, icon: 'Droplets', color: 'text-orange-600' },
        { category: 'Lighting', emissions: 38.2, percentage: 15.6, icon: 'Lightbulb', color: 'text-yellow-600' },
        { category: 'Refrigeration', emissions: 34.7, percentage: 14.1, icon: 'Refrigerator', color: 'text-cyan-600' },
        { category: 'Electronics', emissions: 30.5, percentage: 12.4, icon: 'Monitor', color: 'text-purple-600' }
      ]
    },
    year: {
      totalEmissions: 2847.2,
      reduction: 312.8,
      comparison: {
        average: 3580.8,
        efficient: 2162.4
      },
      breakdown: [
        { category: 'Air Conditioning', emissions: 1072.8, percentage: 37.7, icon: 'Wind', color: 'text-blue-600' },
        { category: 'Water Heating', emissions: 633.6, percentage: 22.3, icon: 'Droplets', color: 'text-orange-600' },
        { category: 'Lighting', emissions: 458.4, percentage: 16.1, icon: 'Lightbulb', color: 'text-yellow-600' },
        { category: 'Refrigeration', emissions: 416.4, percentage: 14.6, icon: 'Refrigerator', color: 'text-cyan-600' },
        { category: 'Electronics', emissions: 266.0, percentage: 9.3, icon: 'Monitor', color: 'text-purple-600' }
      ]
    }
  };

  const currentData = carbonData?.[selectedPeriod];
  const reductionPercentage = ((currentData?.reduction / (currentData?.totalEmissions + currentData?.reduction)) * 100)?.toFixed(1);

  const equivalencies = [
    {
      icon: 'Car',
      title: 'Car Miles Avoided',
      value: Math.round(currentData?.totalEmissions * 2.31),
      unit: 'miles',
      description: 'Equivalent driving distance saved'
    },
    {
      icon: 'Trees',
      title: 'Trees Planted',
      value: Math.round(currentData?.totalEmissions / 21.77),
      unit: 'trees',
      description: 'Carbon absorption equivalent'
    },
    {
      icon: 'Home',
      title: 'Homes Powered',
      value: (currentData?.totalEmissions / 6765)?.toFixed(2),
      unit: 'homes/day',
      description: 'Average home energy for one day'
    }
  ];

  return (
    <div className="energy-card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center">
            <Icon name="Leaf" size={24} className="text-success" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-text-primary">Carbon Footprint Tracker</h2>
            <p className="text-sm text-text-secondary">Monitor your environmental impact</p>
          </div>
        </div>
        
        <div className="flex bg-muted rounded-lg p-1">
          <button
            onClick={() => setSelectedPeriod('month')}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
              selectedPeriod === 'month' ?'bg-background text-text-primary shadow-sm' :'text-text-secondary hover:text-text-primary'
            }`}
          >
            This Month
          </button>
          <button
            onClick={() => setSelectedPeriod('year')}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
              selectedPeriod === 'year' ?'bg-background text-text-primary shadow-sm' :'text-text-secondary hover:text-text-primary'
            }`}
          >
            This Year
          </button>
        </div>
      </div>
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Metrics */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-gradient-to-br from-success/10 to-success/5 rounded-lg border border-success/20">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Leaf" size={16} className="text-success" />
                <span className="text-sm font-medium text-text-primary">Total Emissions</span>
              </div>
              <div className="text-2xl font-mono font-semibold text-success">
                {currentData?.totalEmissions?.toLocaleString()}
              </div>
              <div className="text-xs text-text-secondary">kg CO₂ {selectedPeriod === 'month' ? '/month' : '/year'}</div>
            </div>

            <div className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg border border-primary/20">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="TrendingDown" size={16} className="text-primary" />
                <span className="text-sm font-medium text-text-primary">Reduction</span>
              </div>
              <div className="text-2xl font-mono font-semibold text-primary">
                {currentData?.reduction?.toLocaleString()}
              </div>
              <div className="text-xs text-text-secondary">kg CO₂ saved</div>
            </div>

            <div className="p-4 bg-gradient-to-br from-warning/10 to-warning/5 rounded-lg border border-warning/20">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Target" size={16} className="text-warning" />
                <span className="text-sm font-medium text-text-primary">Improvement</span>
              </div>
              <div className="text-2xl font-mono font-semibold text-warning">
                {reductionPercentage}%
              </div>
              <div className="text-xs text-text-secondary">vs previous period</div>
            </div>
          </div>

          {/* Emissions Breakdown */}
          <div className="space-y-4">
            <h3 className="font-medium text-text-primary">Emissions by Category</h3>
            <div className="space-y-3">
              {currentData?.breakdown?.map((item, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 bg-surface rounded-lg">
                  <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                    <Icon name={item?.icon} size={18} className={item?.color} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-text-primary">{item?.category}</span>
                      <span className="text-sm font-mono text-text-primary">{item?.emissions} kg CO₂</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-muted rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-success to-primary h-2 rounded-full transition-all duration-500"
                          style={{ width: `${item?.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-text-secondary w-12">{item?.percentage}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Comparison & Equivalencies */}
        <div className="space-y-6">
          {/* Comparison Chart */}
          <div className="p-4 bg-surface rounded-lg">
            <h3 className="font-medium text-text-primary mb-4">Comparison</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Your Emissions</span>
                <span className="text-sm font-mono font-semibold text-success">
                  {currentData?.totalEmissions?.toLocaleString()} kg
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Neighborhood Avg</span>
                <span className="text-sm font-mono text-text-primary">
                  {currentData?.comparison?.average?.toLocaleString()} kg
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Efficient Homes</span>
                <span className="text-sm font-mono text-primary">
                  {currentData?.comparison?.efficient?.toLocaleString()} kg
                </span>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-success/10 rounded-lg">
              <div className="flex items-center space-x-2">
                <Icon name="Award" size={16} className="text-success" />
                <span className="text-sm font-medium text-success">
                  {((1 - currentData?.totalEmissions / currentData?.comparison?.average) * 100)?.toFixed(0)}% 
                  below average
                </span>
              </div>
            </div>
          </div>

          {/* Environmental Equivalencies */}
          <div className="space-y-4">
            <h3 className="font-medium text-text-primary">Environmental Impact</h3>
            {equivalencies?.map((equiv, index) => (
              <div key={index} className="p-3 bg-background border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
                    <Icon name={equiv?.icon} size={16} className="text-success" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-text-primary">{equiv?.title}</div>
                    <div className="text-lg font-mono font-semibold text-success">
                      {equiv?.value} {equiv?.unit}
                    </div>
                    <div className="text-xs text-text-secondary">{equiv?.description}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button variant="default" iconName="Target" fullWidth>
              Set Reduction Goal
            </Button>
            <Button variant="outline" iconName="Share" fullWidth>
              Share Achievement
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarbonFootprintTracker;