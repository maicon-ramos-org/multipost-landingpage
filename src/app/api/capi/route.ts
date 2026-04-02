import { NextResponse } from "next/server";
import crypto from "crypto";

const PIXEL_ID = process.env.META_PIXEL_ID || "";
const ACCESS_TOKEN = process.env.META_CAPI_ACCESS_TOKEN || "";
const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL || "";
const TEST_EVENT_CODE_SERVER = process.env.META_TEST_EVENT_CODE || "";

function sha256(value: string): string {
  return crypto.createHash("sha256").update(value).digest("hex");
}

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for") || "";
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return request.headers.get("x-real-ip") || "";
}

interface CAPIPayload {
  event_name: string;
  event_id: string;
  event_source_url: string;
  user_data: {
    email?: string;
    phone?: string;
    fbp?: string;
    fbc?: string;
    client_user_agent?: string;
    client_ip_address?: string;
  };
  custom_data?: {
    name?: string;
    form_name?: string;
    form_id?: string;
  };
  test_event_code?: string;
}

export async function POST(request: Request) {
  // Graceful skip if tracking not configured
  if (!PIXEL_ID || !ACCESS_TOKEN) {
    return NextResponse.json({
      success: true,
      message: "Tracking not configured, skipping",
    });
  }

  let data: CAPIPayload;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid JSON payload" },
      { status: 400 }
    );
  }

  const { event_name, event_id, event_source_url } = data;
  if (!event_name || !event_id || !event_source_url) {
    return NextResponse.json(
      {
        success: false,
        message: "Missing required fields: event_name, event_id, event_source_url",
      },
      { status: 400 }
    );
  }

  const ip = getClientIp(request);
  const userData = data.user_data || {};
  const customData = data.custom_data || {};

  // Build hashed user_data for Meta
  const metaUserData: Record<string, unknown> = {};

  if (userData.email) {
    metaUserData.em = [sha256(userData.email.toLowerCase().trim())];
  }

  if (userData.phone) {
    let phoneClean = userData.phone.replace(/\D/g, "");
    if (phoneClean.length <= 11) {
      phoneClean = "55" + phoneClean;
    }
    metaUserData.ph = [sha256(phoneClean)];
  }

  if (customData.name) {
    const parts = customData.name.trim().split(/\s+/);
    const firstName = parts[0]?.toLowerCase();
    if (firstName) {
      metaUserData.fn = [sha256(firstName)];
    }
    if (parts.length > 1) {
      const lastName = parts[parts.length - 1].toLowerCase();
      if (lastName) {
        metaUserData.ln = [sha256(lastName)];
      }
    }
  }

  metaUserData.country = [sha256("br")];

  // Non-hashed fields
  if (userData.fbp) metaUserData.fbp = userData.fbp;
  if (userData.fbc) metaUserData.fbc = userData.fbc;
  if (userData.client_user_agent) {
    metaUserData.client_user_agent = userData.client_user_agent;
  }
  metaUserData.client_ip_address = ip;

  // Build event payload
  const eventData: Record<string, unknown> = {
    event_name,
    event_time: Math.floor(Date.now() / 1000),
    event_id,
    event_source_url,
    action_source: "website",
    user_data: metaUserData,
  };

  // Include custom_data if present (sanitized)
  const sanitizedCustom: Record<string, string> = {};
  for (const [key, value] of Object.entries(customData)) {
    if (typeof value === "string" && value) {
      sanitizedCustom[key] = value;
    }
  }
  if (Object.keys(sanitizedCustom).length > 0) {
    eventData.custom_data = sanitizedCustom;
  }

  const metaPayload: Record<string, unknown> = { data: [eventData] };

  // Use test_event_code from client or server env
  const testCode = data.test_event_code || TEST_EVENT_CODE_SERVER;
  if (testCode) {
    metaPayload.test_event_code = testCode;
  }

  // Send to Meta Graph API
  const metaUrl = `https://graph.facebook.com/v21.0/${encodeURIComponent(PIXEL_ID)}/events?access_token=${encodeURIComponent(ACCESS_TOKEN)}`;

  let metaOk = false;
  try {
    const metaResponse = await fetch(metaUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(metaPayload),
      signal: AbortSignal.timeout(10000),
    });
    metaOk = metaResponse.ok;
  } catch {
    // Meta API call failed — non-blocking
  }

  // For Lead events: forward to n8n webhook
  if (
    event_name.toLowerCase() === "lead" &&
    N8N_WEBHOOK_URL &&
    N8N_WEBHOOK_URL.startsWith("http")
  ) {
    const n8nPayload = {
      name: customData.name || "",
      email: userData.email || "",
      phone: userData.phone || "",
      source: "landing_page",
      page_url: event_source_url,
      user_agent: userData.client_user_agent || "",
      ip,
      form_name: customData.form_name || "lead-form",
      form_id: customData.form_id || "",
      date: new Date().toISOString(),
    };

    try {
      await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(n8nPayload),
        signal: AbortSignal.timeout(10000),
      });
    } catch {
      // n8n webhook failed — non-blocking
    }
  }

  return NextResponse.json({
    success: metaOk,
    message: metaOk ? "Event tracked successfully" : "Failed to send event to Meta",
  });
}
