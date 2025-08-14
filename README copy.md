# Kebena SDA Church Website

A modern, bilingual (Amharic/English) church website built with React, TypeScript, and Tailwind CSS.

## Features

- **Bilingual Support**: Full Amharic and English language support
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional design with smooth animations
- **Authentication**: Login and signup functionality
- **Church Sections**: Hero, About, Publications, Services, Contact
- **Interactive Elements**: Dynamic content, forms, and navigation

## Technology Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS v4
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Notifications**: Sonner

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd kebena-sda-church
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
├── src/
│   └── main.tsx           # Application entry point
├── components/
│   ├── EthiopianLandingPage.tsx  # Main landing page
│   ├── AuthPages.tsx             # Login/Signup pages
│   └── ui/                       # Reusable UI components
├── contexts/
│   └── LanguageContext.tsx      # Language switching context
├── services/
│   └── api.ts                   # API service layer
├── types/
│   └── index.ts                 # TypeScript type definitions
├── styles/
│   └── globals.css              # Global styles and Tailwind config
└── utils/
    └── supabase/                # Mock Supabase utilities
```

## Language Support

The website supports both Amharic (አማርኛ) and English languages:

- Switch languages using the toggle in the navigation
- All content, forms, and messages are fully translated
- Proper text direction and typography handling

## Authentication

Currently set up with mock authentication for local development:

- Login with any valid email/password combination
- Admin users: use email containing "admin"
- Regular users: any other email address

## Customization

### Adding New Translations

Edit `contexts/LanguageContext.tsx` to add new translation keys:

```typescript
const translations = {
  en: {
    newKey: 'English text'
  },
  am: {
    newKey: 'አማርኛ ጽሑፍ'
  }
};
```

### Styling

The project uses Tailwind CSS v4. Global styles are in `styles/globals.css`.

### Adding New Sections

Create new components in the `components/` directory and import them in the main landing page.

## Deployment

1. Build the project:
```bash
npm run build
```

2. The `dist/` directory contains the production-ready files

3. Deploy to your preferred hosting platform (Vercel, Netlify, etc.)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please contact the church administration or create an issue in the repository.