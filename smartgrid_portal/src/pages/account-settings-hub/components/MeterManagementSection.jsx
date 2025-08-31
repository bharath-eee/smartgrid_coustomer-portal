import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const MeterManagementSection = () => {
  const [showAddMeter, setShowAddMeter] = useState(false);
  const [newMeterData, setNewMeterData] = useState({
    meterId: '',
    propertyName: '',
    address: ''
  });

  const [meters] = useState([
    {
      id: 'MTR001234567',
      propertyName: 'Primary Residence',
      address: '123 Green Valley Apartments, Sector 15, Gurgaon',
      status: 'active',
      connectionDate: '15/03/2022',
      lastReading: '2,456 kWh',
      readingDate: '28/08/2024',
      isPrimary: true
    },
    {
      id: 'MTR001234568',
      propertyName: 'Weekend Home',
      address: '45 Hill View Villa, Manesar, Gurgaon',
      status: 'active',
      connectionDate: '22/07/2023',
      lastReading: '1,234 kWh',
      readingDate: '28/08/2024',
      isPrimary: false
    },
    {
      id: 'MTR001234569',
      propertyName: 'Office Space',
      address: '78 Business Park, Cyber City, Gurgaon',
      status: 'pending',
      connectionDate: '01/08/2024',
      lastReading: '0 kWh',
      readingDate: 'Pending',
      isPrimary: false
    }
  ]);

  const handleAddMeter = () => {
    // Mock meter addition
    setNewMeterData({ meterId: '', propertyName: '', address: '' });
    setShowAddMeter(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-success bg-success/10';
      case 'pending': return 'text-warning bg-warning/10';
      case 'inactive': return 'text-error bg-error/10';
      default: return 'text-text-secondary bg-muted';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return 'CheckCircle';
      case 'pending': return 'Clock';
      case 'inactive': return 'XCircle';
      default: return 'Circle';
    }
  };

  return (
    <div className="energy-card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Meter Management</h3>
          <p className="text-sm text-text-secondary">Manage all your connected meters and properties</p>
        </div>
        <Button
          variant="default"
          iconName="Plus"
          iconPosition="left"
          onClick={() => setShowAddMeter(true)}
        >
          Add Meter
        </Button>
      </div>
      {/* Add Meter Form */}
      {showAddMeter && (
        <div className="mb-6 p-4 bg-muted rounded-lg border-2 border-dashed border-border">
          <h4 className="text-md font-medium text-text-primary mb-4">Add New Meter</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Meter ID"
              type="text"
              placeholder="Enter meter ID (e.g., MTR001234567)"
              value={newMeterData?.meterId}
              onChange={(e) => setNewMeterData(prev => ({ ...prev, meterId: e?.target?.value }))}
              required
            />
            <Input
              label="Property Name"
              type="text"
              placeholder="e.g., Home, Office, Shop"
              value={newMeterData?.propertyName}
              onChange={(e) => setNewMeterData(prev => ({ ...prev, propertyName: e?.target?.value }))}
              required
            />
            <div className="md:col-span-2">
              <Input
                label="Property Address"
                type="text"
                placeholder="Enter complete address"
                value={newMeterData?.address}
                onChange={(e) => setNewMeterData(prev => ({ ...prev, address: e?.target?.value }))}
                required
              />
            </div>
          </div>
          <div className="flex space-x-2 mt-4">
            <Button
              variant="outline"
              iconName="X"
              onClick={() => setShowAddMeter(false)}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              iconName="Check"
              onClick={handleAddMeter}
            >
              Add Meter
            </Button>
          </div>
        </div>
      )}
      {/* Meters List */}
      <div className="space-y-4">
        {meters?.map((meter) => (
          <div key={meter?.id} className="border border-border rounded-lg p-4 hover-lift">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <Icon name="Zap" size={20} color="white" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="text-md font-medium text-text-primary">{meter?.propertyName}</h4>
                    {meter?.isPrimary && (
                      <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                        Primary
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-text-secondary mt-1">{meter?.address}</p>
                  <p className="text-xs text-text-secondary mt-1">Meter ID: {meter?.id}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(meter?.status)}`}>
                  <Icon name={getStatusIcon(meter?.status)} size={12} className="mr-1" />
                  {meter?.status?.charAt(0)?.toUpperCase() + meter?.status?.slice(1)}
                </span>
                <Button variant="ghost" size="icon">
                  <Icon name="MoreVertical" size={16} />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-surface rounded-lg p-3">
                <div className="text-xs text-text-secondary">Connection Date</div>
                <div className="text-sm font-medium text-text-primary">{meter?.connectionDate}</div>
              </div>
              <div className="bg-surface rounded-lg p-3">
                <div className="text-xs text-text-secondary">Last Reading</div>
                <div className="text-sm font-mono font-semibold text-primary">{meter?.lastReading}</div>
              </div>
              <div className="bg-surface rounded-lg p-3">
                <div className="text-xs text-text-secondary">Reading Date</div>
                <div className="text-sm font-medium text-text-primary">{meter?.readingDate}</div>
              </div>
            </div>

            {meter?.status === 'active' && (
              <div className="mt-4 flex space-x-2">
                <Button variant="outline" size="sm" iconName="BarChart3">
                  View Usage
                </Button>
                <Button variant="outline" size="sm" iconName="Receipt">
                  View Bills
                </Button>
                {!meter?.isPrimary && (
                  <Button variant="outline" size="sm" iconName="Star">
                    Set as Primary
                  </Button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Meter Connection Help */}
      <div className="mt-6 p-4 bg-trust/10 rounded-lg border border-trust/20">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} color="var(--color-trust)" />
          <div>
            <h4 className="text-sm font-medium text-text-primary">Need help connecting a meter?</h4>
            <p className="text-sm text-text-secondary mt-1">
              Your meter ID can be found on your electricity bill or on the meter itself. 
              If you're having trouble, contact our support team for assistance.
            </p>
            <Button variant="link" size="sm" iconName="ExternalLink" className="mt-2 p-0">
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeterManagementSection;