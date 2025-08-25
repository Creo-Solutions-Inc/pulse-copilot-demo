'use client';

import React from 'react';
import Card from '@/components/Card';
import { Eye } from 'lucide-react';

interface CallDetail {
  time: string;
  internalNumber: string;
  externalNumber: string;
  type: string;
  sentiment: 'Positive' | 'Neutral' | 'Negative';
  summary: string;
  actionItems: string[];
}

const callDetails: CallDetail[] = [
  {
    time: '12:30:00',
    internalNumber: '+1-555-0101',
    externalNumber: '+1-555-0202',
    type: 'Inbound',
    sentiment: 'Positive',
    summary: 'Customer inquired about product features and...',
    actionItems: [
      'Follow up with pricing proposal',
      'Schedule demo for next week'
    ]
  },
  {
    time: '13:15:00',
    internalNumber: '+1-555-0102',
    externalNumber: '+1-555-0303',
    type: 'Outbound',
    sentiment: 'Neutral',
    summary: 'Proactive call to existing customer. Discussed ...',
    actionItems: [
      'Send renewal reminder',
      'Update customer preferences'
    ]
  },
  {
    time: '16:20:00',
    internalNumber: '+1-555-0101',
    externalNumber: '+1-555-0505',
    type: 'Inbound',
    sentiment: 'Negative',
    summary: 'Customer complaint about service quality. Esc...',
    actionItems: [
      'Escalate to support team',
      'Schedule follow-up call',
      'Review service procedures',
      'Process upgrade paperwork'
    ]
  }
];

const metrics = {
  totalCalls: 8,
  completed: 6,
  missed: 2,
  actionItems: 17
};

export default function EndOfDayMailboxPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-2">End-of-Day Email Preview</h1>
      <p className="text-gray-600 mb-6">Preview how daily call summaries will appear in emails</p>

      <Card>
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-medium mb-2">Email Preview</h2>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Subject:</p>
                <p className="font-medium">Daily Call Recap - 31/07/2025</p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Introduction:</p>
                <p>Your daily summary of all calls, including key metrics and action items for tomorrow.</p>
              </div>

              <div>
                <h3 className="font-medium mb-4">Daily Summary</h3>
                <div className="grid grid-cols-4 gap-4 mb-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">{metrics.totalCalls}</p>
                    <p className="text-sm text-gray-600">Total Calls</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">{metrics.completed}</p>
                    <p className="text-sm text-gray-600">Completed</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-red-600">{metrics.missed}</p>
                    <p className="text-sm text-gray-600">Missed</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600">{metrics.actionItems}</p>
                    <p className="text-sm text-gray-600">Action Items</p>
                  </div>
                </div>
              </div>

              <div>
                <p className="mb-2">Call Details:</p>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <th className="px-4 py-2">TIME</th>
                        <th className="px-4 py-2">INTERNAL #</th>
                        <th className="px-4 py-2">EXTERNAL #</th>
                        <th className="px-4 py-2">TYPE</th>
                        <th className="px-4 py-2">SENTIMENT</th>
                        <th className="px-4 py-2">SUMMARY</th>
                        <th className="px-4 py-2">ACTION ITEM</th>
                        <th className="px-4 py-2"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {callDetails.map((call, index) => (
                        <tr key={index} className="text-sm">
                          <td className="px-4 py-3">{call.time}</td>
                          <td className="px-4 py-3">{call.internalNumber}</td>
                          <td className="px-4 py-3">{call.externalNumber}</td>
                          <td className="px-4 py-3">{call.type}</td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              call.sentiment === 'Positive' ? 'bg-green-100 text-green-800' :
                              call.sentiment === 'Negative' ? 'bg-red-100 text-red-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {call.sentiment}
                            </span>
                          </td>
                          <td className="px-4 py-3">{call.summary}</td>
                          <td className="px-4 py-3">
                            <ul className="list-disc list-inside">
                              {call.actionItems.map((item, i) => (
                                <li key={i} className="text-xs text-gray-600">{item}</li>
                              ))}
                            </ul>
                          </td>
                          <td className="px-4 py-3">
                            <button 
                              onClick={() => window.location.href = '/mailbox/end-of-call'}
                              className="flex items-center text-blue-600 hover:text-blue-800 text-sm"
                            >
                              <Eye size={16} className="mr-1" />
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}