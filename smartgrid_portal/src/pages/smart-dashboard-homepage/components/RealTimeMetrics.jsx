import React from 'react';
import Icon from '../../../components/AppIcon';

const RealTimeMetrics = () => {
  const currentUsage = 2.4;
  const currentCost = 48.60;
  const efficiency = 87;
  
  return (
    <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl p-6 border border-primary/10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-text-primary">Live Energy Monitor</h2>
          <p className="text-sm text-text-secondary">Real-time consumption tracking</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="status-dot online"></div>
          <span className="text-sm font-medium text-success">Live</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Current Usage */}
        <div className="text-center">
          <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mx-auto mb-3">
            <Icon name="Zap" size={24} color="var(--color-primary)" />
          </div>
          <div className="energy-metric text-3xl mb-1">{currentUsage} kW</div>
          <div className="energy-label">Current Usage</div>
          <div className="text-xs text-success mt-1">↓ 12% from yesterday</div>
        </div>

        {/* Current Cost */}
        <div className="text-center">
          <div className="flex items-center justify-center w-16 h-16 bg-secondary/10 rounded-full mx-auto mb-3">
            <Icon name="IndianRupee" size={24} color="var(--color-secondary)" />
          </div>
          <div className="energy-metric text-3xl mb-1">₹{currentCost}</div>
          <div className="energy-label">Today's Cost</div>
          <div className="text-xs text-success mt-1">On track for monthly budget</div>
        </div>

        {/* Efficiency Score */}
        <div className="text-center">
          <div className="flex items-center justify-center w-16 h-16 bg-trust/10 rounded-full mx-auto mb-3">
            <Icon name="Target" size={24} color="var(--color-trust)" />
          </div>
          <div className="energy-metric text-3xl mb-1">{efficiency}%</div>
          <div className="energy-label">Efficiency Score</div>
          <div className="text-xs text-trust mt-1">Above neighborhood avg</div>
        </div>
      </div>
    </div>
  );
};

export default RealTimeMetrics;