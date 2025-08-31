import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ApplianceBreakdown = ({ applianceData, recommendations }) => {
  const [viewType, setViewType] = useState('pie');

  const COLORS = [
    'var(--color-primary)',
    'var(--color-secondary)',
    'var(--color-warning)',
    'var(--color-error)',
    'var(--color-trust)',
    'var(--color-accent)'
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="bg-popover border border-border rounded-lg shadow-energy-lg p-3">
          <p className="text-sm font-medium text-text-primary">{data?.name}</p>
          <p className="text-sm text-text-secondary">
            Consumption: <span className="font-medium text-primary">{data?.consumption} kWh</span>
          </p>
          <p className="text-sm text-text-secondary">
            Cost: <span className="font-medium text-secondary">₹{data?.cost}</span>
          </p>
          <p className="text-sm text-text-secondary">
            Share: <span className="font-medium">{data?.percentage}%</span>
          </p>
        </div>
      );
    }
    return null;
  };

  const getApplianceIcon = (name) => {
    const iconMap = {
      'Air Conditioner': 'Wind',
      'Refrigerator': 'Snowflake',
      'Water Heater': 'Droplets',
      'Lighting': 'Lightbulb',
      'Television': 'Monitor',
      'Washing Machine': 'Shirt',
      'Others': 'MoreHorizontal'
    };
    return iconMap?.[name] || 'Zap';
  };

  const getEfficiencyColor = (efficiency) => {
    if (efficiency >= 80) return 'text-success';
    if (efficiency >= 60) return 'text-warning';
    return 'text-error';
  };

  return (
    <div className="bg-card rounded-lg border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Appliance Breakdown</h3>
          <p className="text-sm text-text-secondary">Energy consumption by device category</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex bg-muted rounded-lg p-1">
            <Button
              variant={viewType === 'pie' ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewType('pie')}
              iconName="PieChart"
              iconSize={16}
            >
              Pie
            </Button>
            <Button
              variant={viewType === 'bar' ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewType('bar')}
              iconName="BarChart3"
              iconSize={16}
            >
              Bar
            </Button>
          </div>
          <Button variant="ghost" size="icon">
            <Icon name="Download" size={16} />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart Section */}
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            {viewType === 'pie' ? (
              <PieChart>
                <Pie
                  data={applianceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={2}
                  dataKey="consumption"
                >
                  {applianceData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS?.[index % COLORS?.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            ) : (
              <BarChart data={applianceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="name" 
                  stroke="var(--color-text-secondary)"
                  fontSize={12}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis 
                  stroke="var(--color-text-secondary)"
                  fontSize={12}
                  label={{ value: 'kWh', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="consumption" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* Appliance List */}
        <div className="space-y-3">
          {applianceData?.map((appliance, index) => (
            <div key={appliance?.name} className="flex items-center space-x-4 p-3 hover:bg-muted rounded-lg transition-colors">
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${COLORS?.[index % COLORS?.length]}20` }}
              >
                <Icon 
                  name={getApplianceIcon(appliance?.name)} 
                  size={18} 
                  color={COLORS?.[index % COLORS?.length]}
                />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-text-primary">{appliance?.name}</span>
                  <span className="text-sm font-mono font-semibold text-primary">
                    {appliance?.consumption} kWh
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-muted rounded-full h-2">
                      <div 
                        className="h-2 rounded-full transition-all duration-500"
                        style={{ 
                          width: `${appliance?.percentage}%`,
                          backgroundColor: COLORS?.[index % COLORS?.length]
                        }}
                      ></div>
                    </div>
                    <span className="text-xs text-text-secondary">{appliance?.percentage}%</span>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-xs text-text-secondary">₹{appliance?.cost}</div>
                    <div className={`text-xs font-medium ${getEfficiencyColor(appliance?.efficiency)}`}>
                      {appliance?.efficiency}% efficient
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Recommendations Section */}
      <div className="mt-6 pt-6 border-t border-border">
        <h4 className="text-sm font-medium text-text-primary mb-4">Optimization Recommendations</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendations?.map((rec, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-muted rounded-lg">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${rec?.priority === 'high' ? 'bg-error/10' : rec?.priority === 'medium' ? 'bg-warning/10' : 'bg-success/10'}`}>
                <Icon 
                  name={rec?.icon} 
                  size={14} 
                  color={rec?.priority === 'high' ? 'var(--color-error)' : rec?.priority === 'medium' ? 'var(--color-warning)' : 'var(--color-success)'}
                />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-text-primary mb-1">{rec?.title}</div>
                <div className="text-xs text-text-secondary mb-2">{rec?.description}</div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-success font-medium">Save ₹{rec?.savings}/month</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    rec?.priority === 'high' ? 'bg-error/10 text-error' : 
                    rec?.priority === 'medium'? 'bg-warning/10 text-warning' : 'bg-success/10 text-success'
                  }`}>
                    {rec?.priority}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ApplianceBreakdown;