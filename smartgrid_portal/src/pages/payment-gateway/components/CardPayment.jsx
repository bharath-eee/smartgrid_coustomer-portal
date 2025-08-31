import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const CardPayment = ({ amount, onPaymentSuccess, onBack }) => {
  const [cardData, setCardData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [saveCard, setSaveCard] = useState(false);

  const savedCards = [
    {
      id: 1,
      number: '**** **** **** 1234',
      name: 'JOHN DOE',
      expiry: '12/26',
      type: 'visa',
      bank: 'HDFC Bank'
    },
    {
      id: 2,
      number: '**** **** **** 5678',
      name: 'JOHN DOE',
      expiry: '08/25',
      type: 'mastercard',
      bank: 'ICICI Bank'
    }
  ];

  const getCardType = (number) => {
    const firstDigit = number?.charAt(0);
    if (firstDigit === '4') return 'visa';
    if (firstDigit === '5') return 'mastercard';
    if (firstDigit === '3') return 'amex';
    return 'card';
  };

  const getCardIcon = (type) => {
    const iconMap = {
      visa: 'CreditCard',
      mastercard: 'CreditCard',
      amex: 'CreditCard',
      card: 'CreditCard'
    };
    return iconMap?.[type] || 'CreditCard';
  };

  const formatCardNumber = (value) => {
    const v = value?.replace(/\s+/g, '')?.replace(/[^0-9]/gi, '');
    const matches = v?.match(/\d{4,16}/g);
    const match = matches && matches?.[0] || '';
    const parts = [];
    for (let i = 0, len = match?.length; i < len; i += 4) {
      parts?.push(match?.substring(i, i + 4));
    }
    if (parts?.length) {
      return parts?.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiry = (value) => {
    const v = value?.replace(/\s+/g, '')?.replace(/[^0-9]/gi, '');
    if (v?.length >= 2) {
      return v?.substring(0, 2) + '/' + v?.substring(2, 4);
    }
    return v;
  };

  const handleInputChange = (field, value) => {
    let formattedValue = value;
    
    if (field === 'number') {
      formattedValue = formatCardNumber(value);
    } else if (field === 'expiry') {
      formattedValue = formatExpiry(value);
    } else if (field === 'cvv') {
      formattedValue = value?.replace(/[^0-9]/g, '')?.substring(0, 4);
    }
    
    setCardData(prev => ({
      ...prev,
      [field]: formattedValue
    }));
  };

  const handleCardPayment = async () => {
    setIsProcessing(true);
    
    // Mock payment processing
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentSuccess({
        method: 'Card',
        transactionId: 'CARD' + Date.now(),
        amount: amount,
        timestamp: new Date()?.toISOString(),
        cardLast4: cardData?.number?.slice(-4)
      });
    }, 4000);
  };

  const handleSavedCardPayment = (card) => {
    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentSuccess({
        method: 'Saved Card',
        transactionId: 'SAVED' + Date.now(),
        amount: amount,
        timestamp: new Date()?.toISOString(),
        cardLast4: card?.number?.slice(-4)
      });
    }, 3000);
  };

  const isFormValid = cardData?.number?.length >= 19 && 
                     cardData?.name?.length >= 2 && 
                     cardData?.expiry?.length === 5 && 
                     cardData?.cvv?.length >= 3;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <Icon name="ArrowLeft" size={20} />
        </Button>
        <div>
          <h2 className="text-xl font-semibold text-text-primary">Card Payment</h2>
          <p className="text-sm text-text-secondary">Pay securely with your card</p>
        </div>
      </div>
      {/* Saved Cards */}
      {savedCards?.length > 0 && (
        <div>
          <h3 className="text-lg font-medium text-text-primary mb-4">Saved Cards</h3>
          <div className="space-y-3">
            {savedCards?.map((card) => (
              <div
                key={card?.id}
                className="border border-border rounded-lg p-4 hover:border-primary/50 hover:shadow-energy transition-all cursor-pointer"
                onClick={() => handleSavedCardPayment(card)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-8 bg-gradient-to-r from-primary to-secondary rounded flex items-center justify-center">
                      <Icon name={getCardIcon(card?.type)} size={20} color="white" />
                    </div>
                    <div>
                      <div className="font-mono text-text-primary">{card?.number}</div>
                      <div className="text-sm text-text-secondary">{card?.bank}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-text-secondary">Expires</div>
                    <div className="font-mono text-text-primary">{card?.expiry}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex items-center space-x-4 my-6">
            <div className="flex-1 border-t border-border"></div>
            <span className="text-sm text-text-secondary">or use new card</span>
            <div className="flex-1 border-t border-border"></div>
          </div>
        </div>
      )}
      {/* New Card Form */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-text-primary">Add New Card</h3>
        
        {/* Card Preview */}
        <div className="relative">
          <div className="w-full h-48 bg-gradient-to-r from-primary via-secondary to-trust rounded-xl p-6 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-8">
                <Icon name="Wifi" size={24} />
                <Icon name={getCardIcon(getCardType(cardData?.number))} size={32} />
              </div>
              
              <div className="font-mono text-xl tracking-wider mb-4">
                {cardData?.number || '**** **** **** ****'}
              </div>
              
              <div className="flex justify-between items-end">
                <div>
                  <div className="text-xs opacity-80">CARDHOLDER NAME</div>
                  <div className="font-medium">
                    {cardData?.name || 'YOUR NAME'}
                  </div>
                </div>
                <div>
                  <div className="text-xs opacity-80">EXPIRES</div>
                  <div className="font-mono">
                    {cardData?.expiry || 'MM/YY'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 gap-4">
          <Input
            label="Card Number"
            type="text"
            placeholder="1234 5678 9012 3456"
            value={cardData?.number}
            onChange={(e) => handleInputChange('number', e?.target?.value)}
            maxLength={19}
          />
          
          <Input
            label="Cardholder Name"
            type="text"
            placeholder="JOHN DOE"
            value={cardData?.name}
            onChange={(e) => handleInputChange('name', e?.target?.value?.toUpperCase())}
          />
          
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Expiry Date"
              type="text"
              placeholder="MM/YY"
              value={cardData?.expiry}
              onChange={(e) => handleInputChange('expiry', e?.target?.value)}
              maxLength={5}
            />
            
            <Input
              label="CVV"
              type="password"
              placeholder="123"
              value={cardData?.cvv}
              onChange={(e) => handleInputChange('cvv', e?.target?.value)}
              maxLength={4}
            />
          </div>
        </div>

        {/* Save Card Option */}
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="saveCard"
            checked={saveCard}
            onChange={(e) => setSaveCard(e?.target?.checked)}
            className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
          />
          <label htmlFor="saveCard" className="text-sm text-text-secondary">
            Save this card for future payments
          </label>
        </div>

        {/* Payment Button */}
        <Button
          variant="default"
          onClick={handleCardPayment}
          loading={isProcessing}
          disabled={!isFormValid}
          className="w-full"
        >
          Pay ₹{amount?.toLocaleString('en-IN')}
        </Button>
      </div>
      {/* Security Info */}
      <div className="bg-trust/10 border border-trust/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Lock" size={20} className="text-trust mt-0.5" />
          <div>
            <h3 className="font-medium text-trust mb-1">Secure Payment</h3>
            <p className="text-sm text-trust/80">
              Your card details are encrypted and processed securely. We are PCI DSS compliant and never store your CVV.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardPayment;