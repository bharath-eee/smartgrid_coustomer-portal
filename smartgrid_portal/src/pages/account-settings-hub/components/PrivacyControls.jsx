import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';

const PrivacyControls = () => {
  const [privacySettings, setPrivacySettings] = useState({
    dataSharing: {
      neighborhoodComparison: true,
      efficiencyPrograms: true,
      anonymousUsageData: false,
      marketResearch: false
    },
    profileVisibility: {
      showInLeaderboard: true,
      shareEfficiencyTips: true,
      allowCommunityContact: false
    },
    dataRetention: {
      keepUsageHistory: true,
      retentionPeriod: '2years',
      autoDeleteOldData: true
    },
    marketing: {
      emailMarketing: false,
      smsMarketing: false,
      personalizedOffers: true,
      thirdPartySharing: false
    }
  });

  const [dataExportRequested, setDataExportRequested] = useState(false);
  const [accountDeletionRequested, setAccountDeletionRequested] = useState(false);

  const handleSettingChange = (category, setting, value) => {
    setPrivacySettings(prev => ({
      ...prev,
      [category]: {
        ...prev?.[category],
        [setting]: value
      }
    }));
  };

  const handleDataExport = () => {
    setDataExportRequested(true);
    // Mock data export request
  };

  const handleAccountDeletion = () => {
    setAccountDeletionRequested(true);
    // Mock account deletion request
  };

  const privacySections = [
    {
      title: 'Data Sharing Preferences',
      description: 'Control how your energy usage data is used for comparisons and programs',
      category: 'dataSharing',
      items: [
        {
          key: 'neighborhoodComparison',
          title: 'Neighborhood Comparisons',
          description: 'Allow your anonymized usage data to be used for neighborhood efficiency comparisons',
          icon: 'Users',
          recommended: true
        },
        {
          key: 'efficiencyPrograms',
          title: 'Efficiency Programs',
          description: 'Participate in utility efficiency programs and receive personalized recommendations',
          icon: 'Target',
          recommended: true
        },
        {
          key: 'anonymousUsageData',
          title: 'Anonymous Usage Analytics',
          description: 'Share anonymized usage patterns to help improve energy grid efficiency',
          icon: 'BarChart3',
          recommended: false
        },
        {
          key: 'marketResearch',
          title: 'Market Research',
          description: 'Allow your data to be used for energy market research and policy development',
          icon: 'TrendingUp',
          recommended: false
        }
      ]
    },
    {
      title: 'Profile Visibility',
      description: 'Manage your visibility in community features and leaderboards',
      category: 'profileVisibility',
      items: [
        {
          key: 'showInLeaderboard',
          title: 'Efficiency Leaderboard',
          description: 'Display your efficiency achievements on community leaderboards',
          icon: 'Trophy',
          recommended: true
        },
        {
          key: 'shareEfficiencyTips',
          title: 'Share Success Stories',
          description: 'Allow your efficiency tips and success stories to be shared with the community',
          icon: 'Lightbulb',
          recommended: true
        },
        {
          key: 'allowCommunityContact',
          title: 'Community Contact',
          description: 'Allow other community members to contact you about energy efficiency',
          icon: 'MessageCircle',
          recommended: false
        }
      ]
    },
    {
      title: 'Marketing Preferences',
      description: 'Control marketing communications and promotional offers',
      category: 'marketing',
      items: [
        {
          key: 'emailMarketing',
          title: 'Email Marketing',
          description: 'Receive promotional emails about new features and energy products',
          icon: 'Mail',
          recommended: false
        },
        {
          key: 'smsMarketing',
          title: 'SMS Marketing',
          description: 'Receive promotional SMS messages about special offers and programs',
          icon: 'MessageSquare',
          recommended: false
        },
        {
          key: 'personalizedOffers',
          title: 'Personalized Offers',
          description: 'Receive offers for energy-efficient appliances and services based on your usage',
          icon: 'Gift',
          recommended: true
        },
        {
          key: 'thirdPartySharing',
          title: 'Third-Party Sharing',
          description: 'Share your information with trusted partners for relevant offers',
          icon: 'ExternalLink',
          recommended: false
        }
      ]
    }
  ];

  return (
    <div className="energy-card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Privacy Controls</h3>
          <p className="text-sm text-text-secondary">Manage your data privacy and sharing preferences</p>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Shield" size={16} color="var(--color-success)" />
          <span className="text-sm text-success">Privacy Protected</span>
        </div>
      </div>
      {/* Privacy Sections */}
      <div className="space-y-8">
        {privacySections?.map((section) => (
          <div key={section?.category}>
            <div className="mb-4">
              <h4 className="text-md font-medium text-text-primary">{section?.title}</h4>
              <p className="text-sm text-text-secondary">{section?.description}</p>
            </div>
            
            <div className="space-y-4">
              {section?.items?.map((item) => (
                <div key={item?.key} className="flex items-start space-x-4 p-4 border border-border rounded-lg">
                  <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                    <Icon name={item?.icon} size={18} color="var(--color-primary)" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h5 className="text-sm font-medium text-text-primary">{item?.title}</h5>
                      {item?.recommended && (
                        <span className="px-2 py-1 bg-success/10 text-success text-xs font-medium rounded-full">
                          Recommended
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-text-secondary">{item?.description}</p>
                  </div>
                  <Checkbox
                    checked={privacySettings?.[section?.category]?.[item?.key]}
                    onChange={(e) => handleSettingChange(section?.category, item?.key, e?.target?.checked)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {/* Data Retention Settings */}
      <div className="mt-8 p-4 bg-surface rounded-lg">
        <h4 className="text-md font-medium text-text-primary mb-4">Data Retention</h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-text-primary">Keep Usage History</div>
              <div className="text-xs text-text-secondary">Maintain historical usage data for analytics</div>
            </div>
            <Checkbox
              checked={privacySettings?.dataRetention?.keepUsageHistory}
              onChange={(e) => handleSettingChange('dataRetention', 'keepUsageHistory', e?.target?.checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-text-primary">Auto-Delete Old Data</div>
              <div className="text-xs text-text-secondary">Automatically remove data older than 2 years</div>
            </div>
            <Checkbox
              checked={privacySettings?.dataRetention?.autoDeleteOldData}
              onChange={(e) => handleSettingChange('dataRetention', 'autoDeleteOldData', e?.target?.checked)}
            />
          </div>
        </div>
      </div>
      {/* Data Rights */}
      <div className="mt-8 p-4 bg-trust/10 rounded-lg border border-trust/20">
        <h4 className="text-md font-medium text-text-primary mb-4">Your Data Rights</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h5 className="text-sm font-medium text-text-primary mb-2">Export Your Data</h5>
            <p className="text-xs text-text-secondary mb-3">
              Download a copy of all your personal data and usage history
            </p>
            {!dataExportRequested ? (
              <Button
                variant="outline"
                size="sm"
                iconName="Download"
                onClick={handleDataExport}
              >
                Request Data Export
              </Button>
            ) : (
              <div className="flex items-center space-x-2 text-success">
                <Icon name="Clock" size={14} />
                <span className="text-xs">Export requested - you'll receive an email within 24 hours</span>
              </div>
            )}
          </div>
          
          <div>
            <h5 className="text-sm font-medium text-text-primary mb-2">Delete Your Account</h5>
            <p className="text-xs text-text-secondary mb-3">
              Permanently delete your account and all associated data
            </p>
            {!accountDeletionRequested ? (
              <Button
                variant="outline"
                size="sm"
                iconName="Trash2"
                onClick={handleAccountDeletion}
              >
                Request Account Deletion
              </Button>
            ) : (
              <div className="flex items-center space-x-2 text-warning">
                <Icon name="Clock" size={14} />
                <span className="text-xs">Deletion requested - contact support to proceed</span>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Privacy Policy Link */}
      <div className="mt-6 p-4 bg-muted rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <h5 className="text-sm font-medium text-text-primary">Privacy Policy</h5>
            <p className="text-xs text-text-secondary">
              Last updated: 15/08/2024 • Learn more about how we protect your data
            </p>
          </div>
          <Button variant="link" size="sm" iconName="ExternalLink">
            Read Policy
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyControls;