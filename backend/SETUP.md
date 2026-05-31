# Food Seller Assistant — Frontend Setup Guide

## Prerequisites
- Node.js ≥ 18
- Your backend running at `http://localhost:3001` (or deployed on Render)

---

## 1. Scaffold the Vite + React project

Run this from your **project root** (same level as `backend/`):

```bash
npm create vite@latest frontend -- --template react
cd frontend
```

---

## 2. Install dependencies

```bash
npm install \
  react-router-dom \
  zustand \
  axios \
  @tanstack/react-query \
  react-hot-toast \
  lucide-react \
  clsx

npm install -D \
  tailwindcss \
  postcss \
  autoprefixer \
  @tailwindcss/forms \
  vite-plugin-pwa
```

---

## 3. Init Tailwind

```bash
npx tailwindcss init -p
```

Then replace `tailwind.config.js` with the one provided in this package.

---

## 4. Copy the source files

Replace / create the following inside `frontend/`:

```
frontend/
├── public/
│   ├── manifest.json          ← provided
│   ├── icon-192.png           ← add your own icon
│   └── icon-512.png           ← add your own icon
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── MobileNav.jsx  ← provided
│   │   │   ├── Sidebar.jsx    ← provided
│   │   │   └── TopBar.jsx     ← provided
│   │   └── ui/
│   │       ├── Button.jsx     ← provided
│   │       ├── Badge.jsx      ← provided
│   │       ├── Card.jsx       ← provided
│   │       └── Modal.jsx      ← provided
│   ├── hooks/
│   │   └── useAuth.js         ← provided
│   ├── pages/
│   │   ├── Login.jsx          ← provided
│   │   ├── Dashboard.jsx      ← provided (stub)
│   │   ├── MenuMaker.jsx      ← provided (stub)
│   │   ├── TodaysMenu.jsx     ← provided (stub)
│   │   ├── Customers.jsx      ← provided (stub)
│   │   ├── CustomerDetail.jsx ← provided (stub)
│   │   ├── Messaging.jsx      ← provided (stub)
│   │   └── Analytics.jsx      ← provided (stub)
│   ├── services/
│   │   └── api.js             ← provided
│   ├── store/
│   │   └── authStore.js       ← provided
│   ├── App.jsx                ← provided
│   ├── main.jsx               ← provided
│   ├── router.jsx             ← provided
│   └── index.css              ← provided
├── index.html                 ← provided
├── vite.config.js             ← provided
└── tailwind.config.js         ← provided
```

---

## 5. Environment variables

Create `frontend/.env`:

```env
VITE_API_BASE_URL=http://localhost:3001/api
```

For production (Vercel), set `VITE_API_BASE_URL` to your Render backend URL in the Vercel project settings.

---

## 6. Run it

```bash
# from frontend/
npm run dev
```

Visit `http://localhost:5173` — you should see the Login screen.

Use the seeded credentials:
- **Email:** `punzalpauljohn@gmail.com`
- **Password:** your seeded bcrypt password

---

## 7. Backend — missing files to add

The backend is missing three controller/service/model files that the routes reference but are only stubbed. See `backend-missing/` folder in this package for:

- `backend/src/controllers/menu.controller.js`
- `backend/src/controllers/customer.controller.js`
- `backend/src/models/menu.model.js`
- `backend/src/models/customer.model.js`

Copy those into your backend before wiring up the real API calls.

---

## 8. Deploy to Vercel

```bash
# from project root
vercel
# set root directory → frontend
# set VITE_API_BASE_URL to your Render URL
```

---

## PWA icons

Generate icons at https://realfavicongenerator.net or use any 512×512 PNG.  
Place them at `frontend/public/icon-192.png` and `frontend/public/icon-512.png`.
