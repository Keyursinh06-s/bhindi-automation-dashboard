import { NextApiRequest, NextApiResponse } from 'next';

interface DataPayload {
  source: string;
  type: string;
  data: any;
  metadata?: any;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const payload: DataPayload = req.body;
    
    // Validate payload
    if (!payload.source || !payload.type || !payload.data) {
      return res.status(400).json({ 
        error: 'Missing required fields: source, type, data' 
      });
    }

    // Log incoming data
    console.log('📊 Data received:', {
      source: payload.source,
      type: payload.type,
      timestamp: new Date().toISOString(),
      dataSize: JSON.stringify(payload.data).length
    });

    // Process the data
    const result = await processIncomingData(payload);

    res.status(200).json({
      success: true,
      message: 'Data processed successfully',
      result: result
    });

  } catch (error) {
    console.error('❌ Data webhook error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

async function processIncomingData(payload: DataPayload) {
  // Process different types of incoming data
  switch (payload.type) {
    case 'user_action':
      return await processUserAction(payload.data);
    case 'system_event':
      return await processSystemEvent(payload.data);
    case 'external_api':
      return await processExternalApiData(payload.data);
    default:
      return { status: 'received', type: payload.type };
  }
}

async function processUserAction(data: any) {
  return { status: 'user_action_processed', userId: data?.userId };
}

async function processSystemEvent(data: any) {
  return { status: 'system_event_processed', eventId: data?.eventId };
}

async function processExternalApiData(data: any) {
  return { status: 'api_data_processed', records: Array.isArray(data) ? data.length : 1 };
}