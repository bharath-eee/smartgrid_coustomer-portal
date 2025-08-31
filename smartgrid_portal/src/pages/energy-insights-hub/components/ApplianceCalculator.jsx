import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const ApplianceCalculator = () => {
  const [selectedAppliance, setSelectedAppliance] = useState('');
  const [hoursPerDay, setHoursPerDay] = useState('');
  const [daysPerMonth, setDaysPerMonth] = useState('30');
  const [customWattage, setCustomWattage] = useState('');

  const appliances = [
    { value: 'ac_1_5_ton', label: 'Air Conditioner (1.5 Ton)', wattage: 1500, icon: 'Wind' },
    { value: 'refrigerator', label: 'Refrigerator (Double Door)', wattage: 300, icon: 'Refrigerator' },
    { value: 'washing_machine', label: 'Washing Machine', wattage: 500, icon: 'Shirt' },
    { value: 'water_heater', label: 'Water Heater (Geyser)', wattage: 2000, icon: 'Droplets' },
    { value: 'microwave', label: 'Microwave Oven', wattage: 1000, icon: 'Microwave' },
    { value: 'led_tv', label: 'LED TV (43 inch)', wattage: 100, icon: 'Tv' },
    { value: 'ceiling_fan', label: 'Ceiling Fan', wattage: 75, icon: 'Fan' },
    { value: 'led_bulb', label: 'LED Bulb (9W)', wattage: 9, icon: 'Lightbulb' },
    { value: 'desktop_computer', label: 'Desktop Computer', wattage: 300, icon: 'Monitor' },
    { value: 'custom', label: 'Custom Appliance', wattage: 0, icon: 'Settings' }
  ];

  const rateStructure = {
    slab1: { min: 0, max: 100, rate: 3.50 },
    slab2: { min: 101, max: 300, rate: 4.50 },
    slab3: { min: 301, max: 500, rate: 6.00 },
    slab4: { min: 501, max: Infinity, rate: 7.50 }
  };

  const calculateCost = () => {
    if (!selectedAppliance || !hoursPerDay || !daysPerMonth) return null;

    const appliance = appliances?.find(a => a?.value === selectedAppliance);
    const wattage = selectedAppliance === 'custom' ? parseFloat(customWattage) : appliance?.wattage;
    
    if (!wattage) return null;

    const monthlyKWh = (wattage * parseFloat(hoursPerDay) * parseFloat(daysPerMonth)) / 1000;
    
    // Calculate cost based on slab rates
    let totalCost = 0;
    let remainingUnits = monthlyKWh;

    Object.values(rateStructure)?.forEach(slab => {
      if (remainingUnits > 0) {
        const unitsInThisSlab = Math.min(remainingUnits, slab?.max - slab?.min + 1);
        totalCost += unitsInThisSlab * slab?.rate;
        remainingUnits -= unitsInThisSlab;
      }
    });

    return {
      monthlyKWh: monthlyKWh?.toFixed(2),
      monthlyCost: totalCost?.toFixed(2),
      dailyCost: (totalCost / parseFloat(daysPerMonth))?.toFixed(2),
      yearlyKWh: (monthlyKWh * 12)?.toFixed(2),
      yearlyCost: (totalCost * 12)?.toFixed(2)
    };
  };

  const results = calculateCost();

  return (
    <div className="energy-card">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
          <Icon name="Calculator" size={24} className="text-accent" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-text-primary">Appliance Cost Calculator</h2>
          <p className="text-sm text-text-secondary">Calculate energy costs for your appliances</p>
        </div>
      </div>
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-4">
            <Select
              label="Select Appliance"
              placeholder="Choose an appliance"
              options={appliances}
              value={selectedAppliance}
              onChange={setSelectedAppliance}
              searchable
            />

            {selectedAppliance === 'custom' && (
              <Input
                label="Power Consumption (Watts)"
                type="number"
                placeholder="Enter wattage"
                value={customWattage}
                onChange={(e) => setCustomWattage(e?.target?.value)}
                description="Check the appliance label or manual for power rating"
              />
            )}

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Hours per Day"
                type="number"
                placeholder="8"
                value={hoursPerDay}
                onChange={(e) => setHoursPerDay(e?.target?.value)}
                min="0"
                max="24"
                step="0.5"
              />

              <Input
                label="Days per Month"
                type="number"
                placeholder="30"
                value={daysPerMonth}
                onChange={(e) => setDaysPerMonth(e?.target?.value)}
                min="1"
                max="31"
              />
            </div>
          </div>

          {selectedAppliance && (
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-center space-x-3 mb-3">
                <Icon 
                  name={appliances?.find(a => a?.value === selectedAppliance)?.icon || 'Zap'} 
                  size={20} 
                  className="text-primary" 
                />
                <span className="font-medium text-text-primary">
                  {appliances?.find(a => a?.value === selectedAppliance)?.label}
                </span>
              </div>
              <div className="text-sm text-text-secondary">
                Power Rating: {selectedAppliance === 'custom' ? customWattage : appliances?.find(a => a?.value === selectedAppliance)?.wattage}W
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          {results ? (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="Zap" size={16} className="text-primary" />
                    <span className="text-sm font-medium text-text-primary">Monthly Usage</span>
                  </div>
                  <div className="text-2xl font-mono font-semibold text-primary">{results?.monthlyKWh}</div>
                  <div className="text-xs text-text-secondary">kWh</div>
                </div>

                <div className="p-4 bg-success/5 rounded-lg border border-success/20">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="IndianRupee" size={16} className="text-success" />
                    <span className="text-sm font-medium text-text-primary">Monthly Cost</span>
                  </div>
                  <div className="text-2xl font-mono font-semibold text-success">₹{results?.monthlyCost}</div>
                  <div className="text-xs text-text-secondary">per month</div>
                </div>

                <div className="p-4 bg-warning/5 rounded-lg border border-warning/20">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="Calendar" size={16} className="text-warning" />
                    <span className="text-sm font-medium text-text-primary">Daily Cost</span>
                  </div>
                  <div className="text-2xl font-mono font-semibold text-warning">₹{results?.dailyCost}</div>
                  <div className="text-xs text-text-secondary">per day</div>
                </div>

                <div className="p-4 bg-trust/5 rounded-lg border border-trust/20">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="TrendingUp" size={16} className="text-trust" />
                    <span className="text-sm font-medium text-text-primary">Yearly Cost</span>
                  </div>
                  <div className="text-2xl font-mono font-semibold text-trust">₹{results?.yearlyCost}</div>
                  <div className="text-xs text-text-secondary">per year</div>
                </div>
              </div>

              <div className="p-4 bg-surface rounded-lg">
                <h3 className="font-medium text-text-primary mb-3">Cost Breakdown</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Energy Consumption:</span>
                    <span className="font-mono">{results?.monthlyKWh} kWh/month</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Average Rate:</span>
                    <span className="font-mono">₹{(parseFloat(results?.monthlyCost) / parseFloat(results?.monthlyKWh))?.toFixed(2)}/kWh</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Annual Consumption:</span>
                    <span className="font-mono">{results?.yearlyKWh} kWh/year</span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3">
                <Button variant="outline" iconName="Download" className="flex-1">
                  Export Report
                </Button>
                <Button variant="default" iconName="Target" className="flex-1">
                  Set Budget Goal
                </Button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                <Icon name="Calculator" size={32} className="text-text-secondary" />
              </div>
              <h3 className="font-medium text-text-primary mb-2">Ready to Calculate</h3>
              <p className="text-sm text-text-secondary">
                Select an appliance and enter usage details to see cost estimates
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplianceCalculator;