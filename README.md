# AI-Powered Financial Management System This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).



A modern, intelligent financial management platform built with Next.js 15, featuring AI-powered receipt scanning, automated budget alerts, recurring transaction management, and comprehensive financial insights.## Getting Started



![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black)First, run the development server:

![React](https://img.shields.io/badge/React-19.1.0-blue)

![Prisma](https://img.shields.io/badge/Prisma-6.19.0-2D3748)```bash

![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)npm run dev

# or

## ✨ Featuresyarn dev

# or

### 🎯 Core Featurespnpm dev

- **Multi-Account Management**: Track multiple bank accounts (Current & Savings)# or

- **Transaction Tracking**: Record income and expenses with detailed categorizationbun dev

- **AI Receipt Scanning**: Automatically extract transaction details from receipt images using Google Gemini AI```

- **Budget Management**: Set monthly budgets and track spending in real-time

- **Recurring Transactions**: Automate recurring income/expenses (daily, weekly, monthly, yearly)Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

- **Dashboard Analytics**: Visual insights with charts and transaction overviews

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

### 🤖 AI-Powered Features

- **Smart Receipt Analysis**: Extract amount, date, merchant, category from receiptsThis project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

- **Monthly Financial Insights**: AI-generated personalized financial advice

- **Intelligent Categorization**: Automatic transaction categorization## Learn More



### 🔔 Automated FeaturesTo learn more about Next.js, take a look at the following resources:

- **Budget Alerts**: Automatic email notifications when spending exceeds 80% of budget

- **Recurring Transactions**: Automatic processing of scheduled transactions- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.

- **Monthly Reports**: Automated monthly financial summary emails with AI insights- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.



### 🔒 Security & PerformanceYou can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

- **Authentication**: Secure user authentication with Clerk

- **Rate Limiting**: Arcjet integration for API protection## Deploy on Vercel

- **Bot Detection**: Shield protection against malicious traffic

- **Database**: PostgreSQL with Prisma ORMThe easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.



## 🏗️ Tech StackCheck out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


### Frontend
- **Framework**: Next.js 15.5.4 (App Router with Turbopack)
- **UI Library**: React 19.1.0
- **Styling**: Tailwind CSS 4
- **Components**: Radix UI, shadcn/ui
- **Charts**: Recharts
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React

### Backend
- **Database**: PostgreSQL (Neon)
- **ORM**: Prisma 6.19.0
- **Authentication**: Clerk
- **Email**: Resend API
- **AI**: Google Generative AI (Gemini 1.5 Flash)
- **Background Jobs**: Inngest
- **Security**: Arcjet (Rate limiting, Bot detection, Shield)

### DevOps
- **Language**: TypeScript & JavaScript
- **Linting**: Biome
- **Package Manager**: npm

## 📁 Folder Structure

```
major-project/
├── actions/                    # Server actions
│   ├── accounts.js            # Account management actions
│   ├── budget.js              # Budget operations
│   ├── dashboard.js           # Dashboard data fetching
│   ├── seed.js                # Database seeding
│   ├── send-email.js          # Email sending logic
│   └── transaction.js         # Transaction CRUD + AI scanning
│
├── app/                       # Next.js App Router
│   ├── (auth)/               # Authentication routes
│   │   ├── sign-in/
│   │   └── sign-up/
│   ├── (main)/               # Protected routes
│   │   ├── account/[id]/     # Account details page
│   │   ├── dashboard/        # Main dashboard
│   │   └── transaction/      # Transaction management
│   ├── api/                  # API routes
│   │   ├── inngest/         # Inngest webhook endpoint
│   │   └── seed/            # Database seeding endpoint
│   ├── lib/                  # App-specific utilities
│   │   └── schema.js        # Validation schemas
│   ├── globals.css          # Global styles
│   ├── layout.js            # Root layout
│   └── page.js              # Landing page
│
├── components/                # Reusable components
│   ├── ui/                   # shadcn/ui components
│   │   ├── button.jsx
│   │   ├── card.jsx
│   │   ├── input.jsx
│   │   ├── progress.jsx
│   │   └── ...
│   ├── create-account-drawer.jsx
│   ├── header.jsx
│   └── hero.jsx
│
├── data/                      # Static data
│   ├── categories.js         # Transaction categories
│   └── landing.js            # Landing page content
│
├── emails/                    # Email templates
│   └── templates.js          # React email templates
│
├── hooks/                     # Custom React hooks
│   └── use-fetch.js          # Fetch wrapper hook
│
├── lib/                       # Core utilities
│   ├── inngest/              # Background job definitions
│   │   ├── client.js        # Inngest client setup
│   │   └── function.js      # Job functions (alerts, reports, etc.)
│   ├── arcjet.js            # Security configuration
│   ├── checkUser.js         # User authentication helper
│   ├── prisma.js            # Prisma client instance
│   └── utils.js             # Utility functions
│
├── prisma/                    # Database
│   ├── migrations/           # Database migrations
│   ├── schema.prisma        # Database schema
│   └── ...
│
├── public/                    # Static assets
│
├── .env                       # Environment variables (not in repo)
├── middleware.ts             # Next.js middleware (Auth + Security)
├── next.config.mjs          # Next.js configuration
├── package.json             # Dependencies
├── prisma.config.ts         # Prisma configuration
├── tailwind.config.js       # Tailwind CSS config
└── tsconfig.json            # TypeScript config
```

## 🚀 Installation Instructions

### Prerequisites
- Node.js 20+ installed
- PostgreSQL database (or Neon account)
- npm or yarn package manager

### 1. Clone the Repository
```bash
git clone https://github.com/anant211205/Major-Project.git
cd Major-Project
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables Setup
Create a `.env` file in the root directory:

```env
# Database (Neon PostgreSQL)
DATABASE_URL="postgresql://user:password@host:port/database?sslmode=require"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# Google Gemini AI
GEMINI_API_KEY=your_gemini_api_key

# Resend Email API
RESEND_API_KEY=your_resend_api_key

# Arcjet Security
ARCJET_KEY=your_arcjet_key

# Inngest (for background jobs)
INNGEST_EVENT_KEY=your_inngest_event_key
INNGEST_SIGNING_KEY=your_inngest_signing_key
```

### 4. Database Setup
```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# (Optional) Seed the database
npm run seed
```

### 5. Run Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your application.

### 6. (Optional) Run Prisma Studio
```bash
npx prisma studio
```

Access the database GUI at [http://localhost:5555](http://localhost:5555)

## 📝 Available Scripts

```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run Biome linter
npm run format       # Format code with Biome
```

## 🔑 Getting API Keys

### Clerk (Authentication)
1. Go to [clerk.com](https://clerk.com)
2. Create a new application
3. Copy the API keys from the dashboard

### Neon (Database)
1. Sign up at [neon.tech](https://neon.tech)
2. Create a new project
3. Copy the connection string

### Google Gemini AI
1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Create an API key
3. Copy the key

### Resend (Email)
1. Sign up at [resend.com](https://resend.com)
2. Create an API key
3. Verify your domain or use test mode

### Arcjet (Security)
1. Go to [arcjet.com](https://arcjet.com)
2. Create a new site
3. Copy the API key

### Inngest (Background Jobs)
1. Sign up at [inngest.com](https://inngest.com)
2. Create a new app
3. Copy the event key and signing key

## 📊 Database Schema

The application uses the following main models:

- **User**: User accounts (linked to Clerk)
- **Account**: Bank accounts (Current/Savings)
- **Transaction**: Income and expense records
- **Budget**: Monthly budget settings

### Key Relationships
- User → Multiple Accounts
- User → Multiple Transactions
- User → One Budget
- Account → Multiple Transactions

## 🎨 Key Components

### Dashboard
- Account overview cards
- Budget progress indicator with color-coded alerts
- Transaction overview charts
- Quick actions (Add account, Add transaction)

### Transaction Management
- AI-powered receipt scanning
- Manual transaction entry
- Transaction editing and deletion
- Category-based filtering
- Recurring transaction setup

### Account Management
- Multiple account support
- Default account designation
- Account-specific transaction history
- Visual spending charts

## 🤖 Background Jobs (Inngest)

### Budget Alerts
- **Frequency**: Every 6 hours
- **Function**: Checks if spending exceeds 80% of budget
- **Action**: Sends email alert (once per month)

### Recurring Transactions
- **Frequency**: Daily at midnight
- **Function**: Processes due recurring transactions
- **Action**: Creates new transactions and updates balances

### Monthly Reports
- **Frequency**: First day of each month
- **Function**: Generates financial summary with AI insights
- **Action**: Sends detailed email report

## 🔐 Security Features

- **Authentication**: Clerk-based secure authentication
- **Rate Limiting**: API endpoint protection with Arcjet
- **Bot Detection**: Automatic bot blocking
- **Shield Protection**: XSS and injection attack prevention
- **Middleware**: Route-based authentication checks

## 🌐 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Other Platforms
The app can be deployed to any platform supporting Next.js 15:
- Netlify
- Railway
- Digital Ocean
- AWS

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Authors

**RG10 Team**


## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Clerk for authentication
- Vercel for hosting
- Google for Gemini AI
- All open-source contributors

---

**Made with 💗 by RG10**
