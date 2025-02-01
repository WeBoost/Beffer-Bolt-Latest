import React from 'react';
import { Clock, CheckCircle, XCircle, MessageSquare } from 'lucide-react';

interface QuoteStatusProps {
  status: 'pending' | 'in_review' | 'approved' | 'rejected';
  quoteNumber: string;
  submittedDate: string;
  reviewDate?: string;
  amount?: number;
  notes?: string;
  onAccept?: () => void;
  onReject?: () => void;
  onMessage?: () => void;
}

export function QuoteStatus({
  status,
  quoteNumber,
  submittedDate,
  reviewDate,
  amount,
  notes,
  onAccept,
  onReject,
  onMessage
}: QuoteStatusProps) {
  const getStatusColor = () => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in_review':
        return 'bg-blue-100 text-blue-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'pending':
        return 'Pending Review';
      case 'in_review':
        return 'In Review';
      case 'approved':
        return 'Quote Approved';
      case 'rejected':
        return 'Quote Rejected';
      default:
        return 'Unknown Status';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-6 border-b">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Quote #{quoteNumber}
          </h2>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor()}`}
          >
            {getStatusText()}
          </span>
        </div>
        <div className="flex items-center gap-6 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Clock size={16} />
            Submitted: {submittedDate}
          </div>
          {reviewDate && (
            <div className="flex items-center gap-2">
              <CheckCircle size={16} />
              Reviewed: {reviewDate}
            </div>
          )}
        </div>
      </div>

      <div className="p-6">
        {amount && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Quote Amount
            </h3>
            <div className="text-3xl font-bold text-gray-900">
              ${amount.toFixed(2)}
            </div>
          </div>
        )}

        {notes && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Notes</h3>
            <p className="text-gray-600 whitespace-pre-line">{notes}</p>
          </div>
        )}

        <div className="flex items-center gap-4">
          {status === 'in_review' && (
            <>
              <button
                onClick={onAccept}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                <CheckCircle size={20} />
                Accept Quote
              </button>
              <button
                onClick={onReject}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
              >
                <XCircle size={20} />
                Reject Quote
              </button>
            </>
          )}
          <button
            onClick={onMessage}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
          >
            <MessageSquare size={20} />
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
}