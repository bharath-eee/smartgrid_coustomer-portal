import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BillHistoryTable = ({ bills, onDownloadPDF, onViewDetails }) => {
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [filterStatus, setFilterStatus] = useState('all');

  const getStatusColor = (status) => {
    switch (status) {
      case 'Paid': return 'text-success bg-success/10';
      case 'Pending': return 'text-warning bg-warning/10';
      case 'Overdue': return 'text-error bg-error/10';
      default: return 'text-text-secondary bg-muted';
    }
  };

  const sortedBills = [...bills]?.sort((a, b) => {
    let aValue = a?.[sortBy];
    let bValue = b?.[sortBy];
    
    if (sortBy === 'date') {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    }
    return aValue < bValue ? 1 : -1;
  });

  const filteredBills = filterStatus === 'all' 
    ? sortedBills 
    : sortedBills?.filter(bill => bill?.status?.toLowerCase() === filterStatus);

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  return (
    <div className="energy-card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="History" size={20} color="var(--color-primary)" />
          <h3 className="text-lg font-semibold text-text-primary">Bill History</h3>
        </div>
        <div className="flex items-center space-x-3">
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e?.target?.value)}
            className="px-3 py-1.5 border border-border rounded-md bg-input text-sm text-text-primary"
          >
            <option value="all">All Status</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="overdue">Overdue</option>
          </select>
          <Button variant="outline" size="sm" iconName="Download">
            Export All
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4">
                <button 
                  onClick={() => handleSort('date')}
                  className="flex items-center space-x-1 text-sm font-medium text-text-secondary hover:text-text-primary"
                >
                  <span>Bill Date</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left py-3 px-4">
                <button 
                  onClick={() => handleSort('period')}
                  className="flex items-center space-x-1 text-sm font-medium text-text-secondary hover:text-text-primary"
                >
                  <span>Period</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left py-3 px-4">
                <button 
                  onClick={() => handleSort('amount')}
                  className="flex items-center space-x-1 text-sm font-medium text-text-secondary hover:text-text-primary"
                >
                  <span>Amount</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left py-3 px-4">
                <span className="text-sm font-medium text-text-secondary">Units</span>
              </th>
              <th className="text-left py-3 px-4">
                <span className="text-sm font-medium text-text-secondary">Status</span>
              </th>
              <th className="text-left py-3 px-4">
                <span className="text-sm font-medium text-text-secondary">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredBills?.map((bill) => (
              <tr key={bill?.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                <td className="py-4 px-4">
                  <div className="text-sm font-medium text-text-primary">
                    {new Date(bill.date)?.toLocaleDateString('en-IN')}
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="text-sm text-text-secondary">{bill?.period}</div>
                </td>
                <td className="py-4 px-4">
                  <div className="text-sm font-mono font-semibold text-text-primary">
                    ₹{bill?.amount?.toLocaleString('en-IN')}
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="text-sm font-mono text-text-secondary">{bill?.units}</div>
                </td>
                <td className="py-4 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(bill?.status)}`}>
                    {bill?.status}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => onViewDetails(bill?.id)}
                    >
                      <Icon name="Eye" size={16} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => onDownloadPDF(bill?.id)}
                    >
                      <Icon name="Download" size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {filteredBills?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="FileX" size={48} color="var(--color-text-secondary)" className="mx-auto mb-4" />
          <h4 className="text-lg font-medium text-text-primary mb-2">No Bills Found</h4>
          <p className="text-sm text-text-secondary">
            {filterStatus === 'all' ?'No billing history available yet.' 
              : `No bills with status "${filterStatus}" found.`
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default BillHistoryTable;