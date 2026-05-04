# Tagore Vidya Niketan ![Next.js](https://img.shields.io/badge/Next.js-14%2B-black?logo=next.js&logoColor=white) ![React](https://img.shields.io/badge/React-19-blue?logo=react&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?logo=typescript&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8?logo=tailwindcss&logoColor=white) ![MongoDB](https://img.shields.io/badge/MongoDB-6.12-green?logo=mongodb&logoColor=white)

[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A modern, responsive website for **Tagore Vidya Niketan**, built with Next.js 14 App Router. Features animated hero with 3D elements, comprehensive school sections, admin dashboard, and admissions API with MongoDB backend.

## ✨ Features
- 📱 **Fully Responsive** - Mobile-first design with TailwindCSS & Shadcn UI
- 🎨 **Dark/Light Theme** - System preference support with next-themes
- 🚀 **Smooth Animations** - GSAP, Three.js for hero scene & scroll reveals
- 🛡️ **Admin Dashboard** - `/admin` for management
- 🔌 **Admissions API** - `/api/admissions` with MongoDB integration
- 📊 **Gallery & Academics** - Dynamic sections with image gallery
- 📞 **Contact Form** - Integrated with toast notifications
- ⚡ **Performance Optimized** - Next.js optimizations, code splitting

Live Demo: [Add your deployed URL here]

## 🛠 Tech Stack
| Category | Technologies |
|----------|--------------|
| **Framework** | Next.js 14+, React 19, TypeScript 5.7 |
| **Styling** | TailwindCSS 3.4, Shadcn UI, Tailwind Merge, CSS Variables |
| **UI Components** | Radix UI, Lucide Icons, Sonner Toasts |
| **Animations** | GSAP 3.12, Three.js 0.172, Framer Motion |
| **Data & Forms** | React Hook Form, Zod Validation, Recharts |
| **Database/API** | MongoDB 6.12, Next.js API Routes |
| **Utils** | Class Variance Authority (CVA), Date-fns |
| **Deployment** | Vercel (recommended) |

## 📋 Prerequisites
- [ ] Node.js 20+
- [ ] pnpm (recommended)
- [ ] MongoDB instance (local or Atlas)
  - Add `MONGODB_URI` to `.env.local`

## 🚀 Quick Start
```bash
# Clone the repo
git clone <your-repo-url>
cd tagore-vidya-niketan

# Install dependencies
pnpm install

# Setup MongoDB (run once)
node scripts/setup-mongodb.js

# Run development server
pnpm dev

# Open http://localhost:3000
```

**Production:**
```bash
pnpm run build
pnpm start
```

## 📁 Project Structure
```
tagore-vidya-niketan/
├── app/                 # App Router pages & layouts
│   ├── admin/           # Admin dashboard
│   ├── api/admissions/  # API route for admissions
│   ├── globals.css      # Global styles
│   └── page.tsx         # Home page (Hero → Footer)
├── components/          # Reusable components
│   ├── ui/             # Shadcn UI components
│   └── sections/       # Page sections (Hero, About, etc.)
├── lib/                # Utilities (MongoDB, utils.ts)
├── hooks/              # Custom React hooks
├── public/images/      # Static assets (logo, gallery)
├── scripts/            # Setup scripts
├── styles/             # Additional CSS
├── tailwind.config.ts  # Custom theme & fonts
└── package.json        # pnpm managed
```

## 🔌 API Endpoints
- `POST /api/admissions` - Submit admission form (MongoDB)
```json
{
  "name": "string",
  "email": "string",
  "phone": "string",
  "grade": "string"
}
```

## 🧑‍💻 Admin Panel
Access `/admin` for dashboard features (extend as needed).

## ☁️ Deployment
1. Push to GitHub
2. Import to [Vercel](https://vercel.com)
3. Add `MONGODB_URI` as Environment Variable
4. Deploy! ✅

## 🔍 Scripts
| Script | Description |
|--------|-------------|
| `pnpm dev` | Start dev server |
| `pnpm build` | Production build |
| `pnpm lint` | ESLint check |
| `node scripts/clear-cache.js` | Clear Next.js cache |
| `node scripts/setup-mongodb.js` | Initialize MongoDB |

## 🤝 Contributing
1. Fork the project
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push & PR

## 📄 License
This project is [MIT](LICENSE) licensed.

---

⭐ **Star the repo if you found it helpful!**  
Built with ❤️ for Tagore Vidya Niketan  
[Deploy to Vercel : https://tagore-vidya-niketan.vercel.app/
```

