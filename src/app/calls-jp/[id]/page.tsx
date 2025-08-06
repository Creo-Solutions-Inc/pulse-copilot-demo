"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Card from "@/components/Card";
import Button from "@/components/Button";
import callsData from "@/data/calls-jp.json";
import {
    ArrowLeft,
    Phone,
    Clock,
    TrendingUp,
    TrendingDown,
    Minus,
    Mail,
    Download,
    FileText,
    CheckCircle,
    XCircle,
    Star,
    Calendar,
    User,
    Activity,
} from "lucide-react";

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

export default function CallDetailsPageJP() {
    const [call, setCall] = useState<CallData | null>(null);
    const [loading, setLoading] = useState(true);
    const params = useParams();
    const router = useRouter();

    useEffect(() => {
        // Find the call by ID
        const callId = params.id as string;
        const foundCall = (callsData as CallData[]).find((c) => c.id === callId);

        if (foundCall) {
            setCall(foundCall);
        }
        setLoading(false);
    }, [params.id]);

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

    const getSentimentIcon = (sentiment: string) => {
        switch (sentiment) {
            case "Positive":
                return <TrendingUp size={16} />;
            case "Negative":
                return <TrendingDown size={16} />;
            default:
                return <Minus size={16} />;
        }
    };

    const getCallOutcomeIcon = (outcome: string) => {
        switch (outcome) {
            case "Completed":
                return (
                    <CheckCircle
                        size={16}
                        className="text-green-500"
                    />
                );
            case "Missed":
                return (
                    <XCircle
                        size={16}
                        className="text-red-500"
                    />
                );
            default:
                return (
                    <Minus
                        size={16}
                        className="text-gray-600"
                    />
                );
        }
    };

    if (loading) {
        return (
            <div className="p-8">
                <div className="text-center">読み込み中...</div>
            </div>
        );
    }

    if (!call) {
        return (
            <div className="p-8">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">通話が見つかりません</h1>
                    <p className="text-gray-600 mb-4">要求された通話が見つかりませんでした。</p>
                    <Button onClick={() => router.push("/calls-jp")}>通話リストに戻る</Button>
                </div>
            </div>
        );
    }

    return (
        <div className="p-8">
            <div className="mb-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">通話詳細</h1>
                        <p className="text-gray-600 flex items-center">
                            <Calendar
                                size={16}
                                className="mr-2"
                            />
                            {new Date(call.time).toLocaleString("ja-JP")} • {call.callType} • {call.callOutcome}
                        </p>
                    </div>
                    <Button
                        variant="outline"
                        onClick={() => router.push("/calls")}
                        className="flex items-center"
                    >
                        <ArrowLeft
                            size={16}
                            className="mr-2"
                        />
                        リストに戻る
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Call Information */}
                <div className="lg:col-span-2 space-y-6">
                    <Card title="通話情報">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <div className="text-sm text-gray-700 mb-1 flex items-center">
                                    <User
                                        size={14}
                                        className="mr-1"
                                    />
                                    内線番号
                                </div>
                                <div className="font-medium text-gray-900 font-mono text-sm">{call.internalNumber}</div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-700 mb-1 flex items-center">
                                    <Phone
                                        size={14}
                                        className="mr-1"
                                    />
                                    外線番号
                                </div>
                                <div className="font-medium text-gray-900 font-mono text-sm">{call.externalNumber}</div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-700 mb-1">通話タイプ</div>
                                <div className="font-medium text-gray-900">{call.callType}</div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-700 mb-1 flex items-center">
                                    {getCallOutcomeIcon(call.callOutcome)}
                                    <span className="ml-1">通話結果</span>
                                </div>
                                <div className="font-medium text-gray-900">{call.callOutcome}</div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-700 mb-1 flex items-center">
                                    <Clock
                                        size={14}
                                        className="mr-1"
                                    />
                                    通話時間
                                </div>
                                <div className="font-medium text-gray-900">{call.duration}</div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-700 mb-1 flex items-center">
                                    <Calendar
                                        size={14}
                                        className="mr-1"
                                    />
                                    通話日時
                                </div>
                                <div className="font-medium text-gray-900">{new Date(call.time).toLocaleString("ja-JP")}</div>
                            </div>
                        </div>
                    </Card>

                    <Card title="通話サマリー">
                        <div className="text-gray-900 leading-relaxed">{call.summary}</div>
                    </Card>

                    <Card title="アクション項目">
                        <div className="space-y-3">
                            {call.actionItems.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-start"
                                >
                                    <span className="text-yellow-600 mr-3 mt-1">•</span>
                                    <span className="text-gray-900">{item}</span>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Analytics Sidebar */}
                <div className="space-y-6">
                    <Card title="分析">
                        <div className="space-y-4">
                            <div>
                                <div className="text-sm text-gray-700 mb-1 flex items-center">
                                    <Activity
                                        size={14}
                                        className="mr-1"
                                    />
                                    感情分析
                                </div>
                                <div className="flex items-center">
                                    <span
                                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getSentimentColor(call.sentiment)}`}
                                    >
                                        {getSentimentIcon(call.sentiment)}
                                        <span className="ml-1">{call.sentiment}</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Card>

                    <Card title="クイックアクション">
                        <div className="space-y-4">
                            {/* Preview Email - Primary Action */}
                            <button
                                onClick={() => router.push("/mailbox-jp/end-of-call")}
                                className="w-full flex items-center justify-center px-4 py-3 bg-[#e1a730] hover:bg-yellow-600 text-black font-semibold rounded-lg transition-all duration-200 hover:shadow-md transform hover:-translate-y-0.5"
                            >
                                <Mail
                                    size={18}
                                    className="mr-3"
                                />
                                メールプレビュー
                            </button>

                            {/* Download Recording - Secondary Action */}
                            <button
                                onClick={() => {
                                    // In a real app, this would trigger a call recording download
                                    alert("Call recording download would be triggered here");
                                }}
                                className="w-full flex items-center justify-center px-4 py-3 bg-white border border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 font-medium rounded-lg transition-all duration-200 hover:shadow-sm transform hover:-translate-y-0.5"
                            >
                                <Download
                                    size={18}
                                    className="mr-3"
                                />
                                録音ダウンロード
                            </button>

                            {/* View Transcript - Secondary Action */}
                            <button
                                onClick={() => {
                                    // In a real app, this would open a transcript
                                    alert("Call transcript would be opened here");
                                }}
                                className="w-full flex items-center justify-center px-4 py-3 bg-white border border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 font-medium rounded-lg transition-all duration-200 hover:shadow-sm transform hover:-translate-y-0.5"
                            >
                                <FileText
                                    size={18}
                                    className="mr-3"
                                />
                                文字起こし表示
                            </button>
                        </div>
                    </Card>

                    <Card title="通話メタデータ">
                        <div className="space-y-3 text-sm">
                            <div>
                                <div className="text-gray-700">通話ID</div>
                                <div className="font-mono text-gray-900">{call.id}</div>
                            </div>
                            <div>
                                <div className="text-gray-700">タイムスタンプ</div>
                                <div className="text-gray-900">{new Date(call.time).toISOString()}</div>
                            </div>
                            <div>
                                <div className="text-gray-700">ステータス</div>
                                <div className="text-gray-900 flex items-center">
                                    {getCallOutcomeIcon(call.callOutcome)}
                                    <span className="ml-1">{call.callOutcome}</span>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
