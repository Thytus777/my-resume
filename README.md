# my-resume

Personal portfolio / resume site, built with Next.js and a bit of WebGL.

**Live:** https://thytusbenjamin.netlify.app

## Highlights

- 3D interactive elements (React Three Fiber / drei / Rapier physics) — including
  a physically-simulated lanyard badge
- Animated hero and section transitions (Framer Motion, GSAP)
- Interactive Melbourne map (React Leaflet)
- Sections: Hero, Experience, Projects, Skills, Contact

## Tech stack

- [Next.js](https://nextjs.org) 16 (App Router) + React 19 + TypeScript
- Tailwind CSS 4
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) / drei / Rapier for 3D/physics
- Framer Motion + GSAP for animation
- React Leaflet for the map
- Deployed on [Netlify](https://app.netlify.com/projects/thytusbenjamin/deploys)

## Getting started

```bash
git clone https://github.com/Thytus777/my-resume.git
cd my-resume
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it locally.

## Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start the dev server     |
| `npm run build` | Production build         |
| `npm run start` | Serve the production build |
| `npm run lint`  | Run ESLint                |
