
<div align="center">

# 💪 FitTrack Pro — Health Tracker PWA

### *Log. Analyze. Ask. Install. Repeat.*

![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?style=for-the-badge&logo=javascript&logoColor=black)
![PWA](https://img.shields.io/badge/PWA-Installable-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white)
![Chart.js](https://img.shields.io/badge/Chart.js-Analytics-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white)
![ServiceWorker](https://img.shields.io/badge/Service_Worker-Offline_Ready-34D399?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

> *"Track every rep, every meal, every hour of sleep — then ask the AI what to do next."*

</div>

---

## 🎬 Video Demo


https://github.com/user-attachments/assets/76899fee-b2d0-45b8-aab5-e37d946ad5f0



---

## 📌 About

**FitTrack Pro** is a fully offline-capable **Progressive Web App (PWA)** for daily health and fitness tracking. Log your calories, protein, sleep, and exercise intensity — then visualize your performance trends with interactive charts. When you need expert advice, a floating AI-powered chatbot (powered by the [Fitness Tracker Chatbot 3.0](https://github.com/Aadityayadav333/Fitness-Tracker-Chatbot-3.0)) is always one tap away.

No backend. No login. No server costs. Just install and go.

---

## ✨ Features

- 📥 **Installable PWA** — Add to your home screen on Android, iOS, or desktop with a single tap
- 🔌 **Offline Support** — Service Worker caches the app so it works without internet
- 📋 **Daily Activity Logger** — Track calories, protein (g), sleep (hrs), and exercise intensity per day
- 🎯 **Custom Goal Setting** — Set personal daily targets for all four metrics
- 📊 **Performance Analytics** — Visual bar/doughnut charts via Chart.js comparing your averages vs. goals
- 📅 **Data History Table** — View all logged entries in a clean scrollable table
- 💬 **Floating AI Chatbot** — Tap 💬 anytime to open the RAG-powered fitness coach in a popup — powered by `fitness-tracker-chatbot-3-0.onrender.com`
- 🎨 **3-Page App Shell** — Log, Stats, and Settings views with smooth navigation
- 💾 **LocalStorage Persistence** — All your data lives in the browser — private, instant, no cloud

---

## 📸 App Pages

| Page | Description |
|---|---|
| **Log** (`index.html`) | Set daily goals & log today's calories, protein, sleep, and exercise |
| **Stats** (`stats.html`) | All-time averages + Chart.js bar graphs vs. your personal goals |
| **Settings** (`settings.html`) | Manage app preferences and data |

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| Language | Vanilla JavaScript (ES6+) |
| Markup | HTML5 |
| Styling | CSS3 (custom, responsive) |
| Charts | Chart.js (CDN) |
| PWA | Web App Manifest + Service Worker (`sw.js`) |
| Data Storage | localStorage (client-side) |
| AI Chatbot | Embedded iframe → Fitness Tracker Chatbot 3.0 (RAG + LLaMA 3.1 via Groq) |
| Icons | PNG (192×192, 512×512) |
| Theme Color | `#4f46e5` (Indigo) |

---

## 📁 Project Structure

```
Health-Tracker-PWA/
│
├── index.html        # 📋 Main log page — Daily goals + activity entry form
├── stats.html        # 📊 Analytics page — Chart.js charts & all-time averages
├── settings.html     # ⚙️ Settings page
│
├── script.js         # 🧠 Core JS — localStorage, form logic, chart rendering, chat toggle
├── style.css         # 🎨 App-wide styles
│
├── sw.js             # 🔌 Service Worker — offline caching strategy
├── manifest.json     # 📦 PWA manifest — name, icons, display, theme color
│
├── bot.png           # 🤖 Chatbot button icon
├── icon-192.png      # 📱 PWA icon (192×192)
└── icon-512.png      # 📱 PWA icon (512×512)
```

---

## 🔄 How the App Works

```
Open App (browser or installed PWA)
         │
         ▼
   Service Worker (sw.js)
   caches assets on first load
         │
         ▼
   index.html loads
         │
         ├── Set Daily Goals (calories / protein / sleep / exercise)
         │         └── Saved to localStorage
         │
         ├── Log Today's Activity (form submit)
         │         └── Entry pushed to localStorage array
         │
         ├── View Data Table (recent entries from localStorage)
         │
         └── Navigate to Stats ──► Chart.js reads localStorage
                                    renders Avg vs Goal charts

         💬 Floating Chat Button
              └── Opens iframe popup
                    └── fitness-tracker-chatbot-3-0.onrender.com
                          └── RAG + LLaMA 3.1 answers fitness questions
```

---

## 🚀 Getting Started

This is a **pure frontend PWA** — no build step, no dependencies to install.

### Option 1 — Open directly

```bash
git clone https://github.com/Aadityayadav333/Health-Tracker-PWA.git
cd Health-Tracker-PWA
```

Then open `index.html` in your browser. For full PWA features (Service Worker, install prompt), serve it over HTTP:

```bash
# Using Python
python -m http.server 8080

# Using Node.js npx
npx serve .
```

Visit `http://localhost:8080`

### Option 2 — Install as PWA

1. Open the app in **Chrome / Edge / Brave**
2. Look for the 📥 **"Install App"** button in the nav, or the browser's install icon in the address bar
3. Click install → the app opens as a standalone window, just like a native app

---

## 💬 AI Fitness Chatbot Integration

The chatbot popup embedded inside this PWA is powered by **[Fitness Tracker Chatbot 3.0](https://github.com/Aadityayadav333/Fitness-Tracker-Chatbot-3.0)** — a separate Flask + RAG backend deployed on Render.

```html
<!-- Floating chat button in every page -->
<button id="chat-toggle" onclick="toggleChat()">💬</button>

<!-- Popup iframe pointing to the chatbot -->
<iframe src="https://fitness-tracker-chatbot-3-0.onrender.com/" ...></iframe>
```

The chatbot uses **LangChain + FAISS + Cohere Embeddings + LLaMA 3.1 via Groq** to answer fitness, nutrition, and workout questions — all grounded in a curated knowledge base.

---

## 🌟 Fitness Influencers — The Inspiration Behind the Coach

The AI fitness coach in this app is trained on knowledge inspired by the training philosophies, nutrition guidance, and workout principles of these five incredible creators. Hours of their YouTube content shaped the thinking behind this chatbot's knowledge base.

<br>

<div align="center">

| | | | | |
|:---:|:---:|:---:|:---:|:---:|
| <img src="https://i.redd.it/max-euceda-22-years-old-59-185lbs-claims-science-based-v0-zkznkzdqeygc1.png?width=336&format=png&auto=webp&s=e7a0c76f4ea0e25efe5607d539f845f76d78530b" width="120" height="120" style="border-radius:50%;object-fit:cover" alt="Max Euceda"/> | <img src="https://www.optimumnutrition.co.in/cdn/shop/files/GWP05558.webp?v=1760004676" width="120" height="120" style="border-radius:50%;object-fit:cover" alt="Jeet Selal"/> | <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBVWU0nTnZot6Ezp09RLXFnXWgYzd5NHQF6w&s" width="120" height="120" style="border-radius:50%;object-fit:cover" alt="Saket Gokhle"/> | <img src="https://images.squarespace-cdn.com/content/v1/64c8035f53e9a56246c7c294/802d2e1f-82e7-4809-acee-b8aeb9b04b13/Jeff-Nippard.png" width="120" height="120" style="border-radius:50%;object-fit:cover" alt="Jeff Nippard"/> | <img src="https://preview.redd.it/a-day-in-life-of-a-bodybuilder-yatinder-singh-v0-oz5kdstxsxx21.jpg?width=800&format=pjpg&auto=webp&s=ce04e98179331f199cff5c4d29f258741ce6d753" width="120" height="120" style="border-radius:50%;object-fit:cover" alt="Yatinder Singh"/> |
| **[Max Euceda](https://www.youtube.com/@MaxEuceda7)** | **[Jeet Selal](https://www.youtube.com/c/JeetSelalAesthetics)** | **[Saket Gokhle](https://www.youtube.com/@SaketGokhaleVlogs)** | **[Jeff Nippard](https://www.youtube.com/@JeffNippard)** | **[Yatinder Singh](https://www.youtube.com/@YatinderSinghOfficial)** |
| 🇺🇸 Calisthenics & Aesthetics | 🇮🇳 Natural Bodybuilding & Diet | 🇮🇳 Fitness, Lifestyle & Fat Loss | 🇨🇦 Science-Based Strength Training | 🇮🇳 Mr. Asia · Powerlifting & Motivation |


</div>

<br>

---

## 📦 PWA Manifest

```json
{
  "name": "FitTrack Pro",
  "short_name": "FitTrack",
  "start_url": "index.html",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#4f46e5",
  "icons": [
    { "src": "icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

---

## 🧪 Browser Compatibility

| Browser | Tracker | Charts | PWA Install | Offline |
|---|---|---|---|---|
| Chrome | ✅ | ✅ | ✅ | ✅ |
| Edge | ✅ | ✅ | ✅ | ✅ |
| Firefox | ✅ | ✅ | ⚠️ Limited | ✅ |
| Safari (iOS) | ✅ | ✅ | ✅ (Add to Home) | ✅ |

---

## 🚧 Known Limitations

- LocalStorage limit (~5–10 MB) — suitable for months of daily logs
- Chatbot requires internet connection (hosted separately on Render free tier — may sleep)
- No cloud sync — data is device-local only

---

## 🛣️ Future Roadmap

- [ ] IndexedDB migration for larger data capacity
- [ ] Cloud sync with optional account login
- [ ] Push notifications for daily logging reminders
- [ ] Weekly streak tracker
- [ ] Dark mode toggle

---

## 👨‍💻 Author

**Aaditya Yadav**
B.Tech CSE | Indore, India
[GitHub](https://github.com/Aadityayadav333)

> *"Code to know oneself and others better."*

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

<div align="center">

**⭐ Star this repo if it helped you level up your fitness journey!**

</div>
