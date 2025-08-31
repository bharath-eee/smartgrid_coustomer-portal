import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const SuccessStoriesSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const successStories = [
    {
      id: 1,
      name: "Priya Sharma",
      location: "Mumbai, Maharashtra",
      category: "residential",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786",
      achievement: "Reduced monthly bill by 35%",
      savings: "₹1,850",
      period: "6 months",
      story: `After installing smart switches and optimizing my AC usage based on SmartGrid Portal's recommendations, I've saved significantly on my electricity bills. The seasonal tips were game-changers!`,
      actions: [
        "Installed programmable thermostats",
        "Switched to LED lighting throughout home",
        "Used time-of-use rate optimization",
        "Implemented smart power strips"
      ],
      beforeAfter: {
        before: "₹5,280/month",
        after: "₹3,430/month"
      },
      rating: 5,
      verified: true
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      location: "Bangalore, Karnataka",
      category: "business",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
      achievement: "Cut office energy costs by 42%",
      savings: "₹12,500",
      period: "4 months",
      story: `Running a small IT office, energy costs were eating into profits. The appliance calculator helped identify our biggest energy drains, and the optimization guide provided actionable solutions.`,
      actions: [
        "Upgraded to energy-efficient computers",
        "Implemented motion sensor lighting",
        "Optimized HVAC scheduling",
        "Added solar water heating"
      ],
      beforeAfter: {
        before: "₹29,800/month",
        after: "₹17,300/month"
      },
      rating: 5,
      verified: true
    },
    {
      id: 3,
      name: "Anita Patel",
      location: "Ahmedabad, Gujarat",
      category: "residential",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
      achievement: "Achieved carbon neutral home",
      savings: "₹2,200",
      period: "8 months",
      story: `The carbon footprint tracker motivated me to make significant changes. Combined with solar panels and energy-efficient appliances, we've achieved our goal of carbon neutrality.`,
      actions: [
        "Installed rooftop solar panels",
        "Upgraded to 5-star rated appliances",
        "Implemented rainwater harvesting",
        "Used smart home automation"
      ],
      beforeAfter: {
        before: "₹4,650/month",
        after: "₹2,450/month"
      },
      rating: 5,
      verified: true
    },
    {
      id: 4,
      name: "Vikram Singh",
      location: "Delhi, NCR",
      category: "residential",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      achievement: "Reduced peak hour consumption by 60%",
      savings: "₹1,650",
      period: "3 months",
      story: `Living in Delhi with high summer electricity costs, the time-of-use optimization tips helped me shift my usage patterns and dramatically reduce peak hour consumption.`,
      actions: [
        "Shifted laundry to off-peak hours",
        "Used timer-controlled water heating",
        "Implemented load balancing strategies",
        "Added battery backup for peak shaving"
      ],
      beforeAfter: {
        before: "₹6,200/month",
        after: "₹4,550/month"
      },
      rating: 4,
      verified: true
    }
  ];

  const categories = [
    { value: 'all', label: 'All Stories', icon: 'Users' },
    { value: 'residential', label: 'Residential', icon: 'Home' },
    { value: 'business', label: 'Business', icon: 'Building' }
  ];

  const filteredStories = selectedCategory === 'all' 
    ? successStories 
    : successStories?.filter(story => story?.category === selectedCategory);

  const totalSavings = successStories?.reduce((sum, story) => sum + parseInt(story?.savings?.replace('₹', '')?.replace(',', '')), 0);

  return (
    <div className="energy-card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-trust/10 rounded-xl flex items-center justify-center">
            <Icon name="Award" size={24} className="text-trust" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-text-primary">Success Stories</h2>
            <p className="text-sm text-text-secondary">Real customers, real savings</p>
          </div>
        </div>

        <div className="flex bg-muted rounded-lg p-1">
          {categories?.map((category) => (
            <button
              key={category?.value}
              onClick={() => setSelectedCategory(category?.value)}
              className={`flex items-center space-x-2 px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                selectedCategory === category?.value
                  ? 'bg-background text-text-primary shadow-sm'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Icon name={category?.icon} size={14} />
              <span>{category?.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Community Impact Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="p-4 bg-gradient-to-br from-success/10 to-success/5 rounded-lg border border-success/20">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="TrendingDown" size={16} className="text-success" />
            <span className="text-sm font-medium text-text-primary">Total Savings</span>
          </div>
          <div className="text-2xl font-mono font-semibold text-success">₹{totalSavings?.toLocaleString()}</div>
          <div className="text-xs text-text-secondary">Community impact</div>
        </div>

        <div className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg border border-primary/20">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Users" size={16} className="text-primary" />
            <span className="text-sm font-medium text-text-primary">Success Stories</span>
          </div>
          <div className="text-2xl font-mono font-semibold text-primary">{successStories?.length}</div>
          <div className="text-xs text-text-secondary">Verified customers</div>
        </div>

        <div className="p-4 bg-gradient-to-br from-warning/10 to-warning/5 rounded-lg border border-warning/20">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Percent" size={16} className="text-warning" />
            <span className="text-sm font-medium text-text-primary">Avg Reduction</span>
          </div>
          <div className="text-2xl font-mono font-semibold text-warning">38%</div>
          <div className="text-xs text-text-secondary">Bill reduction</div>
        </div>
      </div>
      {/* Success Stories Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {filteredStories?.map((story) => (
          <div key={story?.id} className="p-6 bg-surface rounded-lg border hover-lift">
            <div className="flex items-start space-x-4 mb-4">
              <div className="relative">
                <Image
                  src={story?.avatar}
                  alt={story?.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                {story?.verified && (
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-success rounded-full flex items-center justify-center">
                    <Icon name="Check" size={12} color="white" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="font-semibold text-text-primary">{story?.name}</h3>
                  <div className="flex">
                    {[...Array(story?.rating)]?.map((_, i) => (
                      <Icon key={i} name="Star" size={12} className="text-warning fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-text-secondary">{story?.location}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <span className="text-sm font-medium text-success">{story?.achievement}</span>
                  <span className="text-xs text-text-secondary">• {story?.period}</span>
                </div>
              </div>
            </div>

            <blockquote className="text-sm text-text-primary mb-4 italic">
              "{story?.story}"
            </blockquote>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="p-3 bg-error/5 rounded-lg border border-error/20">
                <div className="text-xs text-text-secondary mb-1">Before</div>
                <div className="font-mono font-semibold text-error">{story?.beforeAfter?.before}</div>
              </div>
              <div className="p-3 bg-success/5 rounded-lg border border-success/20">
                <div className="text-xs text-text-secondary mb-1">After</div>
                <div className="font-mono font-semibold text-success">{story?.beforeAfter?.after}</div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-medium text-text-primary">Key Actions Taken:</h4>
              <div className="grid grid-cols-2 gap-2">
                {story?.actions?.map((action, index) => (
                  <div key={index} className="flex items-center space-x-2 text-xs">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    <span className="text-text-secondary">{action}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
              <div className="flex items-center space-x-2">
                <Icon name="TrendingDown" size={14} className="text-success" />
                <span className="text-sm font-semibold text-success">Saved {story?.savings}/month</span>
              </div>
              <Button variant="ghost" size="sm" iconName="ExternalLink">
                View Details
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center">
        <div className="p-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg">
          <h3 className="text-lg font-semibold text-text-primary mb-2">Share Your Success Story</h3>
          <p className="text-sm text-text-secondary mb-4">
            Help inspire others by sharing your energy-saving journey and achievements
          </p>
          <Button variant="default" iconName="Plus">
            Submit Your Story
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SuccessStoriesSection;