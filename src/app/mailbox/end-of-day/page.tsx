"use client";

import { useState, useEffect } from "react";
import Card from "@/components/Card";
import configData from "@/data/config.json";
import callsData from "@/data/calls.json";

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
    endOfDay: {
        subject: string;
        intro: string;
        recipients: string[];
        monitoredNumbers: string[];
        sendTime: string;
    };
}

export default function EndOfDayEmailPreviewPage() {
    const [config, setConfig] = useState<ConfigData["endOfDay"] | null>(null);
    const [calls, setCalls] = useState<CallData[]>([]);

    useEffect(() => {
        // Load config and calls data
        const data = configData as ConfigData;
        setConfig(data.endOfDay);
        setCalls(callsData as CallData[]);
    }, []);

    const getSentimentColor = (sentiment: string) => {
        switch (sentiment) {
            case "Positive":
                return "bg-green-100 text-green-800";
            case "Negative":
                return "bg-red-100 text-red-800";
            default:
                return "bg-yellow-100 text-yellow-800";
        }
    };

    if (!config) {
        return <div className="p-8">Loading...</div>;
    }

    const emailSubject = config.subject.replace("{date}", new Date().toLocaleDateString());
    const completedCalls = calls.filter((call) => call.callOutcome === "Completed");
    const allActionItems = calls.flatMap((call) => call.actionItems);

    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">End-of-Day Email Preview</h1>
                <p className="text-gray-700">Preview how daily call summaries will appear in emails</p>
            </div>

            <div className="w-full space-y-6">
                {/* Email Preview */}
                <Card title="Email Preview">
                    <div className="space-y-6">
                        {/* Email Header */}
                        <div className="border-b border-gray-200 pb-4">
                            <div className="text-sm text-gray-700 mb-2">Subject:</div>
                            <div className="text-lg font-semibold text-gray-900">{emailSubject}</div>
                        </div>

                        {/* Email Body */}
                        <div className="space-y-6">
                            <div>
                                <div className="text-sm text-gray-700 mb-2">Introduction:</div>
                                <div className="text-gray-900">{config.intro}</div>
                            </div>

                            {/* Daily Summary Stats */}
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Summary</h3>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-blue-600">{calls.length}</div>
                                        <div className="text-sm text-gray-700">Total Calls</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-green-600">{calls.filter((c) => c.callOutcome === "Completed").length}</div>
                                        <div className="text-sm text-gray-700">Completed</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-red-600">{calls.filter((c) => c.callOutcome === "Missed").length}</div>
                                        <div className="text-sm text-gray-700">Missed</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-purple-600">{allActionItems.length}</div>
                                        <div className="text-sm text-gray-700">Action Items</div>
                                    </div>
                                </div>
                            </div>

                            {/* Calls Table */}
                            <div>
                                <div className="text-sm text-gray-700 mb-4">Call Details:</div>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider w-24">Time</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider w-40">
                                                    Internal #
                                                </th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider w-40">
                                                    External #
                                                </th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider w-24">Type</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider w-28">
                                                    Sentiment
                                                </th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider min-w-48">
                                                    Summary
                                                </th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider min-w-48">
                                                    Action Item
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {completedCalls.map((call) => (
                                                <tr
                                                    key={call.id}
                                                    className="hover:bg-gray-50"
                                                >
                                                    <td className="px-4 py-3 text-sm text-gray-900">{new Date(call.time).toLocaleTimeString()}</td>
                                                    <td className="px-4 py-3 text-sm text-gray-900">
                                                        <div className="font-mono text-xs">{call.internalNumber}</div>
                                                    </td>
                                                    <td className="px-4 py-3 text-sm text-gray-900">
                                                        <div className="font-mono text-xs">{call.externalNumber}</div>
                                                    </td>
                                                    <td className="px-4 py-3 text-sm text-gray-900">{call.callType}</td>
                                                    <td className="px-4 py-3">
                                                        <span
                                                            className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getSentimentColor(call.sentiment)}`}
                                                        >
                                                            {call.sentiment}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-3 text-sm text-gray-900">
                                                        <div
                                                            className="max-w-xs truncate"
                                                            title={call.summary}
                                                        >
                                                            {call.summary}
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-3 text-sm text-gray-900">
                                                        <div className="max-w-xs">
                                                            {call.actionItems.length > 0 ? (
                                                                <ul className="space-y-1">
                                                                    {call.actionItems.map((item, index) => (
                                                                        <li
                                                                            key={index}
                                                                            className="text-xs text-gray-700 flex items-start"
                                                                        >
                                                                            <span className="text-yellow-600 mr-1">•</span>
                                                                            <span className="truncate">{item}</span>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            ) : (
                                                                <span className="text-gray-500 text-xs">No action items</span>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Configuration Info */}
                <Card title="Email Configuration">
                    <div className="space-y-4 text-sm">
                        <div>
                            <strong className="text-gray-900">Recipients:</strong> <span className="text-gray-700">{config.recipients.join(", ")}</span>
                        </div>
                        <div>
                            <strong className="text-gray-900">Monitored Numbers:</strong>{" "}
                            <span className="text-gray-700">{config.monitoredNumbers.join(", ")}</span>
                        </div>
                        <div>
                            <strong className="text-gray-900">Send Time:</strong> <span className="text-gray-700">{config.sendTime} daily</span>
                        </div>
                        <div className="text-gray-700">This email would be automatically sent daily at the specified time with a summary of all calls.</div>
                    </div>
                </Card>
            </div>
        </div>
    );
}
