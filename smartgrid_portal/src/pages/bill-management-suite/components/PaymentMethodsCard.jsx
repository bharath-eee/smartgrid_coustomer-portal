import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PaymentMethodsCard = ({ savedMethods, onAddMethod, onSetDefault, onRemoveMethod }) => {
  const [showAll, setShowAll] = useState(false);

  const paymentIcons = {
    'UPI': 'Smartphone',
    'Credit Card': 'CreditCard',
    'Debit Card': 'CreditCard',
    'Net Banking': 'Building2',
    'Wallet': 'Wallet'
  };

  const displayedMethods = showAll ? savedMethods : savedMethods?.slice(0, 3);

  return (
    <div className="energy-card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="Wallet" size={20} color="var(--color-primary)" />
          <h3 className="text-lg font-semibold text-text-primary">Payment Methods</h3>
        </div>
        <Button 
          variant="outline" 
          size="sm"
          iconName="Plus"
          iconPosition="left"
          onClick={onAddMethod}
        >
          Add Method
        </Button>
      </div>
      <div className="space-y-3">
        {displayedMethods?.map((method) => (
          <div key={method?.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name={paymentIcons?.[method?.type]} size={18} color="var(--color-primary)" />
              </div>
              <div>
                <div className="font-medium text-text-primary">{method?.name}</div>
                <div className="text-sm text-text-secondary">{method?.details}</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {method?.isDefault && (
                <span className="px-2 py-1 bg-success/10 text-success text-xs font-medium rounded-full">
                  Default
                </span>
              )}
              <div className="flex space-x-1">
                {!method?.isDefault && (
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => onSetDefault(method?.id)}
                  >
                    <Icon name="Star" size={16} />
                  </Button>
                )}
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => onRemoveMethod(method?.id)}
                >
                  <Icon name="Trash2" size={16} />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {savedMethods?.length > 3 && (
        <Button 
          variant="ghost" 
          className="w-full mt-4"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? 'Show Less' : `Show ${savedMethods?.length - 3} More`}
          <Icon name={showAll ? "ChevronUp" : "ChevronDown"} size={16} className="ml-2" />
        </Button>
      )}
      <div className="mt-6 p-4 bg-trust/10 border border-trust/20 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="Shield" size={16} color="var(--color-trust)" />
          <span className="text-sm font-medium text-trust">Secure Payments</span>
        </div>
        <p className="text-xs text-text-secondary">
          All payment methods are encrypted and secured with bank-grade security protocols.
        </p>
      </div>
    </div>
  );
};

export default PaymentMethodsCard;