import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

interface TicketRequest {
  product_id: string;
  email: string;
  subject: string;
  message: string;
}

interface AnthropicMessage {
  content: Array<{
    type: string;
    text: string;
  }>;
}

export async function POST(request: NextRequest) {
  try {
    const body: TicketRequest = await request.json();
    const { product_id, email, subject, message } = body;

    if (!product_id || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
    );

    const { data: articles } = await supabase
      .from('kb_articles')
      .select('title, content')
      .eq('product_id', product_id)
      .limit(5);

    const kbContext = articles
      ?.map((a: { title: string; content: string }) => `${a.title}: ${a.content}`)
      .join('\n\n') || 'No KB articles available';

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY || '',
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-opus-4-1',
        max_tokens: 500,
        messages: [
          {
            role: 'user',
            content: `You are a support ticket classifier. Classify this ticket and provide a response.

Knowledge Base:
${kbContext}

Ticket:
Subject: ${subject}
Message: ${message}

Respond with JSON:
{
  "classification": "bug|feature|billing|general",
  "response": "helpful response to the user"
}`,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Anthropic API error:', errorData);
      return NextResponse.json(
        { error: 'Failed to classify ticket' },
        { status: 500 }
      );
    }

    const claudeResponse: AnthropicMessage = await response.json();
    const responseText =
      claudeResponse.content[0]?.type === 'text'
        ? claudeResponse.content[0].text
        : '{}';

    let classificationData;
    try {
      classificationData = JSON.parse(responseText);
    } catch {
      classificationData = {
        classification: 'general',
        response: responseText,
      };
    }

    const { data: ticketData, error: ticketError } = await supabase
      .from('tickets')
      .insert({
        product_id,
        email,
        subject,
        message,
        ai_classification: classificationData.classification || 'general',
        ai_response: classificationData.response || '',
        status: 'open',
      })
      .select()
      .single();

    if (ticketError) {
      console.error('Ticket creation error:', ticketError);
      return NextResponse.json(
        { error: 'Failed to create ticket' },
        { status: 500 }
      );
    }

    if (ticketData) {
      await supabase.from('ticket_messages').insert({
        ticket_id: ticketData.id,
        sender_type: 'user',
        message: message,
      });
    }

    return NextResponse.json({
      success: true,
      ticket_id: ticketData?.id,
      response: classificationData.response,
      classification: classificationData.classification,
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
