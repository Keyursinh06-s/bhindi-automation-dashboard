import { NextApiRequest, NextApiResponse } from 'next';

interface Automation {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'paused' | 'error';
  triggers: string[];
  actions: string[];
  createdAt: string;
  lastRun?: string;
  stats: {
    totalRuns: number;
    successfulRuns: number;
    failedRuns: number;
  };
}

// In-memory storage (replace with database in production)
let automations: Automation[] = [
  {
    id: '1',
    name: 'Email Notification System',
    description: 'Sends email notifications when specific events occur',
    status: 'active',
    triggers: ['webhook', 'schedule'],
    actions: ['send_email', 'log_event'],
    createdAt: '2025-08-14T10:00:00Z',
    lastRun: '2025-08-14T13:25:00Z',
    stats: { totalRuns: 45, successfulRuns: 43, failedRuns: 2 }
  },
  {
    id: '2',
    name: 'Data Sync Automation',
    description: 'Synchronizes data between different systems',
    status: 'active',
    triggers: ['api_call', 'data_change'],
    actions: ['sync_data', 'update_records'],
    createdAt: '2025-08-14T09:30:00Z',
    lastRun: '2025-08-14T13:20:00Z',
    stats: { totalRuns: 12, successfulRuns: 12, failedRuns: 0 }
  }
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return handleGet(req, res);
    case 'POST':
      return handlePost(req, res);
    default:
      return res.status(405).json({ error: 'Method not allowed' });
  }
}

async function handleGet(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { status, search } = req.query;
    
    let filteredAutomations = automations;
    
    // Filter by status
    if (status && typeof status === 'string') {
      filteredAutomations = filteredAutomations.filter(auto => auto.status === status);
    }
    
    // Search by name
    if (search && typeof search === 'string') {
      filteredAutomations = filteredAutomations.filter(auto => 
        auto.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    res.status(200).json({
      success: true,
      data: filteredAutomations,
      total: filteredAutomations.length
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch automations' });
  }
}

async function handlePost(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { name, description, triggers, actions } = req.body;
    
    if (!name || !description || !triggers || !actions) {
      return res.status(400).json({ 
        error: 'Missing required fields: name, description, triggers, actions' 
      });
    }
    
    const newAutomation: Automation = {
      id: Date.now().toString(),
      name,
      description,
      status: 'paused',
      triggers,
      actions,
      createdAt: new Date().toISOString(),
      stats: { totalRuns: 0, successfulRuns: 0, failedRuns: 0 }
    };
    
    automations.push(newAutomation);
    
    res.status(201).json({
      success: true,
      message: 'Automation created successfully',
      data: newAutomation
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create automation' });
  }
}