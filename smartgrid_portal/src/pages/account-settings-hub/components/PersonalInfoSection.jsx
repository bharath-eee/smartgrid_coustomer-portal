import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const PersonalInfoSection = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@email.com',
    phone: '+91 98765 43210',
    address: '123 Green Valley Apartments, Sector 15, Gurgaon',
    pincode: '122001',
    emergencyContact: '+91 98765 43211'
  });
  const [pendingVerification, setPendingVerification] = useState({
    email: false,
    phone: false
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Mock verification for sensitive fields
    if (formData?.email !== 'john.doe@email.com') {
      setPendingVerification(prev => ({ ...prev, email: true }));
    }
    if (formData?.phone !== '+91 98765 43210') {
      setPendingVerification(prev => ({ ...prev, phone: true }));
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@email.com',
      phone: '+91 98765 43210',
      address: '123 Green Valley Apartments, Sector 15, Gurgaon',
      pincode: '122001',
      emergencyContact: '+91 98765 43211'
    });
    setIsEditing(false);
  };

  return (
    <div className="energy-card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Personal Information</h3>
          <p className="text-sm text-text-secondary">Manage your account details and contact information</p>
        </div>
        {!isEditing ? (
          <Button
            variant="outline"
            iconName="Edit"
            iconPosition="left"
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </Button>
        ) : (
          <div className="flex space-x-2">
            <Button
              variant="outline"
              iconName="X"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              iconName="Check"
              onClick={handleSave}
            >
              Save Changes
            </Button>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="First Name"
          type="text"
          value={formData?.firstName}
          onChange={(e) => handleInputChange('firstName', e?.target?.value)}
          disabled={!isEditing}
          required
        />

        <Input
          label="Last Name"
          type="text"
          value={formData?.lastName}
          onChange={(e) => handleInputChange('lastName', e?.target?.value)}
          disabled={!isEditing}
          required
        />

        <div className="relative">
          <Input
            label="Email Address"
            type="email"
            value={formData?.email}
            onChange={(e) => handleInputChange('email', e?.target?.value)}
            disabled={!isEditing}
            required
          />
          {pendingVerification?.email && (
            <div className="mt-2 flex items-center space-x-2 text-warning">
              <Icon name="Clock" size={16} />
              <span className="text-sm">Verification email sent</span>
            </div>
          )}
        </div>

        <div className="relative">
          <Input
            label="Phone Number"
            type="tel"
            value={formData?.phone}
            onChange={(e) => handleInputChange('phone', e?.target?.value)}
            disabled={!isEditing}
            required
          />
          {pendingVerification?.phone && (
            <div className="mt-2 flex items-center space-x-2 text-warning">
              <Icon name="Clock" size={16} />
              <span className="text-sm">SMS verification sent</span>
            </div>
          )}
        </div>

        <div className="md:col-span-2">
          <Input
            label="Address"
            type="text"
            value={formData?.address}
            onChange={(e) => handleInputChange('address', e?.target?.value)}
            disabled={!isEditing}
            description="Your primary billing address"
          />
        </div>

        <Input
          label="PIN Code"
          type="text"
          value={formData?.pincode}
          onChange={(e) => handleInputChange('pincode', e?.target?.value)}
          disabled={!isEditing}
          pattern="[0-9]{6}"
          maxLength={6}
        />

        <Input
          label="Emergency Contact"
          type="tel"
          value={formData?.emergencyContact}
          onChange={(e) => handleInputChange('emergencyContact', e?.target?.value)}
          disabled={!isEditing}
          description="For service outage notifications"
        />
      </div>
      {/* Account Status */}
      <div className="mt-8 pt-6 border-t border-border">
        <h4 className="text-md font-medium text-text-primary mb-4">Account Status</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3 p-3 bg-success/10 rounded-lg">
            <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
              <Icon name="Check" size={16} color="white" />
            </div>
            <div>
              <div className="text-sm font-medium text-text-primary">Email Verified</div>
              <div className="text-xs text-text-secondary">Confirmed on 15/08/2024</div>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-success/10 rounded-lg">
            <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
              <Icon name="Check" size={16} color="white" />
            </div>
            <div>
              <div className="text-sm font-medium text-text-primary">Phone Verified</div>
              <div className="text-xs text-text-secondary">Confirmed on 15/08/2024</div>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-primary/10 rounded-lg">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Icon name="Crown" size={16} color="white" />
            </div>
            <div>
              <div className="text-sm font-medium text-text-primary">Premium Plan</div>
              <div className="text-xs text-text-secondary">Active until 31/12/2024</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoSection;