import React from 'react';
import Icon from '../../../components/AppIcon';


const PaymentMethodCard = ({ 
  method, 
  isSelected, 
  onSelect, 
  isRecommended = false,
  disabled = false 
}) => {
  const getMethodIcon = (type) => {
    const iconMap = {
      upi: 'Smartphone',
      wallet: 'Wallet',
      netbanking: 'Building2',
      card: 'CreditCard',
      saved: 'Bookmark'
    };
    return iconMap?.[type] || 'CreditCard';
  };

  const getMethodColor = (type) => {
    const colorMap = {
      upi: 'text-success',
      wallet: 'text-warning',
      netbanking: 'text-trust',
      card: 'text-primary',
      saved: 'text-secondary'
    };
    return colorMap?.[type] || 'text-primary';
  };

  const getBgColor = (type) => {
    const bgMap = {
      upi: 'bg-success/10',
      wallet: 'bg-warning/10',
      netbanking: 'bg-trust/10',
      card: 'bg-primary/10',
      saved: 'bg-secondary/10'
    };
    return bgMap?.[type] || 'bg-primary/10';
  };

  return (
    <div className={`
      relative border-2 rounded-lg p-4 cursor-pointer transition-all duration-200
      ${isSelected 
        ? 'border-primary bg-primary/5 shadow-energy-md' 
        : 'border-border hover:border-primary/50 hover:shadow-energy'
      }
      ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover-lift'}
    `}
    onClick={() => !disabled && onSelect(method)}
    >
      {isRecommended && (
        <div className="absolute -top-2 left-4 px-2 py-1 bg-success text-success-foreground text-xs font-medium rounded">
          Recommended
        </div>
      )}
      <div className="flex items-center space-x-4">
        <div className={`
          flex items-center justify-center w-12 h-12 rounded-lg
          ${getBgColor(method?.type)}
        `}>
          <Icon 
            name={getMethodIcon(method?.type)} 
            size={24} 
            className={getMethodColor(method?.type)}
          />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <h3 className="font-semibold text-text-primary">{method?.name}</h3>
            {method?.isSecure && (
              <Icon name="Shield" size={16} className="text-success" />
            )}
          </div>
          <p className="text-sm text-text-secondary">{method?.description}</p>
          {method?.processingTime && (
            <p className="text-xs text-text-secondary mt-1">
              Processing: {method?.processingTime}
            </p>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          {method?.discount && (
            <span className="px-2 py-1 bg-success/10 text-success text-xs font-medium rounded">
              {method?.discount}% off
            </span>
          )}
          <div className={`
            w-5 h-5 rounded-full border-2 flex items-center justify-center
            ${isSelected ? 'border-primary bg-primary' : 'border-border'}
          `}>
            {isSelected && (
              <Icon name="Check" size={12} color="white" />
            )}
          </div>
        </div>
      </div>
      {method?.logos && (
        <div className="flex items-center space-x-2 mt-3 pt-3 border-t border-border">
          <span className="text-xs text-text-secondary">Supported:</span>
          <div className="flex items-center space-x-1">
            {method?.logos?.map((logo, index) => (
              <div key={index} className="w-6 h-6 bg-muted rounded flex items-center justify-center">
                <span className="text-xs font-medium">{logo}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentMethodCard;