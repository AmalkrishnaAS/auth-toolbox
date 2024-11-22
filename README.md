# Auth Toolbox

A modern authentication starter template for Next.js 14 applications, featuring a complete authentication system with OAuth, email verification, and two-factor authentication.

> **⚠️ Important Note**: This template uses Auth.js (NextAuth.js) v5 beta. While the beta version is stable enough for most use cases, be aware that there might be breaking changes when v5 stable is released. We will update the template once v5 is officially released.

## Features

- 🔐 Next-Auth v5 Integration
- 📱 Two-Factor Authentication
- 📧 Email Verification
- 🔑 Credential Authentication
- 🌐 OAuth Providers (GitHub, Google)
- 🎨 Beautiful UI with shadcn/ui
- 🔒 Protected Routes
- ⚡ Server Actions
- 📁 Database with Prisma
- ✉️ Email Service with Resend

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Authentication:** NextAuth.js v5
- **Database:** PostgreSQL (via Neon)
- **ORM:** Prisma
- **UI Components:** shadcn/ui
- **Styling:** Tailwind CSS
- **Email Service:** Resend
- **Form Handling:** React Hook Form
- **Validation:** Zod

## Getting Started

### 1. Clone the template

```bash
npx create-next-app@latest your-app-name -e https://github.com/yourusername/auth-toolbox
```

### 2. Install dependencies

```bash
cd your-app-name
npm install
```

### 3. Configure environment variables

Create a `.env` file:

```env
AUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
RESEND_API_KEY=your-resend-api-key
GITHUB_ID=your-github-oauth-id
GITHUB_SECRET=your-github-oauth-secret
DATABASE_URL=your-database-url
```

### 4. Set up the database

```bash
npx prisma generate
npx prisma db push
```

### 5. Start the development server

```bash
npm run dev
```

## Project Structure

- `/app` - Application routes and pages
- `/components` - Reusable UI components
- `/lib` - Utility functions and configurations
- `/actions` - Server actions for authentication
- `/hooks` - Custom React hooks
- `/prisma` - Database schema and configurations
- `/public` - Static assets

## Authentication Features

- Sign Up/Sign In with email and password
- OAuth authentication (GitHub, Google)
- Email verification
- Two-factor authentication
- Password reset
- Protected routes
- Session management

## Troubleshooting

### Auth.js v5 Beta Notes

1. If you encounter type errors with `next-auth`, try:
   ```bash
   npm install next-auth@5.0.0-beta.4
   ```

2. Make sure your `next.config.mjs` includes:
   ```js
   experimental: {
     serverActions: true,
   }
   ```

3. The middleware configuration is crucial for route protection. If routes aren't being protected properly, check your `middleware.ts` configuration.

4. For OAuth configuration issues:
   - Ensure your callback URLs are correctly set in your OAuth provider settings
   - Double-check your environment variables
   - Make sure your OAuth provider is properly configured in `auth.config.ts`

### Common Issues

1. **Database Connection:**
   - Verify your DATABASE_URL in `.env`
   - Ensure your database is running
   - Run `npx prisma generate` after schema changes

2. **Email Verification:**
   - Check your RESEND_API_KEY
   - Verify email templates in `email-template.ts`
   - Check spam folder for verification emails

3. **Session Issues:**
   - Clear browser cookies and local storage
   - Check `AUTH_SECRET` in `.env`
   - Verify session configuration in `auth.ts`

For more detailed troubleshooting, please refer to the [Auth.js v5 Beta Documentation](https://authjs.dev/guides/upgrade-to-v5).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License

## Support

If you find this project helpful, please give it a ⭐️ on GitHub!