# CartpetAI - AI-Powered Session Replay & Analytics

CartpetAI is an open-source platform for session replay, user behavior analysis, and AI-powered insights for web applications.

## Features

- 🎥 **Session Replay** - Record and replay user sessions
- 🤖 **AI-Powered Analytics** - Get intelligent insights about user behavior
- 📊 **Action Tracking** - Track user interactions and actions
- 🔍 **Behavioral Analysis** - Understand what users do and why
- 📈 **Performance Metrics** - Monitor user engagement and performance

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm
- Environment variables configured

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/cartpetai.git
cd cartpetai
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Required environment variables:
```env
NEXT_PUBLIC_API_URL=your_api_url
NEXT_PUBLIC_SITE_URL=your_site_url
NEXT_PUBLIC_CARPETAI_API_KEY=your_api_key
```

4. Run the development server:
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_API_URL` | Your API endpoint URL | Yes |
| `NEXT_PUBLIC_SITE_URL` | Your site URL | Yes |
| `NEXT_PUBLIC_CARPETAI_API_KEY` | Your CartpetAI API key | Yes |

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please open an issue on GitHub or contact us at support@cartpetai.com.
