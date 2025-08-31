import React from 'react';
import Icon from '../../../components/AppIcon';

const PaymentProgress = ({ currentStep, steps }) => {
  const defaultSteps = [
    { id: 1, name: 'Select Method', icon: 'CreditCard' },
    { id: 2, name: 'Enter Details', icon: 'Edit' },
    { id: 3, name: 'Confirm Payment', icon: 'Shield' },
    { id: 4, name: 'Complete', icon: 'CheckCircle' }
  ];

  const progressSteps = steps || defaultSteps;

  return (
    <div className="w-full">
      {/* Mobile Progress Bar */}
      <div className="md:hidden mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-text-primary">
            Step {currentStep} of {progressSteps?.length}
          </span>
          <span className="text-sm text-text-secondary">
            {Math.round((currentStep / progressSteps?.length) * 100)}%
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / progressSteps?.length) * 100}%` }}
          ></div>
        </div>
      </div>
      {/* Desktop Step Indicator */}
      <div className="hidden md:block">
        <nav aria-label="Payment progress">
          <ol className="flex items-center justify-between">
            {progressSteps?.map((step, index) => {
              const stepNumber = index + 1;
              const isCompleted = stepNumber < currentStep;
              const isCurrent = stepNumber === currentStep;
              const isUpcoming = stepNumber > currentStep;

              return (
                <li key={step?.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center">
                    {/* Step Circle */}
                    <div className={`
                      relative flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-200
                      ${isCompleted 
                        ? 'bg-success border-success text-white' 
                        : isCurrent 
                          ? 'bg-primary border-primary text-white animate-pulse-soft' :'bg-background border-border text-text-secondary'
                      }
                    `}>
                      {isCompleted ? (
                        <Icon name="Check" size={16} strokeWidth={2.5} />
                      ) : (
                        <Icon 
                          name={step?.icon} 
                          size={16} 
                          className={isCurrent ? 'text-white' : 'text-text-secondary'}
                        />
                      )}
                      
                      {isCurrent && (
                        <div className="absolute inset-0 rounded-full border-2 border-primary animate-ping"></div>
                      )}
                    </div>

                    {/* Step Label */}
                    <div className="mt-2 text-center">
                      <div className={`text-sm font-medium ${
                        isCompleted || isCurrent ? 'text-text-primary' : 'text-text-secondary'
                      }`}>
                        {step?.name}
                      </div>
                      <div className="text-xs text-text-secondary mt-1">
                        Step {stepNumber}
                      </div>
                    </div>
                  </div>
                  {/* Connector Line */}
                  {index < progressSteps?.length - 1 && (
                    <div className="flex-1 mx-4">
                      <div className={`h-0.5 transition-all duration-300 ${
                        stepNumber < currentStep ? 'bg-success' : 'bg-border'
                      }`}></div>
                    </div>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
      {/* Current Step Info */}
      <div className="mt-6 p-4 bg-muted rounded-lg">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon 
              name={progressSteps?.[currentStep - 1]?.icon || 'Info'} 
              size={16} 
              className="text-primary" 
            />
          </div>
          <div>
            <div className="font-medium text-text-primary">
              {progressSteps?.[currentStep - 1]?.name || 'Current Step'}
            </div>
            <div className="text-sm text-text-secondary">
              {currentStep === 1 && "Choose your preferred payment method"}
              {currentStep === 2 && "Enter your payment details securely"}
              {currentStep === 3 && "Review and confirm your payment"}
              {currentStep === 4 && "Payment completed successfully"}
            </div>
          </div>
        </div>
      </div>
      {/* Security Indicator */}
      <div className="mt-4 flex items-center justify-center space-x-2 text-sm text-text-secondary">
        <Icon name="Lock" size={14} className="text-success" />
        <span>Secured by 256-bit SSL encryption</span>
      </div>
    </div>
  );
};

export default PaymentProgress;