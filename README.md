# Next.js Authentication Demo

A comprehensive authentication demo built with Next.js 15, NextAuth.js v5, and modern web technologies. This project demonstrates a complete authentication system including user registration, login, two-factor authentication (2FA), and password management.

## Features

- 🔐 **Complete Authentication System** - User registration, login, and session management
- 🔒 **Two-Factor Authentication (2FA)** - TOTP-based 2FA using authenticator apps
- 🔑 **Password Management** - Secure password reset and change functionality
- 🎨 **Modern UI** - Built with Tailwind CSS and Radix UI components
- 🗄️ **Database Integration** - PostgreSQL with Drizzle ORM
- 📱 **Responsive Design** - Mobile-first approach with modern UX patterns
- 🚀 **Next.js 15** - Latest App Router with TypeScript support

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Authentication**: NextAuth.js v5
- **Database**: PostgreSQL with Drizzle ORM
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui (built on Radix UI primitives)
- **Forms**: React Hook Form with Zod validation
- **Language**: TypeScript
- **Package Manager**: pnpm

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication routes (login, register, password reset)
│   ├── (logged-in)/       # Protected routes (my-account, password change)
│   ├── api/               # API routes
│   └── layout.tsx         # Root layout
├── components/             # Reusable components
│   ├── ui/                # Base UI components (buttons, cards, etc.)
│   └── logout-button.tsx  # Authentication component
├── db/                    # Database configuration and schemas
├── lib/                   # Utility functions and configurations
├── actions/               # Server actions
├── validation/            # Zod validation schemas
└── middleware.ts          # Next.js middleware
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- pnpm (recommended package manager)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd next-auth-demo
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Configure the following environment variables:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/your_database"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

4. Set up the database:
```bash
pnpm db:generate
pnpm db:push
```

5. Run the development server:
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Available Scripts

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build the application for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm db:generate` - Generate database migrations
- `pnpm db:push` - Push database schema changes

## Authentication Flow

1. **Registration**: Users can create accounts with email and password
2. **Login**: Secure authentication with credentials
3. **2FA Setup**: Optional two-factor authentication using TOTP
4. **Session Management**: Secure session handling with NextAuth.js
5. **Password Reset**: Secure password recovery via email tokens
6. **Account Management**: Users can update their account settings

## Security Features

- Password hashing with bcryptjs
- JWT-based session management
- TOTP-based two-factor authentication
- Secure password reset tokens
- Environment variable protection
- Type-safe database operations

## Database Schema

The application uses a PostgreSQL database with the following main tables:

- **users**: User accounts with 2FA support
- **password_reset_tokens**: Secure password reset functionality

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Drizzle ORM Documentation](https://orm.drizzle.team/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
