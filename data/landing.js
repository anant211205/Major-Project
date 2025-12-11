import {
    BarChart3,
    Receipt,
    PieChart,
    CreditCard,
    Globe,
    Zap,
} from "lucide-react";

// Stats Data
export const statsData = [
    {
        value: "10+",
        label: "Test Users",
    },
    {
        value: "1K+",
        label: "Transactions Tracked",
    },
    {
        value: "4+",
        label: "Key Features",
    },
    {
        value: "Open",
        label: "Source Project",
    },
];

// Features Data
export const featuresData = [
    {
        icon: <BarChart3 className="h-8 w-8 text-blue-600" />,
        title: "Transaction Analytics",
        description:
            "Track your spending patterns with clear charts and visual insights",
    },
    {
        icon: <Receipt className="h-8 w-8 text-blue-600" />,
        title: "Receipt Scanner",
        description:
            "Scan receipts and automatically extract transaction details using AI",
    },
    {
        icon: <PieChart className="h-8 w-8 text-blue-600" />,
        title: "Budget Management",
        description: "Set monthly budgets and get alerts when you're close to limits",
    },
    {
        icon: <CreditCard className="h-8 w-8 text-blue-600" />,
        title: "Multiple Accounts",
        description: "Track multiple bank accounts and view all transactions in one place",
    },
    {
        icon: <Zap className="h-8 w-8 text-blue-600" />,
        title: "Monthly Reports",
        description: "Receive monthly financial summaries with spending insights",
    },
];

// How It Works Data
export const howItWorksData = [
    {
        icon: <CreditCard className="h-8 w-8 text-blue-600" />,
        title: "1. Create Your Account",
        description:
            "Sign up in minutes using your email or Google account",
    },
    {
        icon: <BarChart3 className="h-8 w-8 text-blue-600" />,
        title: "2. Add Transactions",
        description:
            "Manually add transactions or scan receipts to track your spending",
    },
    {
        icon: <PieChart className="h-8 w-8 text-blue-600" />,
        title: "3. Monitor Your Budget",
        description:
            "View your dashboard and get insights on your spending habits",
    },
];

// Testimonials Data
export const testimonialsData = [
    {
        name: "Priya Sharma",
        role: "Small Business Owner",
        image: "https://randomuser.me/api/portraits/women/75.jpg",
        quote:
            "This app helps me keep track of my business expenses easily. The receipt scanner is a real time-saver.",
    },
    {
        name: "Rajesh Kumar",
        role: "Freelancer",
        image: "https://randomuser.me/api/portraits/men/75.jpg",
        quote:
            "Managing multiple client payments is much easier now. The dashboard gives me a clear view of my finances.",
    },
    {
        name: "Ananya Patel",
        role: "Graduate Student",
        image: "https://randomuser.me/api/portraits/women/74.jpg",
        quote:
            "Perfect for budgeting on a student income. The budget alerts help me stay on track with my monthly spending.",
    },
];
