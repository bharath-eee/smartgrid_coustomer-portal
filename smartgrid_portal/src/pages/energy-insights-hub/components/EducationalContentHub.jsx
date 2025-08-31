import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const EducationalContentHub = () => {
  const [selectedCategory, setSelectedCategory] = useState('efficiency');
  const [searchQuery, setSearchQuery] = useState('');

  const contentCategories = [
    { id: 'efficiency', label: 'Energy Efficiency', icon: 'Lightbulb', count: 12 },
    { id: 'appliances', label: 'Appliance Tips', icon: 'Zap', count: 8 },
    { id: 'seasonal', label: 'Seasonal Guides', icon: 'Calendar', count: 6 },
    { id: 'technology', label: 'Smart Technology', icon: 'Smartphone', count: 10 },
    { id: 'billing', label: 'Understanding Bills', icon: 'Receipt', count: 5 }
  ];

  const educationalContent = {
    efficiency: [
      {
        id: 1,
        title: "10 Simple Ways to Reduce Energy Consumption",
        description: "Practical tips that can immediately impact your electricity bill without major investments.",
        readTime: "5 min read",
        difficulty: "Beginner",
        image: "https://images.pexels.com/photos/1036936/pexels-photo-1036936.jpeg",
        tags: ["Quick Wins", "Cost Savings", "Home Improvement"],
        views: 2847,
        rating: 4.8
      },
      {
        id: 2,
        title: "LED vs Traditional Lighting: Complete Cost Analysis",
        description: "Comprehensive comparison of lighting options with real-world savings calculations.",
        readTime: "8 min read",
        difficulty: "Intermediate",
        image: "https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg",
        tags: ["Lighting", "ROI Analysis", "Technology"],
        views: 1923,
        rating: 4.6
      },
      {
        id: 3,
        title: "Home Insulation: The Ultimate Energy Efficiency Guide",
        description: "How proper insulation can reduce your heating and cooling costs by up to 40%.",
        readTime: "12 min read",
        difficulty: "Advanced",
        image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
        tags: ["Insulation", "HVAC", "Long-term Savings"],
        views: 1456,
        rating: 4.9
      }
    ],
    appliances: [
      {
        id: 4,
        title: "Air Conditioner Optimization: Stay Cool, Save Money",
        description: "Expert tips for maximizing AC efficiency during peak summer months.",
        readTime: "6 min read",
        difficulty: "Beginner",
        image: "https://images.pexels.com/photos/1036936/pexels-photo-1036936.jpeg",
        tags: ["AC", "Summer Tips", "Temperature Control"],
        views: 3421,
        rating: 4.7
      },
      {
        id: 5,
        title: "Refrigerator Efficiency: Keep Food Fresh, Bills Low",
        description: "Maintenance tips and usage patterns that can reduce refrigerator energy consumption.",
        readTime: "4 min read",
        difficulty: "Beginner",
        image: "https://images.pexels.com/photos/2343468/pexels-photo-2343468.jpeg",
        tags: ["Refrigerator", "Maintenance", "Food Storage"],
        views: 1876,
        rating: 4.5
      }
    ],
    seasonal: [
      {
        id: 6,
        title: "Monsoon Energy Management: Humidity & Efficiency",
        description: "Navigate the challenges of monsoon season while maintaining energy efficiency.",
        readTime: "7 min read",
        difficulty: "Intermediate",
        image: "https://images.pexels.com/photos/1463917/pexels-photo-1463917.jpeg",
        tags: ["Monsoon", "Humidity", "Weather"],
        views: 2134,
        rating: 4.6
      }
    ],
    technology: [
      {
        id: 7,
        title: "Smart Home Automation: ROI and Implementation",
        description: "Complete guide to smart home technology and its impact on energy consumption.",
        readTime: "15 min read",
        difficulty: "Advanced",
        image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
        tags: ["Smart Home", "Automation", "IoT"],
        views: 1654,
        rating: 4.8
      }
    ],
    billing: [
      {
        id: 8,
        title: "Understanding Time-of-Use Rates",
        description: "How to read and optimize your consumption based on variable electricity rates.",
        readTime: "10 min read",
        difficulty: "Intermediate",
        image: "https://images.pexels.com/photos/1036936/pexels-photo-1036936.jpeg",
        tags: ["Billing", "Rates", "Time-of-Use"],
        views: 2567,
        rating: 4.7
      }
    ]
  };

  const currentContent = educationalContent?.[selectedCategory] || [];
  const filteredContent = currentContent?.filter(item =>
    item?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
    item?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
    item?.tags?.some(tag => tag?.toLowerCase()?.includes(searchQuery?.toLowerCase()))
  );

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'text-success bg-success/10';
      case 'Intermediate': return 'text-warning bg-warning/10';
      case 'Advanced': return 'text-error bg-error/10';
      default: return 'text-text-secondary bg-muted';
    }
  };

  return (
    <div className="energy-card">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-trust/10 rounded-xl flex items-center justify-center">
          <Icon name="BookOpen" size={24} className="text-trust" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-text-primary">Educational Content Hub</h2>
          <p className="text-sm text-text-secondary">Learn to optimize your energy usage</p>
        </div>
      </div>
      {/* Search and Categories */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Icon name="Search" size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
          <input
            type="text"
            placeholder="Search articles, guides, and tips..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e?.target?.value)}
            className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {contentCategories?.map((category) => (
            <button
              key={category?.id}
              onClick={() => setSelectedCategory(category?.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === category?.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-text-secondary hover:text-text-primary hover:bg-muted/80'
              }`}
            >
              <Icon name={category?.icon} size={14} />
              <span>{category?.label}</span>
              <span className="text-xs opacity-75">({category?.count})</span>
            </button>
          ))}
        </div>
      </div>
      {/* Content Grid */}
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredContent?.map((content) => (
          <div key={content?.id} className="bg-surface rounded-lg border hover-lift overflow-hidden">
            <div className="relative h-48 overflow-hidden">
              <Image
                src={content?.image}
                alt={content?.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute top-3 right-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(content?.difficulty)}`}>
                  {content?.difficulty}
                </span>
              </div>
              <div className="absolute bottom-3 left-3 right-3">
                <div className="flex items-center space-x-2 text-white text-sm">
                  <Icon name="Clock" size={14} />
                  <span>{content?.readTime}</span>
                  <span>•</span>
                  <div className="flex items-center space-x-1">
                    <Icon name="Eye" size={14} />
                    <span>{content?.views?.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4">
              <h3 className="font-semibold text-text-primary mb-2 line-clamp-2">{content?.title}</h3>
              <p className="text-sm text-text-secondary mb-4 line-clamp-3">{content?.description}</p>

              <div className="flex flex-wrap gap-1 mb-4">
                {content?.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <div className="flex">
                    {[...Array(5)]?.map((_, i) => (
                      <Icon
                        key={i}
                        name="Star"
                        size={12}
                        className={i < Math.floor(content?.rating) ? 'text-warning fill-current' : 'text-muted'}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-text-secondary">({content?.rating})</span>
                </div>
                <Button variant="ghost" size="sm" iconName="ArrowRight">
                  Read More
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {filteredContent?.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Search" size={32} className="text-text-secondary" />
          </div>
          <h3 className="font-medium text-text-primary mb-2">No content found</h3>
          <p className="text-sm text-text-secondary">
            Try adjusting your search terms or browse different categories
          </p>
        </div>
      )}
      {/* Featured Video Section */}
      <div className="mt-8 p-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
            <Icon name="Play" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-text-primary">Featured Video Series</h3>
            <p className="text-sm text-text-secondary">Energy Efficiency Masterclass</p>
          </div>
        </div>
        <p className="text-sm text-text-primary mb-4">
          Join our comprehensive video series covering advanced energy optimization techniques, 
          smart home integration, and seasonal efficiency strategies.
        </p>
        <div className="flex space-x-3">
          <Button variant="default" iconName="Play">
            Watch Now
          </Button>
          <Button variant="outline" iconName="Bookmark">
            Save for Later
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EducationalContentHub;