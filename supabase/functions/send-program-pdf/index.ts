import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.57.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface RequestBody {
  email: string;
  sessionId: string;
  programName: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const { email, sessionId, programName }: RequestBody = await req.json();

    if (!email || !programName) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    console.log("Preparing to send program PDF to:", email);

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { data: pdfData, error: storageError } = await supabase.storage
      .from("programs")
      .download("core-strength-control.pdf");

    if (storageError) {
      console.error("Error fetching PDF from storage:", storageError);
      return new Response(
        JSON.stringify({ error: "Failed to retrieve PDF", details: storageError.message }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const pdfBuffer = await pdfData.arrayBuffer();
    const pdfBase64 = btoa(String.fromCharCode(...new Uint8Array(pdfBuffer)));

    if (!resendApiKey) {
      console.log("=== EMAIL DETAILS ===");
      console.log("To:", email);
      console.log("Subject: Your Core Strength & Control Program");
      console.log("PDF Size:", pdfBuffer.byteLength, "bytes");
      console.log("Session ID:", sessionId);
      console.log("=====================");

      return new Response(
        JSON.stringify({
          success: true,
          message: "Email prepared (Resend not configured yet)",
          note: "To send actual emails, set the RESEND_API_KEY secret in Supabase Dashboard",
          email: email,
          programName: programName,
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px;">
          <tr>
            <td style="padding: 40px;">
              <h1 style="margin: 0 0 24px 0; color: #16a34a; font-size: 28px; font-weight: bold;">Welcome to ${programName}!</h1>
              <p style="margin: 0 0 16px 0; color: #475569; font-size: 16px;">Thank you for your purchase! Your complete 12-week program is attached to this email as a PDF.</p>
              <p style="margin: 0 0 16px 0; color: #475569; font-size: 16px;"><strong>What's included:</strong></p>
              <ul style="margin: 0 0 24px 0; color: #475569; font-size: 16px;">
                <li>Complete 12-week progressive program</li>
                <li>Detailed exercise descriptions</li>
                <li>Week-by-week progression guidelines</li>
                <li>Troubleshooting tips</li>
              </ul>
              <div style="margin: 24px 0; padding: 16px; background-color: #dcfce7; border-left: 4px solid #16a34a;">
                <p style="margin: 0; color: #166534; font-size: 14px;"><strong>Pro Tip:</strong> Read through the entire program before starting!</p>
              </div>
              <p style="margin: 24px 0 0 0; color: #64748b; font-size: 14px;">Keep training strong,<br>Dr. Spencer Agnew<br>Stronger Stride</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Stronger Stride <programs@strongerstride.com>",
        to: [email],
        subject: `Your ${programName} Program is Ready!`,
        html: htmlContent,
        attachments: [
          {
            filename: "core-strength-control-program.pdf",
            content: pdfBase64,
          },
        ],
      }),
    });

    if (!emailResponse.ok) {
      const errorText = await emailResponse.text();
      console.error("Resend API error:", errorText);
      return new Response(
        JSON.stringify({ error: "Failed to send email", details: errorText }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const emailResult = await emailResponse.json();
    console.log("Email sent successfully:", emailResult);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Program PDF sent successfully",
        email: email,
        emailId: emailResult.id,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
