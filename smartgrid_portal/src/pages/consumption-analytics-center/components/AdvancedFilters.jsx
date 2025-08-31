import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const AdvancedFilters = ({ onFiltersChange, appliedFilters }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState(appliedFilters || {
    dateRange: 'last30days',
    appliances: [],
    timeOfDay: [],
    consumptionLevel: 'all',
    costRange: 'all',
    weatherCondition: 'all'
  });

  const dateRangeOptions = [
    { value: 'today', label: 'Today' },
    { value: 'yesterday', label: 'Yesterday' },
    { value: 'last7days', label: 'Last 7 Days' },
    { value: 'last30days', label: 'Last 30 Days' },
    { value: 'last3months', label: 'Last 3 Months' },
    { value: 'last6months', label: 'Last 6 Months' },
    { value: 'lastyear', label: 'Last Year' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const applianceOptions = [
    { value: 'ac', label: 'Air Conditioner', icon: 'Wind' },
    { value: 'refrigerator', label: 'Refrigerator', icon: 'Snowflake' },
    { value: 'waterheater', label: 'Water Heater', icon: 'Droplets' },
    { value: 'lighting', label: 'Lighting', icon: 'Lightbulb' },
    { value: 'television', label: 'Television', icon: 'Monitor' },
    { value: 'washingmachine', label: 'Washing Machine', icon: 'Shirt' },
    { value: 'microwave', label: 'Microwave', icon: 'Microwave' },
    { value: 'others', label: 'Others', icon: 'MoreHorizontal' }
  ];

  const timeOfDayOptions = [
    { value: 'morning', label: 'Morning (6AM - 12PM)', icon: 'Sunrise' },
    { value: 'afternoon', label: 'Afternoon (12PM - 6PM)', icon: 'Sun' },
    { value: 'evening', label: 'Evening (6PM - 10PM)', icon: 'Sunset' },
    { value: 'night', label: 'Night (10PM - 6AM)', icon: 'Moon' }
  ];

  const consumptionLevelOptions = [
    { value: 'all', label: 'All Levels' },
    { value: 'low', label: 'Low (0-10 kWh)' },
    { value: 'medium', label: 'Medium (10-25 kWh)' },
    { value: 'high', label: 'High (25+ kWh)' }
  ];

  const costRangeOptions = [
    { value: 'all', label: 'All Ranges' },
    { value: 'low', label: 'Low (₹0-500)' },
    { value: 'medium', label: 'Medium (₹500-1500)' },
    { value: 'high', label: 'High (₹1500+)' }
  ];

  const weatherOptions = [
    { value: 'all', label: 'All Weather' },
    { value: 'hot', label: 'Hot Days (>30°C)' },
    { value: 'moderate', label: 'Moderate (20-30°C)' },
    { value: 'cool', label: 'Cool Days (<20°C)' },
    { value: 'rainy', label: 'Rainy Days' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleApplianceToggle = (appliance) => {
    const newAppliances = filters?.appliances?.includes(appliance)
      ? filters?.appliances?.filter(a => a !== appliance)
      : [...filters?.appliances, appliance];
    handleFilterChange('appliances', newAppliances);
  };

  const handleTimeOfDayToggle = (time) => {
    const newTimeOfDay = filters?.timeOfDay?.includes(time)
      ? filters?.timeOfDay?.filter(t => t !== time)
      : [...filters?.timeOfDay, time];
    handleFilterChange('timeOfDay', newTimeOfDay);
  };

  const clearAllFilters = () => {
    const defaultFilters = {
      dateRange: 'last30days',
      appliances: [],
      timeOfDay: [],
      consumptionLevel: 'all',
      costRange: 'all',
      weatherCondition: 'all'
    };
    setFilters(defaultFilters);
    onFiltersChange(defaultFilters);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters?.dateRange !== 'last30days') count++;
    if (filters?.appliances?.length > 0) count++;
    if (filters?.timeOfDay?.length > 0) count++;
    if (filters?.consumptionLevel !== 'all') count++;
    if (filters?.costRange !== 'all') count++;
    if (filters?.weatherCondition !== 'all') count++;
    return count;
  };

  return (
    <div className="bg-card rounded-lg border p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Icon name="Filter" size={20} color="var(--color-primary)" />
          <div>
            <h3 className="text-lg font-semibold text-text-primary">Advanced Filters</h3>
            <p className="text-sm text-text-secondary">Customize your analytics view</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          {getActiveFiltersCount() > 0 && (
            <div className="flex items-center space-x-2">
              <div className="px-2 py-1 bg-primary/10 rounded-full">
                <span className="text-xs font-medium text-primary">
                  {getActiveFiltersCount()} active
                </span>
              </div>
              <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                Clear All
              </Button>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
          >
            {isExpanded ? 'Collapse' : 'Expand'}
          </Button>
        </div>
      </div>
      {/* Quick Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        <Select
          options={dateRangeOptions}
          value={filters?.dateRange}
          onChange={(value) => handleFilterChange('dateRange', value)}
          placeholder="Select date range"
          className="min-w-[150px]"
        />
        <Select
          options={consumptionLevelOptions}
          value={filters?.consumptionLevel}
          onChange={(value) => handleFilterChange('consumptionLevel', value)}
          placeholder="Consumption level"
          className="min-w-[150px]"
        />
        <Select
          options={costRangeOptions}
          value={filters?.costRange}
          onChange={(value) => handleFilterChange('costRange', value)}
          placeholder="Cost range"
          className="min-w-[130px]"
        />
      </div>
      {/* Expanded Filters */}
      {isExpanded && (
        <div className="space-y-6 pt-4 border-t border-border">
          {/* Appliance Filters */}
          <div>
            <h4 className="text-sm font-medium text-text-primary mb-3">Filter by Appliances</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {applianceOptions?.map((appliance) => (
                <div key={appliance?.value} className="flex items-center space-x-2">
                  <Checkbox
                    checked={filters?.appliances?.includes(appliance?.value)}
                    onChange={() => handleApplianceToggle(appliance?.value)}
                  />
                  <div className="flex items-center space-x-2">
                    <Icon name={appliance?.icon} size={16} color="var(--color-text-secondary)" />
                    <span className="text-sm text-text-primary">{appliance?.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Time of Day Filters */}
          <div>
            <h4 className="text-sm font-medium text-text-primary mb-3">Filter by Time of Day</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {timeOfDayOptions?.map((time) => (
                <div key={time?.value} className="flex items-center space-x-2">
                  <Checkbox
                    checked={filters?.timeOfDay?.includes(time?.value)}
                    onChange={() => handleTimeOfDayToggle(time?.value)}
                  />
                  <div className="flex items-center space-x-2">
                    <Icon name={time?.icon} size={16} color="var(--color-text-secondary)" />
                    <span className="text-sm text-text-primary">{time?.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Weather Condition Filter */}
          <div>
            <h4 className="text-sm font-medium text-text-primary mb-3">Filter by Weather Conditions</h4>
            <Select
              options={weatherOptions}
              value={filters?.weatherCondition}
              onChange={(value) => handleFilterChange('weatherCondition', value)}
              placeholder="Select weather condition"
              className="max-w-xs"
            />
          </div>

          {/* Custom Date Range */}
          {filters?.dateRange === 'custom' && (
            <div>
              <h4 className="text-sm font-medium text-text-primary mb-3">Custom Date Range</h4>
              <div className="flex items-center space-x-3">
                <div>
                  <label className="text-xs text-text-secondary mb-1 block">From Date</label>
                  <input
                    type="date"
                    className="form-input text-sm"
                    onChange={(e) => handleFilterChange('startDate', e?.target?.value)}
                  />
                </div>
                <div>
                  <label className="text-xs text-text-secondary mb-1 block">To Date</label>
                  <input
                    type="date"
                    className="form-input text-sm"
                    onChange={(e) => handleFilterChange('endDate', e?.target?.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Apply Filters Button */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="text-sm text-text-secondary">
              Filters will be applied automatically as you make selections
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" iconName="Download" iconPosition="left">
                Export Filtered Data
              </Button>
              <Button variant="default" size="sm" iconName="Save" iconPosition="left">
                Save Filter Preset
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedFilters;