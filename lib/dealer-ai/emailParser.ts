import { type ParsedEmailLead } from '@/lib/dealer-ai/types';

const emptyResult: ParsedEmailLead = {
  name: '',
  email: '',
  phone: '',
  vehicle: '',
  source: '',
  message: ''
};

export async function parseEmailLead(rawEmail: string): Promise<ParsedEmailLead> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is required.');
  }

  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-4.1-mini',
      input: [
        {
          role: 'system',
          content: 'Extract lead fields from raw email. Return JSON only with keys: name, email, phone, vehicle, source, message. Missing fields must be empty strings.'
        },
        {
          role: 'user',
          content: rawEmail
        }
      ],
      text: {
        format: {
          type: 'json_schema',
          name: 'email_lead',
          schema: {
            type: 'object',
            additionalProperties: false,
            properties: {
              name: { type: 'string' },
              email: { type: 'string' },
              phone: { type: 'string' },
              vehicle: { type: 'string' },
              source: { type: 'string' },
              message: { type: 'string' }
            },
            required: ['name', 'email', 'phone', 'vehicle', 'source', 'message']
          }
        }
      }
    })
  });

  if (!response.ok) {
    throw new Error(`OpenAI parsing failed (${response.status}): ${await response.text()}`);
  }

  const data = await response.json();
  const output = data.output_text ? JSON.parse(data.output_text) : emptyResult;

  return {
    name: String(output.name ?? ''),
    email: String(output.email ?? ''),
    phone: String(output.phone ?? ''),
    vehicle: String(output.vehicle ?? ''),
    source: String(output.source ?? ''),
    message: String(output.message ?? '')
  };
}
