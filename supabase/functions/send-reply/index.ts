import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { messageId, to, customerName, message } = await req.json()

    if (!messageId || !to || !customerName || !message) {
      throw new Error('Missing required parameters: messageId, to, customerName, message')
    }

    const resendApiKey = Deno.env.get('RESEND_API_KEY')
    if (!resendApiKey) {
      throw new Error('RESEND_API_KEY is not set')
    }

    // Call Resend REST API
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Portfolio <onboarding@resend.dev>', // Update this to your verified domain later
        to: to,
        subject: 'Reply to your message on my portfolio',
        html: `
          <div style="font-family: sans-serif; color: #333;">
            <p>Hi ${customerName},</p>
            <p>Thank you for reaching out! Here is the reply to your message:</p>
            <blockquote style="border-left: 4px solid #0ea5e9; padding-left: 1rem; margin: 1.5rem 0; color: #555;">
              ${message.replace(/\n/g, '<br/>')}
            </blockquote>
            <p>Best regards,<br/>Sakthivel S</p>
          </div>
        `
      })
    })

    if (!resendResponse.ok) {
      const errorText = await resendResponse.text()
      console.error('Resend API error:', errorText)
      throw new Error(`Failed to send email via Resend: ${resendResponse.statusText}`)
    }

    const emailResult = await resendResponse.json()

    // Optionally update the message status in Supabase table
    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const supabaseServiceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    
    if (supabaseUrl && supabaseServiceRoleKey) {
      const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey)
      
      const { error: updateError } = await supabaseAdmin
        .from('contact_messages') // Replace with your actual table name if different
        .update({ status: 'replied' })
        .eq('id', messageId)

      if (updateError) {
        console.error('Failed to update message status in Supabase:', updateError)
        // We don't throw here because the email already sent successfully
      }
    } else {
      console.warn('Supabase URL or Service Role Key missing, skipping database update.')
    }

    return new Response(
      JSON.stringify({ success: true, id: emailResult.id }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('Error in send-reply function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      }
    )
  }
})
