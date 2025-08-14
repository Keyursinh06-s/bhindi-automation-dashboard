import React, { useState, useEffect } from 'react';
import { Activity, Zap, Settings, Database, Webhook, Play, Pause, BarChart3 } from 'lucide-react';

interface Automation {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'error';
  lastRun: string;
  triggers: number;
  success: number;
}

interface WebhookEvent {
  id: string;
  timestamp: string;
  type: string;
  payload: any;
  status: 'success' | 'error';
}

export default function Dashboard() {
  const [automations, setAutomations] = useState<Automation[]>([
    {
      id: '1',
      name: 'Email Notification System',
      status: 'active',
      lastRun: '2 minutes ago',
      triggers: 45,
      success: 43
    },
    {
      id: '2', 
      name: 'Data Sync Automation',
      status: 'active',
      lastRun: '5 minutes ago',
      triggers: 12,
      success: 12
    },
    {
      id: '3',
      name: 'Report Generator',
      status: 'paused',
      lastRun: '1 hour ago',
      triggers: 8,
      success: 7
    }
  ]);

  const [webhookEvents, setWebhookEvents] = useState<WebhookEvent[]>([
    {
      id: '1',
      timestamp: '2025-08-14T13:30:00Z',
      type: 'automation.triggered',
      payload: { automationId: '1', data: 'sample' },
      status: 'success'
    },
    {
      id: '2',
      timestamp: '2025-08-14T13:25:00Z', 
      type: 'webhook.received',
      payload: { source: 'external', action: 'process' },
      status: 'success'
    }
  ]);

  const [stats, setStats] = useState({
    totalAutomations: 3,
    activeAutomations: 2,
    totalTriggers: 65,
    successRate: 95.4
  });

  const toggleAutomation = (id: string) => {
    setAutomations(prev => prev.map(auto => 
      auto.id === id 
        ? { ...auto, status: auto.status === 'active' ? 'paused' : 'active' }
        : auto
    ));
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'paused': return 'text-yellow-600 bg-yellow-100';
      case 'error': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <Zap className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Bhindi Automation Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Settings className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Activity className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Automations</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.totalAutomations}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Play className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.activeAutomations}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Webhook className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Triggers</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.totalTriggers}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <BarChart3 className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Success Rate</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.successRate}%</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Automations List */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Active Automations</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {automations.map((automation) => (
                  <div key={automation.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <h3 className="text-sm font-medium text-gray-900">{automation.name}</h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(automation.status)}`}>
                          {automation.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">Last run: {automation.lastRun}</p>
                      <div className="flex space-x-4 mt-2 text-xs text-gray-500">
                        <span>Triggers: {automation.triggers}</span>
                        <span>Success: {automation.success}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleAutomation(automation.id)}
                      className="ml-4 p-2 text-gray-400 hover:text-gray-600"
                    >
                      {automation.status === 'active' ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Webhook Events */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Recent Webhook Events</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {webhookEvents.map((event) => (
                  <div key={event.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-2 h-2 rounded-full ${event.status === 'success' ? 'bg-green-400' : 'bg-red-400'}`}></div>
                        <span className="text-sm font-medium text-gray-900">{event.type}</span>
                      </div>
                      <span className="text-xs text-gray-500">
                        {new Date(event.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    <div className="mt-2">
                      <pre className="text-xs text-gray-600 bg-gray-50 p-2 rounded overflow-x-auto">
                        {JSON.stringify(event.payload, null, 2)}
                      </pre>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Integration Instructions */}
        <div className="mt-8 bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Integration Guide</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Webhook Endpoints</h3>
                <div className="space-y-2 text-sm">
                  <div className="bg-gray-50 p-3 rounded">
                    <code className="text-blue-600">POST /api/webhooks/automation</code>
                    <p className="text-gray-600 mt-1">Trigger automation workflows</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <code className="text-blue-600">POST /api/webhooks/data</code>
                    <p className="text-gray-600 mt-1">Receive data from external sources</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">API Endpoints</h3>
                <div className="space-y-2 text-sm">
                  <div className="bg-gray-50 p-3 rounded">
                    <code className="text-green-600">GET /api/automations</code>
                    <p className="text-gray-600 mt-1">List all automations</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <code className="text-yellow-600">PUT /api/automations/:id</code>
                    <p className="text-gray-600 mt-1">Update automation status</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}