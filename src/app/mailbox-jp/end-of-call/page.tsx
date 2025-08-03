'use client';

import { useState, useEffect } from 'react';
import Card from '@/components/Card';
import configData from '@/data/config-jp.json';
import callsData from '@/data/calls-jp.json';

interface CallData {
  id: string;
  time: string;
  internalNumber: string;
  externalNumber: string;
  callType: string;
  callOutcome: string;
  sentiment: string;
  qualityScore: number;
  duration: string;
  summary: string;
  actionItems: string[];
}

interface ConfigData {
  endOfCall: {
    subject: string;
    intro: string;
    recipients: string[];
    monitoredNumbers: string[];
  };
}

export default function EndOfCallEmailPreviewPageJP() {
  const [selectedCall, setSelectedCall] = useState<CallData | null>(null);
  const [config, setConfig] = useState<ConfigData['endOfCall'] | null>(null);

  useEffect(() => {
    // Load config and select first call as default
    const data = configData as ConfigData;
    setConfig(data.endOfCall);
    setSelectedCall((callsData as CallData[])[0]);
  }, []);

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'Positive': return 'bg-green-100 text-green-800';
      case 'Negative': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };



  if (!selectedCall || !config) {
    return <div className="p-8">読み込み中...</div>;
  }

  const emailSubject = config.subject.replace('{callType}', selectedCall.callType);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">通話終了メールプレビュー</h1>
        <p className="text-gray-700">個別通話サマリーがメールでどのように表示されるかをプレビュー</p>
      </div>

      <div className="max-w-4xl space-y-6">
        {/* Call Selection */}
        <Card title="プレビューする通話を選択">
          <select
            value={selectedCall.id}
            onChange={(e) => {
              const call = (callsData as CallData[]).find(c => c.id === e.target.value);
              setSelectedCall(call || null);
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-gray-900 bg-white"
          >
            {(callsData as CallData[]).map((call) => (
              <option key={call.id} value={call.id}>
                {new Date(call.time).toLocaleString('ja-JP')} - {call.internalNumber} → {call.externalNumber}
              </option>
            ))}
          </select>
        </Card>

        {/* Email Preview */}
        <Card title="メールプレビュー">
          <div className="space-y-6">
            {/* Email Header */}
            <div className="border-b border-gray-200 pb-4">
              <div className="text-sm text-gray-700 mb-2">件名:</div>
              <div className="text-lg font-semibold text-gray-900">{emailSubject}</div>
            </div>

            {/* Email Body */}
            <div className="space-y-6">
              <div>
                <div className="text-sm text-gray-700 mb-2">はじめに:</div>
                <div className="text-gray-900">詳細な洞察とアクション項目を含む最近の通話のサマリーをご確認ください。</div>
              </div>

              {/* Call Details */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">通話詳細</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <div className="text-sm text-gray-700">内線番号</div>
                    <div className="font-medium text-gray-900 font-mono text-sm">{selectedCall.internalNumber}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-700">外線番号</div>
                    <div className="font-medium text-gray-900 font-mono text-sm">{selectedCall.externalNumber}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-700">通話タイプ</div>
                    <div className="font-medium text-gray-900">{selectedCall.callType}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-700">通話結果</div>
                    <div className="font-medium text-gray-900">{selectedCall.callOutcome}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-700">通話時間</div>
                    <div className="font-medium text-gray-900">{selectedCall.duration}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-700">通話日時</div>
                    <div className="font-medium text-gray-900">{new Date(selectedCall.time).toLocaleString('ja-JP')}</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <div className="text-sm text-gray-700">感情分析</div>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getSentimentColor(selectedCall.sentiment)}`}>
                      {selectedCall.sentiment}
                    </span>
                  </div>

                </div>

                <div>
                  <div className="text-sm text-gray-700 mb-2">通話サマリー</div>
                  <div className="text-gray-900 bg-white p-4 rounded border">
                    {selectedCall.summary}
                  </div>
                </div>
              </div>

              {/* Action Items */}
              <div>
                <div className="text-sm text-gray-700 mb-2">アクション項目</div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <ul className="space-y-2">
                    {selectedCall.actionItems.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-yellow-600 mr-2">•</span>
                        <span className="text-gray-900">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Configuration Info */}
        <Card title="メール設定情報">
          <div className="space-y-4 text-sm">
            <div>
              <strong className="text-gray-900">受信者:</strong> <span className="text-gray-700">{config.recipients.join(', ')}</span>
            </div>
            <div>
              <strong className="text-gray-900">監視番号:</strong> <span className="text-gray-700">{config.monitoredNumbers.join(', ')}</span>
            </div>
            <div className="text-gray-700">
              監視番号からの通話後に自動的にメールが送信されます。
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
} 