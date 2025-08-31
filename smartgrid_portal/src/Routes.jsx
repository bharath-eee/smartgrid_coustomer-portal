import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import EnergyInsightsHub from './pages/energy-insights-hub';
import SmartDashboardHomepage from './pages/smart-dashboard-homepage';
import ConsumptionAnalyticsCenter from './pages/consumption-analytics-center';
import PaymentGateway from './pages/payment-gateway';
import AccountSettingsHub from './pages/account-settings-hub';
import BillManagementSuite from './pages/bill-management-suite';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AccountSettingsHub />} />
        <Route path="/energy-insights-hub" element={<EnergyInsightsHub />} />
        <Route path="/smart-dashboard-homepage" element={<SmartDashboardHomepage />} />
        <Route path="/consumption-analytics-center" element={<ConsumptionAnalyticsCenter />} />
        <Route path="/payment-gateway" element={<PaymentGateway />} />
        <Route path="/account-settings-hub" element={<AccountSettingsHub />} />
        <Route path="/bill-management-suite" element={<BillManagementSuite />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
