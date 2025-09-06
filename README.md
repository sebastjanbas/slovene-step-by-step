# Slovene Step by Step

A modern, multilingual online language learning platform designed to help users master Slovenian through personalized lessons, interactive features, and community support. Built with Next.js 15, TypeScript, and modern web technologies.

## Live Demo

**Production URL:** https://slovenscinakzk.com/

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Development](#development)
- [Database](#database)
- [Internationalization](#internationalization)
- [Deployment](#deployment)
- [Contributing](#contributing)

## 🎯 Overview

Slovene Step by Step is a comprehensive online language learning platform that offers:

- **Personalized Slovenian Lessons**: Tailored to individual goals and learning styles
- **Multi-language Support**: Available in English, Slovenian, Russian, and Italian
- **Flexible Learning Options**: Individual, pair, and group lessons via Microsoft Teams and Zoom
- **Community Features**: Language club events and Telegram community (1,200+ members)
- **Progress Tracking**: Dashboard with learning analytics and achievements
- **Payment Integration**: Stripe-powered booking and payment system
- **Admin Panel**: Complete management system for courses and users

## Features

### Core Learning Features

- **Free Trial Lesson**: 45-minute introductory session with no commitment
- **Flexible Online Lessons**: Conducted via Teams or Zoom, accessible from anywhere
- **Tailored Learning Plans**: Customized content for travel, work, or relocation goals
- **Progress Tracking**: Comprehensive dashboard with learning statistics
- **Language Club**: Group events and community activities

### Platform Features

- **Multi-language Interface**: Support for EN, SL, RU, IT
- **Responsive Design**: Mobile-first approach with modern UI/UX
- **User Authentication**: Secure login with Clerk
- **Payment Processing**: Stripe integration for lesson bookings
- **Email Notifications**: Automated booking confirmations and updates
- **Admin Dashboard**: Complete management interface

### Community Features

- **Telegram Integration**: 1,200+ member community for practice and support
- **Language Club Events**: Regular group sessions and cultural activities
- **Tutor Profiles**: Detailed information about available instructors
- **Booking System**: Easy scheduling with calendar integration

## Tech Stack

### Frontend

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Framer Motion** - Animation library
- **GSAP** - Advanced animations
- **Lottie React** - Vector animations

### Backend & Database

- **PostgreSQL** - Primary database
- **Drizzle ORM** - Type-safe database queries
- **Next.js API Routes** - Serverless API endpoints
- **Clerk** - Authentication and user management

### Payment & Communication

- **Stripe** - Payment processing and webhooks
- **Resend** - Email delivery service
- **React Email** - Email template system

### Development Tools

- **ESLint** - Code linting
- **Bun** - Fast package manager and runtime
- **Drizzle Kit** - Database migrations and introspection

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── [locale]/          # Internationalized routes
│   │   ├── (protected)/   # Authenticated user pages
│   │   │   ├── (main)/    # Main user dashboard
│   │   │   └── admin/     # Admin panel
│   │   └── (unprotected)/ # Public pages
│   └── api/               # API routes
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components
│   ├── dashboard/        # Dashboard-specific components
│   └── content/          # Content and layout components
├── db/                   # Database schema and connection
├── actions/              # Server actions
├── emails/               # Email templates
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── schemas/              # Zod validation schemas
└── types/                # TypeScript type definitions
```

# Development

### Available Scripts

```bash
# Development
bun run dev          # Start development server
bun run build        # Build for production
bun run start        # Start production server
bun run lint         # Run ESLint

# Database
bun run db:generate  # Generate database migrations
bun run db:push      # Push schema changes to database
bun run db:seed      # Seed database with sample data

# Email development
bun run email        # Start email preview server

# Testing
bun run test:webhook # Test Clerk webhook
```

## Database

The application uses PostgreSQL with Drizzle ORM. Key tables include:

- **lang_club**: Language club events and sessions
- **lang_club_bookings**: User bookings and payment tracking
- **users**: User profiles and preferences (managed by Clerk)

## Internationalization

The platform supports multiple languages with next-intl:

- **English** (en) - Default
- **Slovenian** (sl)
- **Russian** (ru)
- **Italian** (it)

Language files are located in `/messages/` directory. Routes are automatically localized based on the user's locale preference.

## License

This project is private and proprietary. All rights reserved.

## Support

For support and questions:

- **Website**: https://slovenscinakzk.com/
- **Email**: Contact through the website
- **Telegram**: Join our community group

---

Built with ❤️ for Slovenian language learners worldwide.
