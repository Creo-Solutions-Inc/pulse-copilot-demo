"use client";

import { useEffect, useState } from "react";
import Card from "@/components/Card";
import callsData from "@/data/calls.json";
import { Phone, CheckCircle, XCircle, Clock, FileText, Settings, Mail, TrendingUp, TrendingDown, Minus } from "lucide-react";

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

interface Metrics {
    totalCalls: number;
    answeredCalls: number;
    missedCalls: number;
    averageDuration: string;
}

export default function DashboardPage() {
    const [metrics, setMetrics] = useState<Metrics>({
        totalCalls: 0,
        answeredCalls: 0,
        missedCalls: 0,
        averageDuration: "00:00:00",
    });

    useEffect(() => {
        // Calculate metrics from mock data
        const calls = callsData as CallData[];
        const totalCalls = calls.length;
        const answeredCalls = calls.filter((call) => call.callOutcome === "Completed").length;
        const missedCalls = calls.filter((call) => call.callOutcome === "Missed").length;

        // Calculate average duration
        const completedCalls = calls.filter((call) => call.callOutcome === "Completed");
        const totalSeconds = completedCalls.reduce((acc, call) => {
            const [hours, minutes, seconds] = call.duration.split(":").map(Number);
            return acc + hours * 3600 + minutes * 60 + seconds;
        }, 0);

        const averageSeconds = completedCalls.length > 0 ? Math.round(totalSeconds / completedCalls.length) : 0;
        const avgHours = Math.floor(averageSeconds / 3600);
        const avgMinutes = Math.floor((averageSeconds % 3600) / 60);
        const avgSecs = averageSeconds % 60;
        const averageDuration = `${avgHours.toString().padStart(2, "0")}:${avgMinutes.toString().padStart(2, "0")}:${avgSecs.toString().padStart(2, "0")}`;

        setMetrics({
            totalCalls,
            answeredCalls,
            missedCalls,
            averageDuration,
        });
    }, []);

    const metricCards = [
        {
            title: "Total Calls",
            value: metrics.totalCalls,
            icon: <Phone size={24} />,
            color: "text-blue-600",
        },
        {
            title: "Answered",
            value: metrics.answeredCalls,
            icon: <CheckCircle size={24} />,
            color: "text-green-600",
        },
        {
            title: "Missed",
            value: metrics.missedCalls,
            icon: <XCircle size={24} />,
            color: "text-red-600",
        },
        {
            title: "Avg Duration",
            value: metrics.averageDuration,
            icon: <Clock size={24} />,
            color: "text-purple-600",
        },
    ];

    const getSentimentIcon = (sentiment: string) => {
        switch (sentiment) {
            case "Positive":
                return (
                    <TrendingUp
                        size={12}
                        className="text-green-500"
                    />
                );
            case "Negative":
                return (
                    <TrendingDown
                        size={12}
                        className="text-red-500"
                    />
                );
            default:
                return (
                    <Minus
                        size={12}
                        className="text-yellow-500"
                    />
                );
        }
    };

    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Daily Recap Overview</h1>
                <p className="text-gray-600">Your call analytics and insights for today</p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {metricCards.map((card, index) => (
                    <Card
                        key={index}
                        className="text-center"
                    >
                        <div className="flex items-center justify-center mb-4">
                            <div className={`${card.color}`}>{card.icon}</div>
                        </div>
                        <div className={`text-3xl font-bold ${card.color} mb-2`}>{card.value}</div>
                        <div className="text-sm text-gray-600 font-medium">{card.title}</div>
                    </Card>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card
                    title="Call List"
                    className="text-center hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => (window.location.href = "/calls")}
                >
                    <div className="flex items-center justify-center mb-4">
                        <FileText
                            size={32}
                            className="text-blue-600"
                        />
                    </div>
                    <p className="text-gray-600">View all calls from the past 30 days</p>
                </Card>

                <Card
                    title="Configuration"
                    className="text-center hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => (window.location.href = "/configuration/end-of-call")}
                >
                    <div className="flex items-center justify-center mb-4">
                        <Settings
                            size={32}
                            className="text-purple-600"
                        />
                    </div>
                    <p className="text-gray-600">Configure email settings and preferences</p>
                </Card>

                <Card
                    title="Email Previews"
                    className="text-center hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => (window.location.href = "/mailbox/end-of-call")}
                >
                    <div className="flex items-center justify-center mb-4">
                        <Mail
                            size={32}
                            className="text-green-600"
                        />
                    </div>
                    <p className="text-gray-600">Preview email templates and summaries</p>
                </Card>
            </div>

            {/* Recent Activity */}
            <div className="mt-8">
                <Card title="Recent Calls">
                    <div className="space-y-4">
                        {(callsData as CallData[]).slice(0, 5).map((call) => (
                            <div
                                key={call.id}
                                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                            >
                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center justify-center w-6 h-6">{getSentimentIcon(call.sentiment)}</div>
                                    <div>
                                        <div className="font-medium text-gray-900">
                                            {call.internalNumber} → {call.externalNumber}
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            {new Date(call.time).toLocaleTimeString()} • {call.callType}
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm font-medium text-gray-900">{call.duration}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
}
