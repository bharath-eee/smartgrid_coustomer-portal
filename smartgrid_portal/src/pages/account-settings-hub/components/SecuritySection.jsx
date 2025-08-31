import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const SecuritySection = () => {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [show2FASetup, setShow2FASetup] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const loginHistory = [
    {
      id: 1,
      device: 'Chrome on Windows',
      location: 'Gurgaon, Haryana',
      timestamp: '31/08/2024 10:30 AM',
      ip: '192.168.1.1',
      status: 'success',
      isCurrent: true
    },
    {
      id: 2,
      device: 'SmartGrid Mobile App',
      location: 'Gurgaon, Haryana',
      timestamp: '30/08/2024 08:15 PM',
      ip: '192.168.1.1',
      status: 'success',
      isCurrent: false
    },
    {
      id: 3,
      device: 'Safari on iPhone',
      location: 'Delhi, Delhi',
      timestamp: '29/08/2024 02:45 PM',
      ip: '203.192.12.34',
      status: 'success',
      isCurrent: false
    },
    {
      id: 4,
      device: 'Chrome on Android',
      location: 'Mumbai, Maharashtra',
      timestamp: '28/08/2024 11:20 AM',
      ip: '157.48.23.67',
      status: 'failed',
      isCurrent: false
    }
  ];

  const handlePasswordChange = () => {
    // Mock password change
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setShowChangePassword(false);
  };

  const handleEnable2FA = () => {
    setTwoFactorEnabled(true);
    setShow2FASetup(false);
  };

  const getDeviceIcon = (device) => {
    if (device?.includes('Mobile App')) return 'Smartphone';
    if (device?.includes('iPhone') || device?.includes('Safari')) return 'Smartphone';
    if (device?.includes('Android')) return 'Smartphone';
    return 'Monitor';
  };

  const getStatusColor = (status) => {
    return status === 'success' ? 'text-success' : 'text-error';
  };

  return (
    <div className="energy-card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Security Settings</h3>
          <p className="text-sm text-text-secondary">Manage your account security and authentication</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="status-dot online"></div>
          <span className="text-sm text-success">Account Secure</span>
        </div>
      </div>
      {/* Password Management */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-md font-medium text-text-primary">Password</h4>
            <p className="text-sm text-text-secondary">Last changed on 15/07/2024</p>
          </div>
          <Button
            variant="outline"
            iconName="Key"
            iconPosition="left"
            onClick={() => setShowChangePassword(!showChangePassword)}
          >
            Change Password
          </Button>
        </div>

        {showChangePassword && (
          <div className="p-4 bg-surface rounded-lg border">
            <div className="space-y-4">
              <Input
                label="Current Password"
                type="password"
                value={passwordData?.currentPassword}
                onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e?.target?.value }))}
                required
              />
              <Input
                label="New Password"
                type="password"
                value={passwordData?.newPassword}
                onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e?.target?.value }))}
                description="Must be at least 8 characters with uppercase, lowercase, and numbers"
                required
              />
              <Input
                label="Confirm New Password"
                type="password"
                value={passwordData?.confirmPassword}
                onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e?.target?.value }))}
                required
              />
            </div>
            <div className="flex space-x-2 mt-4">
              <Button
                variant="outline"
                iconName="X"
                onClick={() => setShowChangePassword(false)}
              >
                Cancel
              </Button>
              <Button
                variant="default"
                iconName="Check"
                onClick={handlePasswordChange}
              >
                Update Password
              </Button>
            </div>
          </div>
        )}
      </div>
      {/* Two-Factor Authentication */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-md font-medium text-text-primary">Two-Factor Authentication</h4>
            <p className="text-sm text-text-secondary">
              {twoFactorEnabled ? 'Enabled via SMS to +91 98765 43210' : 'Add an extra layer of security to your account'}
            </p>
          </div>
          {!twoFactorEnabled ? (
            <Button
              variant="default"
              iconName="Shield"
              iconPosition="left"
              onClick={() => setShow2FASetup(true)}
            >
              Enable 2FA
            </Button>
          ) : (
            <Button
              variant="outline"
              iconName="ShieldOff"
              iconPosition="left"
              onClick={() => setTwoFactorEnabled(false)}
            >
              Disable 2FA
            </Button>
          )}
        </div>

        {show2FASetup && (
          <div className="p-4 bg-surface rounded-lg border">
            <h5 className="text-sm font-medium text-text-primary mb-3">Setup Two-Factor Authentication</h5>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 border border-border rounded-lg">
                <Icon name="MessageSquare" size={20} color="var(--color-primary)" />
                <div className="flex-1">
                  <div className="text-sm font-medium text-text-primary">SMS Authentication</div>
                  <div className="text-xs text-text-secondary">Receive codes via SMS to +91 98765 43210</div>
                </div>
                <Checkbox checked onChange={() => {}} />
              </div>
              <div className="flex items-center space-x-3 p-3 border border-border rounded-lg opacity-50">
                <Icon name="Smartphone" size={20} color="var(--color-text-secondary)" />
                <div className="flex-1">
                  <div className="text-sm font-medium text-text-secondary">Authenticator App</div>
                  <div className="text-xs text-text-secondary">Coming soon - Google Authenticator support</div>
                </div>
                <Checkbox disabled />
              </div>
            </div>
            <div className="flex space-x-2 mt-4">
              <Button
                variant="outline"
                iconName="X"
                onClick={() => setShow2FASetup(false)}
              >
                Cancel
              </Button>
              <Button
                variant="default"
                iconName="Check"
                onClick={handleEnable2FA}
              >
                Enable 2FA
              </Button>
            </div>
          </div>
        )}

        {twoFactorEnabled && (
          <div className="p-3 bg-success/10 rounded-lg border border-success/20">
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={16} color="var(--color-success)" />
              <span className="text-sm font-medium text-success">Two-factor authentication is active</span>
            </div>
          </div>
        )}
      </div>
      {/* Login History */}
      <div>
        <h4 className="text-md font-medium text-text-primary mb-4">Recent Login Activity</h4>
        <div className="space-y-3">
          {loginHistory?.map((login) => (
            <div key={login?.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                  <Icon name={getDeviceIcon(login?.device)} size={18} color="var(--color-primary)" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-text-primary">{login?.device}</span>
                    {login?.isCurrent && (
                      <span className="px-2 py-1 bg-success/10 text-success text-xs font-medium rounded-full">
                        Current Session
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-text-secondary">
                    {login?.location} • {login?.timestamp}
                  </div>
                  <div className="text-xs text-text-secondary">IP: {login?.ip}</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Icon 
                  name={login?.status === 'success' ? 'CheckCircle' : 'XCircle'} 
                  size={16} 
                  className={getStatusColor(login?.status)}
                />
                {!login?.isCurrent && login?.status === 'success' && (
                  <Button variant="ghost" size="sm" iconName="LogOut">
                    Revoke
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-3 bg-warning/10 rounded-lg border border-warning/20">
          <div className="flex items-start space-x-2">
            <Icon name="AlertTriangle" size={16} color="var(--color-warning)" />
            <div>
              <span className="text-sm font-medium text-text-primary">Security Tip:</span>
              <span className="text-sm text-text-secondary ml-1">
                If you notice any suspicious activity, change your password immediately and contact support.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuritySection;