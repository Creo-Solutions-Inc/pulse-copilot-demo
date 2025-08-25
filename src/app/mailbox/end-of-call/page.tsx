'use client';

import React from 'react';
import Card from '@/components/Card';

interface CallDetails {
  id: string;
  internalNumber: string;
  externalNumber: string;
  callType: string;
  callOutcome: string;
  duration: string;
  time: string;
  sentiment: 'Positive' | 'Neutral' | 'Negative';
  summary: string;
  actionItems: string[];
}

const sampleCall: CallDetails = {
  id: '15/01/2024, 12:30:00 - +1-555-0101 → +1-555-0202',
  internalNumber: '+1-555-0101',
  externalNumber: '+1-555-0202',
  callType: 'Inbound',
  callOutcome: 'Completed',
  duration: '00:05:32',
  time: '15/01/2024, 12:30:00',
  sentiment: 'Positive',
  summary: "Customer inquired about product features and pricing. Showed strong interest in our premium plan. Discussed integration capabilities and support options. Customer expressed satisfaction with the detailed explanation and requested a follow-up with specific pricing details.",
  actionItems: [
    'Follow up with pricing proposal',
    'Schedule demo for next week',
    'Send product documentation',
    'Update CRM with customer requirements'
  ]
};

export default function EndOfCallMailboxPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-2">End-of-Call Email Preview</h1>
      <p className="text-gray-600 mb-6">Preview how individual call summaries will appear in emails</p>

      <div className="space-y-6">
        <Card>
          <div className="mb-6">
            <h2 className="text-lg font-medium mb-2">Select Call to Preview</h2>
            <select className="w-full p-2 border border-gray-300 rounded-md">
              <option>{sampleCall.id}</option>
            </select>
          </div>
        </Card>

        <Card>
          <div>
            <h2 className="text-lg font-medium mb-4">Email Preview</h2>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Subject:</p>
                <p className="font-medium">Call Summary - Inbound Call</p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Introduction:</p>
                <p>Here&apos;s a summary of your recent call with detailed insights and action items.</p>
              </div>

              <div>
                <h3 className="font-medium mb-4">Call Details</h3>
                <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                  <div>
                    <p className="text-sm text-gray-600">Internal Number</p>
                    <p>{sampleCall.internalNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">External Number</p>
                    <p>{sampleCall.externalNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Call Type</p>
                    <p>{sampleCall.callType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Call Outcome</p>
                    <p>{sampleCall.callOutcome}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Duration</p>
                    <p>{sampleCall.duration}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Time</p>
                    <p>{sampleCall.time}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Sentiment</p>
                    <span className="inline-block px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      {sampleCall.sentiment}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">Call Summary</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700">{sampleCall.summary}</p>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">Action Items</h3>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <ul className="space-y-2">
                    {sampleCall.actionItems.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-yellow-600 mr-2">→</span>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}