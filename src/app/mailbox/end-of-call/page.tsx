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

// Use a fixed date for the sample data to avoid hydration mismatch
const SAMPLE_DATE = '2024-01-15 12:30:00';

const sampleCall: CallDetails = {
  id: '15/01/2024, 12:30:00 - +1-555-0101 → +1-555-0202',
  internalNumber: '+1-555-0101',
  externalNumber: '+1-555-0202',
  callType: 'Inbound',
  callOutcome: 'Completed',
  duration: '00:05:32',
  time: SAMPLE_DATE,
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
      <h1 className="text-2xl font-bold text-gray-900 mb-2">End-of-Call Email Preview</h1>
      <p className="text-gray-700">Preview how individual call summaries will appear in emails</p>

      <div className="space-y-6 mt-6">
        <Card>
          <div className="mb-6">
            <h2 className="text-lg font-medium text-gray-900 mb-2">Select Call to Preview</h2>
            <select className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-900">
              <option>{sampleCall.id}</option>
            </select>
          </div>
        </Card>

        <Card>
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">Email Preview</h2>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-700">Subject:</p>
                <p className="text-gray-900">Call Summary - Inbound Call</p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700">Introduction:</p>
                <p className="text-gray-900">Here&apos;s a summary of your recent call with detailed insights and action items.</p>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-4">Call Details</h3>
                <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Internal Number</p>
                    <p className="text-gray-900">{sampleCall.internalNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">External Number</p>
                    <p className="text-gray-900">{sampleCall.externalNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Call Type</p>
                    <p className="text-gray-900">{sampleCall.callType}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Call Outcome</p>
                    <p className="text-gray-900">{sampleCall.callOutcome}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Duration</p>
                    <p className="text-gray-900">{sampleCall.duration}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Time</p>
                    <p className="text-gray-900">{sampleCall.time}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Sentiment</p>
                    <span className="inline-block px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      {sampleCall.sentiment}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-3">Call Summary</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-900">{sampleCall.summary}</p>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-3">Action Items</h3>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <ul className="space-y-2">
                    {sampleCall.actionItems.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-yellow-600 mr-2">→</span>
                        <span className="text-gray-900">{item}</span>
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