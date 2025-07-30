'use client';

import { useState, useEffect } from 'react';
import Card from '@/components/Card';
import Button from '@/components/Button';
import InputField from '@/components/InputField';
import configData from '@/data/config.json';
import { 
  Save, 
  CheckCircle, 
  Info, 
  AlertTriangle,
  Clock,
  Calendar,
  Mail,
  Eye,
  FileText
} from 'lucide-react';

interface ConfigData {
  endOfCall: {
    subject: string;
    intro: string;
    recipients: string[];
    monitoredNumbers: string[];
  };
  endOfDay: {
    subject: string;
    intro: string;
    recipients: string[];
    monitoredNumbers: string[];
    sendTime: string;
  };
}

export default function EndOfDayConfigPage() {
  const [config, setConfig] = useState({
    subject: '',
    intro: '',
    recipients: '',
    monitoredNumbers: '',
    sendTime: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    // Load existing config
    const data = configData as ConfigData;
    setConfig({
      subject: data.endOfDay.subject,
      intro: data.endOfDay.intro,
      recipients: data.endOfDay.recipients.join(', '),
      monitoredNumbers: data.endOfDay.monitoredNumbers.join(', '),
      sendTime: data.endOfDay.sendTime
    });
  }, []);

  const handleSave = async () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSaved(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => setIsSaved(false), 3000);
    }, 1000);
  };

  // Generate preview data
  const previewData = {
    date: new Date().toLocaleDateString(),
    totalCalls: 24,
    answeredCalls: 20,
    missedCalls: 4,
    averageDuration: '00:04:32',
    topSentiment: 'Positive',
    qualityScore: 78,
    topActionItems: [
      'Follow up with 5 prospects',
      'Schedule 3 demos for next week',
      'Update customer preferences for 8 accounts'
    ]
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">End-of-Day Summary Configuration</h1>
        <p className="text-gray-600">Configure email settings for daily call summaries</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Configuration Settings - Left Side */}
        <div className="space-y-6">
          <Card title="Email Settings">
            <div className="space-y-6">
              <InputField
                label="Email Subject"
                value={config.subject}
                onChange={(value) => setConfig({ ...config, subject: value })}
                placeholder="Enter email subject template"
                required
              />

              <InputField
                label="Introduction Text"
                value={config.intro}
                onChange={(value) => setConfig({ ...config, intro: value })}
                placeholder="Enter introduction text for the daily summary"
                multiline
                rows={4}
                required
              />

              <InputField
                label="Recipients (comma-separated emails)"
                value={config.recipients}
                onChange={(value) => setConfig({ ...config, recipients: value })}
                placeholder="manager@company.com, team@company.com"
                required
              />

              <InputField
                label="Monitored Internal Numbers (comma-separated)"
                value={config.monitoredNumbers}
                onChange={(value) => setConfig({ ...config, monitoredNumbers: value })}
                placeholder="+1-555-0101, +1-555-0102"
                required
              />

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <Clock size={14} className="mr-1" />
                  Send Time
                </label>
                <input
                  type="time"
                  value={config.sendTime}
                  onChange={(e) => setConfig({ ...config, sendTime: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-gray-900 bg-white"
                  required
                />
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between">
              <div className="text-sm text-gray-700 flex items-center">
                <Calendar size={14} className="mr-1" />
                Daily summaries will be sent at the specified time
              </div>
              
              <div className="flex items-center space-x-4">
                {isSaved && (
                  <div className="text-green-600 text-sm font-medium flex items-center">
                    <CheckCircle size={16} className="mr-1" />
                    Configuration saved successfully
                  </div>
                )}
                
                <Button
                  onClick={handleSave}
                  disabled={isLoading}
                  className="flex items-center"
                >
                  <Save size={16} className="mr-2" />
                  {isLoading ? 'Saving...' : 'Save Configuration'}
                </Button>
              </div>
            </div>
          </Card>

          <Card title="Configuration Notes">
            <div className="space-y-4 text-sm text-gray-700">
              <div className="flex items-start space-x-2">
                <Info size={16} className="text-blue-500 mt-0.5 flex-shrink-0" />
                <div>
                  <strong>Subject Template:</strong> Use {'{date}'} to include the current date in the subject line.
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <Info size={16} className="text-blue-500 mt-0.5 flex-shrink-0" />
                <div>
                  <strong>Send Time:</strong> Daily summaries will be automatically sent at this time each day.
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <Info size={16} className="text-blue-500 mt-0.5 flex-shrink-0" />
                <div>
                  <strong>Recipients:</strong> Multiple email addresses can be separated by commas.
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <Info size={16} className="text-blue-500 mt-0.5 flex-shrink-0" />
                <div>
                  <strong>Monitored Numbers:</strong> Only calls from these numbers will be included in daily summaries.
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <AlertTriangle size={16} className="text-yellow-500 mt-0.5 flex-shrink-0" />
                <div>
                  <strong>API Integration:</strong> In production, this would save to your backend API endpoint and trigger scheduled jobs.
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Email Preview - Right Side */}
        <div className="space-y-6">
          <Card title={
            <div className="flex items-center">
              <Eye size={18} className="mr-2" />
              Configuration Preview
            </div>
          }>
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              {/* Email Header Preview */}
              <div className="border-b border-gray-200 pb-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm text-gray-700">From: Pulse Co-Pilot &lt;noreply@pulse-copilot.com&gt;</div>
                  <div className="text-sm text-gray-700">{previewData.date}</div>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm text-gray-700">To: {config.recipients || 'manager@company.com, team@company.com'}</div>
                </div>
                <div className="text-lg font-semibold text-gray-900">
                  {config.subject.replace('{date}', previewData.date) || 'Daily Call Recap - ' + previewData.date}
                </div>
              </div>

              {/* Configuration Preview */}
              <div className="space-y-4 text-gray-800">
                <div>
                  {config.intro || 'Your daily summary of all calls, including key metrics and action items for tomorrow.'}
                </div>

                {/* Configuration Summary */}
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <h3 className="font-semibold mb-3 text-gray-900">Configuration Summary</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-700">Subject Template:</span>
                      <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {config.subject || 'Daily Call Recap - {date}'}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-700">Recipients:</span>
                      <span className="text-sm text-gray-800 max-w-xs truncate">
                        {config.recipients || 'manager@company.com, team@company.com'}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-700">Monitored Numbers:</span>
                      <span className="text-sm text-gray-800 max-w-xs truncate">
                        {config.monitoredNumbers || '+1-555-0101, +1-555-0102'}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-700">Send Time:</span>
                      <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                        {config.sendTime || '18:00'}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-700">Trigger:</span>
                      <span className="text-sm bg-purple-100 text-purple-800 px-2 py-1 rounded">
                        Daily Scheduled Summary
                      </span>
                    </div>
                  </div>
                </div>

                {/* Template Variables Info */}
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold mb-2 text-blue-900">Available Template Variables</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <span className="font-mono bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2">&#123;date&#125;</span>
                      <span className="text-blue-800">Will be replaced with current date</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-mono bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2">&#123;totalCalls&#125;</span>
                      <span className="text-blue-800">Will be replaced with total call count</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-mono bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2">&#123;answeredCalls&#125;</span>
                      <span className="text-blue-800">Will be replaced with answered call count</span>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="border-t border-gray-200 pt-4 mt-6">
                  <p className="text-sm text-gray-700">
                    For full email preview with daily data, visit the Mail Box section.
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Preview Info */}
          <Card title="Preview Information">
            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex items-center">
                <Info size={14} className="mr-2 text-blue-500" />
                This preview shows your email configuration settings
              </div>
              <div className="flex items-center">
                <Clock size={14} className="mr-2 text-green-500" />
                Updates in real-time as you modify settings
              </div>
              <div className="flex items-center">
                <Mail size={14} className="mr-2 text-purple-500" />
                Template variables are highlighted for reference
              </div>
              <div className="flex items-center">
                <Calendar size={14} className="mr-2 text-orange-500" />
                Daily summaries will be sent at {config.sendTime || '18:00'}
              </div>
              <div className="flex items-center">
                <FileText size={14} className="mr-2 text-red-500" />
                Full email previews available in Mail Box section
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
} 