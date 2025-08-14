import { NextApiRequest, NextApiResponse } from 'next';

interface AutomationPayload {
  automationId: string;
  trigger: string;
  data: any;
  timestamp: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const payload: AutomationPayload = req.body;
    
    // Validate required fields
    if (!payload.automationId || !payload.trigger) {
      return res.status(400).json({ 
        error: 'Missing required fields: automationId, trigger' 
      });
    }

    // Log the automation trigger
    console.log('🤖 Automation triggered:', {
      id: payload.automationId,
      trigger: payload.trigger,
      timestamp: new Date().toISOString()
    });

    // Process the automation (integrate with your backend here)
    const result = await processAutomation(payload);

    // Respond with success
    res.status(200).json({
      success: true,
      message: 'Automation triggered successfully',
      automationId: payload.automationId,
      result: result
    });

  } catch (error) {
    console.error('❌ Automation webhook error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

async function processAutomation(payload: AutomationPayload) {
  // This is where you'd integrate with Bhindi AI automations
  // Example processing logic:
  
  switch (payload.trigger) {
    case 'data_received':
      return await handleDataReceived(payload.data);
    case 'schedule_triggered':
      return await handleScheduledTask(payload.data);
    case 'external_event':
      return await handleExternalEvent(payload.data);
    default:
      return { status: 'processed', action: 'default_handler' };
  }
}

async function handleDataReceived(data: any) {
  // Process incoming data
  return { status: 'data_processed', records: data?.length || 0 };
}

async function handleScheduledTask(data: any) {
  // Handle scheduled automation
  return { status: 'task_executed', taskId: data?.taskId };
}

async function handleExternalEvent(data: any) {
  // Handle external events
  return { status: 'event_processed', eventType: data?.type };
}