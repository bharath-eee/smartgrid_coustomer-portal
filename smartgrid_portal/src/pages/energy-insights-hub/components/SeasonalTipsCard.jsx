import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const SeasonalTipsCard = () => {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  const seasonalTips = [
    {
      id: 1,
      season: "Monsoon",
      title: "Humidity Control & Energy Savings",
      description: "Optimize your energy usage during the monsoon season with smart humidity management and efficient appliance usage.",
      tips: [
        "Use ceiling fans instead of AC when humidity is manageable",
        "Keep windows closed during peak humidity hours (6 AM - 10 AM)",
        "Use dehumidifiers in small spaces rather than cooling entire rooms",
        "Dry clothes indoors with proper ventilation to avoid mold"
      ],
      potentialSavings: "₹800-1,200",
      difficulty: "Easy",
      image: "https://images.pexels.com/photos/1463917/pexels-photo-1463917.jpeg",
      icon: "CloudRain",
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      id: 2,
      season: "Summer",
      title: "Beat the Heat Efficiently",
      description: "Stay cool while keeping your electricity bills under control with these proven summer strategies.",
      tips: [
        "Set AC temperature to 24°C for optimal efficiency",
        "Use programmable thermostats to avoid overcooling",
        "Install reflective window films to reduce heat gain",
        "Schedule high-energy tasks during off-peak hours"
      ],
      potentialSavings: "₹1,500-2,500",
      difficulty: "Medium",
      image: "https://images.pexels.com/photos/1036936/pexels-photo-1036936.jpeg",
      icon: "Sun",
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    },
    {
      id: 3,
      season: "Winter",
      title: "Warm & Efficient Living",
      description: "Maintain comfortable temperatures without excessive energy consumption during cooler months.",
      tips: [
        "Use room heaters only in occupied spaces",
        "Layer clothing before increasing heating",
        "Seal gaps around windows and doors",
        "Use solar heating during sunny winter days"
      ],
      potentialSavings: "₹600-1,000",
      difficulty: "Easy",
      image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
      icon: "Snowflake",
      color: "text-cyan-600",
      bgColor: "bg-cyan-50"
    }
  ];

  const currentTip = seasonalTips?.[currentTipIndex];

  const nextTip = () => {
    setCurrentTipIndex((prev) => (prev + 1) % seasonalTips?.length);
  };

  const prevTip = () => {
    setCurrentTipIndex((prev) => (prev - 1 + seasonalTips?.length) % seasonalTips?.length);
  };

  return (
    <div className="energy-card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 ${currentTip?.bgColor} rounded-xl flex items-center justify-center`}>
            <Icon name={currentTip?.icon} size={24} className={currentTip?.color} />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-text-primary">Seasonal Energy Tips</h2>
            <p className="text-sm text-text-secondary">Optimize for current weather conditions</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={prevTip}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted transition-colors"
          >
            <Icon name="ChevronLeft" size={16} />
          </button>
          <span className="text-sm text-text-secondary">
            {currentTipIndex + 1} of {seasonalTips?.length}
          </span>
          <button
            onClick={nextTip}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted transition-colors"
          >
            <Icon name="ChevronRight" size={16} />
          </button>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="relative h-48 rounded-lg overflow-hidden">
            <Image
              src={currentTip?.image}
              alt={`${currentTip?.season} energy tips`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div className="absolute bottom-4 left-4 text-white">
              <div className="text-sm font-medium opacity-90">{currentTip?.season} Season</div>
              <div className="text-lg font-semibold">{currentTip?.title}</div>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="TrendingDown" size={16} className="text-success" />
              <span className="text-sm font-medium text-text-primary">Potential Savings</span>
            </div>
            <span className="text-sm font-semibold text-success">{currentTip?.potentialSavings}/month</span>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-text-secondary">{currentTip?.description}</p>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-text-primary">Action Items</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                currentTip?.difficulty === 'Easy' ? 'bg-success/10 text-success' :
                currentTip?.difficulty === 'Medium'? 'bg-warning/10 text-warning' : 'bg-error/10 text-error'
              }`}>
                {currentTip?.difficulty}
              </span>
            </div>
            
            <div className="space-y-2">
              {currentTip?.tips?.map((tip, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-surface rounded-lg">
                  <div className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center mt-0.5">
                    <Icon name="Check" size={12} className="text-primary" />
                  </div>
                  <span className="text-sm text-text-primary flex-1">{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeasonalTipsCard;