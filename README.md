# ⚡ Fluid Typography & Clamp Generator

A professional, high-performance tool for creating linearly-scaling CSS clamp() typography. Built with Next.js 15, Tailwind CSS 4, and a focus on accessibility and performance.

## ✨ Features

- 🚀 Linear Scaling: Automatically generate fluid clamp() values
- 📐 Slope-Intercept Logic: Uses y = mx + b for smooth scaling
- 🎨 Tailwind CSS 4: Modern UI with utility-first styling
- 📱 Real-time Preview: See typography changes instantly
- 🛠️ Fully Customizable: Control font sizes, viewport, and rem
- ♿ Accessibility First: Uses rem units
- ⚡ High Performance: Built with Next.js App Router

## 🛠️ Tech Stack

- Next.js 15
- Tailwind CSS 4
- Framer Motion
- Lucide React
- TypeScript

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm / pnpm / yarn

### Installation

```bash
git clone https://github.com/pawarshivamd/clamp--generator.git
cd clamp--generator
npm install
npm run dev
```

```📁 Project Structure
src/
├── app/
├── components/
├── hooks/
├── lib/
└── types/
```

🔧 The Math

Formula used:

y = mx + b

Final output:

clamp(minSize, base + relativeSize, maxSize)

🤝 Contributing
git checkout -b feature/AmazingFeature
git commit -m "Add feature"
git push origin feature/AmazingFeature

📄 License

MIT License

❤️ Author

Built by [Shivam Pawar](https://github.com/pawarshivamd)
