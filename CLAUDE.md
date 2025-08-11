# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Sanctuary is a monorepo for managing online bookmarks, consisting of:
- **Backend**: Node.js/Express API with TypeScript, using Supabase for data storage
- **Frontend**: React Native app built with Expo Router for cross-platform mobile development

## Development Commands

### Root Level Commands
```bash
# Start backend development server
pnpm dev:backend

# Start frontend development server  
pnpm dev:frontend

# Run linting across all workspaces
pnpm lint

# Run type checking across all workspaces
pnpm typecheck
```

### Backend Commands (from /backend)
```bash
# Start development server with hot reload
pnpm dev

# Type checking only
pnpm typecheck

# Linting
pnpm lint
pnpm lint:fix
```

### Frontend Commands (from /app-frontend)
```bash
# Start Expo development server
pnpm dev

# Run on specific platforms
pnpm android
pnpm ios
pnpm web

# Testing
pnpm test

# Type checking and linting
pnpm typecheck
pnpm lint
pnpm lint:fix
```

## Architecture

### Monorepo Structure
- Uses pnpm workspaces with `backend` and `app-frontend` packages
- Husky pre-commit hooks ensure lint and typecheck pass before commits

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: Supabase (PostgreSQL)
- **Authentication**: JWT tokens with bcrypt for password hashing
- **Web Scraping**: Puppeteer for extracting bookmark details
- **Structure**: 
  - Controllers handle route logic (`/src/controllers/`)
  - Utilities and configuration in `/src/utils/`
  - Scripts for data processing in `/src/scripts/`

### Frontend Architecture
- **Framework**: React Native with Expo Router (file-based routing)
- **Navigation**: Nested stack and tab navigation structure
- **State Management**: React Context for authentication
- **Styling**: Custom theme system with dark/light mode support
- **Key Features**:
  - Authentication flow (`(auth)` group)
  - Main app with bottom tabs (`(main)/(tabs)` groups)
  - Bookmark and collection management
  - Search functionality

### Key Patterns
- Backend uses path aliasing (`@/`) for clean imports
- Frontend follows Expo Router conventions with grouped routes
- Both apps use TypeScript with strict type checking
- Context providers handle cross-cutting concerns (auth, theming)

## Development Notes

### Backend
- Runs on port 3001 in development
- Uses `tsx watch` for hot reloading during development
- Environment variables handled via dotenv

### Frontend
- Built with Expo SDK ~52.0
- Uses React Navigation for complex navigation patterns
- Implements custom hooks for theme and storage state management
- SVG assets handled via react-native-svg-transformer

### Migration Plans
- Backend: Migrating to Hono framework
- Database: Migrating to Convex for real-time capabilities