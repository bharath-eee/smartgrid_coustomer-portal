import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SeasonalComparison = ({ seasonalData, yearlyTrends }) => {
  const [viewType, setViewType] = useState('seasonal');
  const [selectedYear, setSelectedYear] = useState('2024');

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg shadow-energy-lg p-3">
          <p className="text-sm font-medium text-text-primary mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: entry?.color }}
                ></div>
                <span className="text-sm text-text-secondary">{entry?.name}:</span>
              </div>
              <span className="text-sm font-medium text-text-primary">
                {entry?.value} {viewType === 'seasonal' ? 'kWh' : 'kWh'}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const getSeasonIcon = (season) => {
    const iconMap = {
      'Spring': 'Flower',
      'Summer': 'Sun',
      'Monsoon': 'CloudRain',
      'Winter': 'Snowflake'
    };
    return iconMap?.[season] || 'Calendar';
  };

  const getSeasonColor = (season) => {
    const colorMap = {
      'Spring': 'var(--color-success)',
      'Summer': 'var(--color-warning)',
      'Monsoon': 'var(--color-primary)',
      'Winter': 'var(--color-trust)'
    };
    return colorMap?.[season] || 'var(--color-text-secondary)';
  };

  const currentSeason = seasonalData?.find(s => s?.current) || seasonalData?.[0];
  const peakSeason = seasonalData?.reduce((prev, current) => 
    (prev?.consumption > current?.consumption) ? prev : current
  );

  return (
    <div className="bg-card rounded-lg border p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Seasonal Analysis</h3>
          <p className="text-sm text-text-secondary">Compare energy usage patterns across different seasons</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex bg-muted rounded-lg p-1">
            <Button
              variant={viewType === 'seasonal' ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewType('seasonal')}
              iconName="Calendar"
              iconSize={16}
            >
              Seasonal
            </Button>
            <Button
              variant={viewType === 'yearly' ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewType('yearly')}
              iconName="TrendingUp"
              iconSize={16}
            >
              Yearly
            </Button>
          </div>
          <Button variant="ghost" size="icon">
            <Icon name="Download" size={16} />
          </Button>
        </div>
      </div>
      {/* Current Season Highlight */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Icon name={getSeasonIcon(currentSeason?.season)} size={24} color="var(--color-primary)" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-text-primary">Current: {currentSeason?.season}</h4>
              <p className="text-sm text-text-secondary">Average consumption this season</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">{currentSeason?.consumption} kWh</div>
            <div className="text-sm text-text-secondary">
              {currentSeason?.change > 0 ? '+' : ''}{currentSeason?.change}% vs last year
            </div>
          </div>
        </div>
      </div>
      {/* Chart Section */}
      <div className="h-80 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          {viewType === 'seasonal' ? (
            <BarChart data={seasonalData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="season" 
                stroke="var(--color-text-secondary)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-text-secondary)"
                fontSize={12}
                label={{ value: 'kWh', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="consumption" 
                fill="var(--color-primary)" 
                radius={[4, 4, 0, 0]}
                name="Consumption"
              />
              <Bar 
                dataKey="lastYear" 
                fill="var(--color-text-secondary)" 
                radius={[4, 4, 0, 0]}
                name="Last Year"
                opacity={0.6}
              />
            </BarChart>
          ) : (
            <LineChart data={yearlyTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="month" 
                stroke="var(--color-text-secondary)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-text-secondary)"
                fontSize={12}
                label={{ value: 'kWh', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="2024"
                stroke="var(--color-primary)"
                strokeWidth={3}
                dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
                name="2024"
              />
              <Line
                type="monotone"
                dataKey="2023"
                stroke="var(--color-text-secondary)"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: 'var(--color-text-secondary)', strokeWidth: 2, r: 3 }}
                name="2023"
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
      {/* Seasonal Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Season Cards */}
        <div>
          <h4 className="text-sm font-medium text-text-primary mb-4">Season Overview</h4>
          <div className="space-y-3">
            {seasonalData?.map((season, index) => (
              <div 
                key={season?.season}
                className={`flex items-center space-x-4 p-3 rounded-lg transition-all ${
                  season?.current ? 'bg-primary/10 border border-primary/20' : 'bg-muted hover:bg-muted/80'
                }`}
              >
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${getSeasonColor(season?.season)}20` }}
                >
                  <Icon 
                    name={getSeasonIcon(season?.season)} 
                    size={18} 
                    color={getSeasonColor(season?.season)}
                  />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-text-primary">
                      {season?.season}
                      {season?.current && <span className="ml-2 text-xs text-primary">(Current)</span>}
                    </span>
                    <span className="text-sm font-mono font-semibold text-primary">
                      {season?.consumption} kWh
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-background rounded-full h-2">
                        <div 
                          className="h-2 rounded-full transition-all duration-500"
                          style={{ 
                            width: `${(season?.consumption / peakSeason?.consumption) * 100}%`,
                            backgroundColor: getSeasonColor(season?.season)
                          }}
                        ></div>
                      </div>
                      <span className="text-xs text-text-secondary">
                        {Math.round((season?.consumption / peakSeason?.consumption) * 100)}%
                      </span>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-xs text-text-secondary">₹{season?.cost}</div>
                      <div className={`text-xs font-medium ${
                        season?.change > 0 ? 'text-error' : 'text-success'
                      }`}>
                        {season?.change > 0 ? '+' : ''}{season?.change}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Insights */}
        <div>
          <h4 className="text-sm font-medium text-text-primary mb-4">Key Insights</h4>
          <div className="space-y-4">
            <div className="bg-warning/10 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Icon name="TrendingUp" size={20} color="var(--color-warning)" />
                <div>
                  <h5 className="text-sm font-medium text-text-primary mb-1">Peak Season</h5>
                  <p className="text-xs text-text-secondary mb-2">
                    {peakSeason?.season} shows highest consumption at {peakSeason?.consumption} kWh
                  </p>
                  <div className="text-xs text-warning font-medium">
                    Plan ahead for ₹{peakSeason?.cost} monthly bills
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-success/10 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Icon name="Leaf" size={20} color="var(--color-success)" />
                <div>
                  <h5 className="text-sm font-medium text-text-primary mb-1">Efficiency Opportunity</h5>
                  <p className="text-xs text-text-secondary mb-2">
                    Optimize AC usage during summer to reduce peak consumption
                  </p>
                  <div className="text-xs text-success font-medium">
                    Potential savings: ₹800/month
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-primary/10 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Icon name="Calendar" size={20} color="var(--color-primary)" />
                <div>
                  <h5 className="text-sm font-medium text-text-primary mb-1">Seasonal Planning</h5>
                  <p className="text-xs text-text-secondary mb-2">
                    Set budget alerts 2 weeks before peak seasons
                  </p>
                  <div className="text-xs text-primary font-medium">
                    Next alert: Summer 2025
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeasonalComparison;