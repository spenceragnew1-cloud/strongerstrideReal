import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.57.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface RequestBody {
  assessmentId: string;
  email: string;
}

interface AssessmentResult {
  id: string;
  result: number;
  exercise: {
    name: string;
  };
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { assessmentId, email }: RequestBody = await req.json();

    if (!assessmentId || !email) {
      return new Response(
        JSON.stringify({ error: "Missing assessmentId or email" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const { data: assessment, error: assessmentError } = await supabase
      .from("assessments")
      .select("*")
      .eq("id", assessmentId)
      .single();

    if (assessmentError || !assessment) {
      return new Response(
        JSON.stringify({ error: "Assessment not found" }),
        {
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const { data: results, error: resultsError } = await supabase
      .from("assessment_results")
      .select(`
        id,
        result,
        exercise:exercises(name)
      `)
      .eq("assessment_id", assessmentId);

    if (resultsError || !results) {
      return new Response(
        JSON.stringify({ error: "Failed to fetch results" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const deficitCounts = {
      critical: 0,
      moderate: 0,
      good: 0,
    };

    results.forEach((result: AssessmentResult) => {
      if (result.result === 1) deficitCounts.critical++;
      else if (result.result === 2) deficitCounts.moderate++;
      else deficitCounts.good++;
    });

    const resultsUrl = `${supabaseUrl.replace('.supabase.co', '')}/results?id=${assessmentId}`;

    const emailContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Stronger Stride Assessment Results</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <tr>
            <td style="padding: 40px;">
              <h1 style="margin: 0 0 24px 0; color: #16a34a; font-size: 28px; font-weight: bold;">Your Assessment Results Are Ready!</h1>
              
              <p style="margin: 0 0 16px 0; color: #475569; font-size: 16px; line-height: 1.5;">Thank you for completing the Stronger Stride Running Assessment!</p>
              
              <p style="margin: 0 0 24px 0; color: #475569; font-size: 16px; line-height: 1.5;">Here's a quick summary of your performance:</p>
              
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 0 0 24px 0; border: 1px solid #e2e8f0; border-radius: 8px;">
                <tr>
                  <td style="padding: 16px; background-color: #f8fafc; border-bottom: 1px solid #e2e8f0;">
                    <strong style="color: #dc2626;">Needs Improvement:</strong> ${deficitCounts.critical} exercises
                  </td>
                </tr>
                <tr>
                  <td style="padding: 16px; background-color: #f8fafc; border-bottom: 1px solid #e2e8f0;">
                    <strong style="color: #f59e0b;">Room for Improvement:</strong> ${deficitCounts.moderate} exercises
                  </td>
                </tr>
                <tr>
                  <td style="padding: 16px; background-color: #f8fafc;">
                    <strong style="color: #16a34a;">Performing Well:</strong> ${deficitCounts.good} exercises
                  </td>
                </tr>
              </table>
              
              <p style="margin: 0 0 24px 0; color: #475569; font-size: 16px; line-height: 1.5;">We've analyzed your results and created a personalized report with specific program recommendations to address your areas of weakness.</p>
              
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <a href="${resultsUrl}" style="display: inline-block; padding: 16px 32px; background-color: #16a34a; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">View Your Full Results</a>
                  </td>
                </tr>
              </table>
              
              <p style="margin: 24px 0 0 0; color: #64748b; font-size: 14px; line-height: 1.5;">Keep training strong,<br>The Stronger Stride Team</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 24px 40px; background-color: #f8fafc; border-top: 1px solid #e2e8f0; border-radius: 0 0 8px 8px;">
              <p style="margin: 0; color: #94a3b8; font-size: 12px; text-align: center;">© 2024 Stronger Stride. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    console.log("=== EMAIL CONTENT ===");
    console.log("To:", email);
    console.log("Subject: Your Stronger Stride Assessment Results");
    console.log("HTML Content:", emailContent);
    console.log("=====================");

    return new Response(
      JSON.stringify({
        success: true,
        message: "Email prepared successfully",
        note: "To actually send emails, integrate an email service provider like Resend, SendGrid, or AWS SES",
        email: email,
        assessmentId: assessmentId,
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