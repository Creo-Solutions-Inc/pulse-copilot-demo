import { type NextRequest, NextResponse } from "next/server";

/**
 * GET handler
 */
export async function GET(request: NextRequest) {
    try {
        const challenge = request.nextUrl.searchParams.get("challenge") || "";

        // Handle webhook verification challenge (common pattern)
        if (challenge) {
            return NextResponse.json({ challenge });
        }

        return NextResponse.json({
            message: "Webhook GET endpoint active",
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.error("Webhook GET error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

/**
 * POST handler
 */
export async function POST(request: NextRequest) {
    try {
        // Get the request body
        const body = await request.text();

        // Parse JSON payload
        let payload;
        try {
            payload = JSON.parse(body);
        } catch (parseError) {
            return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
        }

        // Log the webhook event (remove in production)
        console.log("Webhook received:", {
            timestamp: new Date().toISOString(),
            headers: Object.fromEntries(request.headers.entries()),
            payload,
        });

        // TODO: Add your webhook logic here
        // Example: Handle different event types
        // if (payload.type === 'payment.completed') {
        //   // Handle payment completion
        // }

        return NextResponse.json({
            success: true,
            message: "Webhook processed successfully",
            received: payload,
        });
    } catch (error) {
        console.error("Webhook POST error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
