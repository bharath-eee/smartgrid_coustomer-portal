import React from 'react';
import Button from '../../../components/ui/Button';


const TimelineSelector = ({ selectedPeriod, onPeriodChange, dateRange, onDateRangeChange }) => {
  const periods = [
    { key: 'daily', label: 'Daily', icon: 'Calendar' },
    { key: 'weekly', label: 'Weekly', icon: 'CalendarDays' },
    { key: 'monthly', label: 'Monthly', icon: 'CalendarRange' }
  ];

  return (
    <div className="bg-card rounded-lg border p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-text-primary mb-1">Consumption Timeline</h2>
          <p className="text-sm text-text-secondary">Analyze your energy usage patterns across different time periods</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Period Selector */}
          <div className="flex bg-muted rounded-lg p-1">
            {periods?.map((period) => (
              <Button
                key={period?.key}
                variant={selectedPeriod === period?.key ? "default" : "ghost"}
                size="sm"
                onClick={() => onPeriodChange(period?.key)}
                iconName={period?.icon}
                iconPosition="left"
                iconSize={16}
                className="min-w-[100px]"
              >
                {period?.label}
              </Button>
            ))}
          </div>

          {/* Date Range Controls */}
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" iconName="ChevronLeft" iconSize={16}>
              Previous
            </Button>
            <div className="px-3 py-1.5 bg-background border rounded-md">
              <span className="text-sm font-medium text-text-primary">{dateRange}</span>
            </div>
            <Button variant="outline" size="sm" iconName="ChevronRight" iconSize={16}>
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineSelector;