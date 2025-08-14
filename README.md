# Bhindi Automation Dashboard

A modern web application for integrating with Bhindi AI automations, featuring real-time monitoring, webhook endpoints, and automation management.

## Features

- 🤖 **Real-time Automation Monitoring** - Track active automations and their performance
- 🔗 **Webhook Integration** - Receive and process automation triggers
- 📊 **Analytics Dashboard** - View success rates, trigger counts, and statistics
- ⚙️ **Automation Management** - Create, update, and control automations
- 🎨 **Modern UI** - Clean, responsive design with Tailwind CSS

## Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/Keyursinh06-s/bhindi-automation-dashboard.git
cd bhindi-automation-dashboard
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:
```env
BHINDI_API_URL=https://api.bhindi.ai
BHINDI_API_KEY=your-api-key-here
WEBHOOK_SECRET=your-webhook-secret-here
```

### 4. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

## API Endpoints

### Webhook Endpoints
- `POST /api/webhooks/automation` - Trigger automation workflows
- `POST /api/webhooks/data` - Receive data from external sources

### Automation Management
- `GET /api/automations` - List all automations
- `POST /api/automations` - Create new automation
- `PUT /api/automations/[id]` - Update automation
- `DELETE /api/automations/[id]` - Delete automation

## Integration Examples

### Triggering an Automation
```bash
curl -X POST https://your-domain.com/api/webhooks/automation \
  -H "Content-Type: application/json" \
  -d '{
    "automationId": "email-notification",
    "trigger": "data_received",
    "data": {
      "email": "user@example.com",
      "message": "Hello from Bhindi!"
    }
  }'
```

### Sending Data
```bash
curl -X POST https://your-domain.com/api/webhooks/data \
  -H "Content-Type: application/json" \
  -d '{
    "source": "external-api",
    "type": "user_action",
    "data": {
      "userId": "123",
      "action": "purchase",
      "amount": 99.99
    }
  }'
```

## Deployment

### Deploy to Vercel
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically on push

### Deploy to Other Platforms
The app is a standard Next.js application and can be deployed to:
- Netlify
- AWS Amplify
- Railway
- Render
- Any Node.js hosting platform

## Tech Stack

- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **API**: RESTful endpoints with validation
- **Deployment**: Vercel-ready

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

For support with Bhindi AI integrations, visit [bhindi.ai](https://bhindi.ai) or contact the Bhindi team.