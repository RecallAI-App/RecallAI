import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Format the amount to the smallest unit for Stripe
const formatAmountForStripe = (amount: number, currency: string) => {
    return parseInt((amount * 100).toFixed(0));
};

// Handle POST request: Create a new checkout session
export async function POST(req) {
    const params: Stripe.Checkout.SessionCreateParams = {
        mode: "subscription",
        payment_method_types: ["card"],
        line_items: [
            {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: "Pro Learner",
                    },
                    unit_amount: formatAmountForStripe(10, "usd"),
                    recurring: {
                        interval: "month",
                        interval_count: 1,
                    },
                },
                quantity: 1,
            },
        ],
        success_url: `${req.headers.get("origin")}/result?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.get("origin")}/result?session_id={CHECKOUT_SESSION_ID}`,
    };

    try {
        const checkoutSession = await stripe.checkout.sessions.create(params);
        return NextResponse.json(checkoutSession, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "An error occurred" }, { status: 500 });
    }
}

// Handle GET request: Retrieve a checkout session by ID
export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
        return NextResponse.json({ error: "Session ID is required" }, { status: 400 });
    }

    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        return NextResponse.json(session, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Session retrieval failed" }, { status: 500 });
    }
}
