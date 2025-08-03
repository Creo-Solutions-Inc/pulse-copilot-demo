'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import callsData from '@/data/calls-jp.json';
import { 
  Search, 
  Filter, 
  Phone, 
  TrendingUp, 
  TrendingDown, 
  Minus,
  ArrowRight,
  ChevronDown
} from 'lucide-react';

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

export default function CallListPageJP() {
  const [calls, setCalls] = useState<CallData[]>([]);
  const [filteredCalls, setFilteredCalls] = useState<CallData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [callTypeFilter, setCallTypeFilter] = useState('');
  const [callOutcomeFilter, setCallOutcomeFilter] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Load calls data
    setCalls(callsData as CallData[]);
    setFilteredCalls(callsData as CallData[]);
  }, []);

  useEffect(() => {
    // Apply filters
    let filtered = calls;

    if (searchTerm) {
      filtered = filtered.filter(call =>
        call.internalNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        call.externalNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        call.summary.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (callTypeFilter) {
      filtered = filtered.filter(call => call.callType === callTypeFilter);
    }

    if (callOutcomeFilter) {
      filtered = filtered.filter(call => call.callOutcome === callOutcomeFilter);
    }

    setFilteredCalls(filtered);
  }, [calls, searchTerm, callTypeFilter, callOutcomeFilter]);

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'Positive': return 'bg-green-100 text-green-800 border-green-200';
      case 'Negative': return 'bg-red-100 text-red-800 border-red-200';
      case 'N/A': return 'bg-gray-100 text-gray-600 border-gray-200';
      default: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'Positive': return <TrendingUp size={12} className="text-green-500" />;
      case 'Negative': return <TrendingDown size={12} className="text-red-500" />;
      case 'N/A': return <Minus size={12} className="text-gray-400" />;
      default: return <Minus size={12} className="text-yellow-500" />;
    }
  };

  const handleRowClick = (callId: string) => {
    router.push(`/calls-jp/${callId}`);
  };

  const uniqueCallTypes = [...new Set(calls.map(call => call.callType))];
  const uniqueCallOutcomes = [...new Set(calls.map(call => call.callOutcome))];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">通話リスト</h1>
          <p className="text-lg text-gray-600">過去30日間のすべての通話を表示</p>
        </div>

        <div className="space-y-6">
          {/* Search & Filters */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">検索とフィルター</h2>
              <div className="flex items-center text-sm text-gray-700">
                <Filter size={16} className="mr-2" />
                {filteredCalls.length} / {calls.length} 通話
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="番号またはサマリーで検索..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors text-gray-900 bg-white placeholder-gray-500"
                />
              </div>

              {/* Call Type Filter */}
              <div className="relative">
                <select
                  value={callTypeFilter}
                  onChange={(e) => setCallTypeFilter(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors appearance-none bg-white text-gray-900"
                >
                  <option value="">すべてのタイプ</option>
                  {uniqueCallTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
              </div>

              {/* Call Outcome Filter */}
              <div className="relative">
                <select
                  value={callOutcomeFilter}
                  onChange={(e) => setCallOutcomeFilter(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors appearance-none bg-white text-gray-900"
                >
                  <option value="">すべての結果</option>
                  {uniqueCallOutcomes.map(outcome => (
                    <option key={outcome} value={outcome}>{outcome}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
              </div>
            </div>
          </div>

          {/* Calls Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">通話履歴</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-32">
                      時間
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-44">
                      内線番号
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-44">
                      外線番号
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-28">
                      通話タイプ
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-32">
                      通話結果
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-32">
                      感情分析
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-20">
                      アクション
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredCalls.map((call) => (
                    <tr 
                      key={call.id} 
                      className="hover:bg-gray-50 cursor-pointer transition-colors duration-150"
                      onClick={() => handleRowClick(call.id)}
                    >
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                        {new Date(call.time).toLocaleDateString('ja-JP')}, {new Date(call.time).toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        <div className="flex items-center">
                          <Phone size={14} className="mr-2 text-gray-400" />
                          <span className="font-mono text-xs">{call.internalNumber}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        <span className="font-mono text-xs">{call.externalNumber}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {call.callType}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          call.callOutcome === '完了' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {call.callOutcome}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getSentimentColor(call.sentiment)}`}>
                            {getSentimentIcon(call.sentiment)}
                            <span className="ml-1">{call.sentiment}</span>
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <ArrowRight size={16} className="text-gray-400 hover:text-gray-600 transition-colors" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredCalls.length === 0 && (
              <div className="text-center py-12 text-gray-700">
                <div className="text-lg font-medium mb-2">通話が見つかりません</div>
                <div className="text-sm">検索条件またはフィルター条件を調整してください</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 