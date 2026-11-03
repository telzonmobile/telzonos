Super Smooth, Performance & Stability ✨🔥
Things you can't do on other OSes and things you can do in one place ✨
TelzonOS 1.0

> A complete, phone-style web-based operating system that runs entirely in your browser.
Built with pure HTML5, CSS3 & JavaScript — no frameworks, no build step.


✨ What is TelzonOS?

TelzonOS is a fully interactive OS simulation that looks, feels and behaves like a modern smartphone OS — with a real lock screen, working apps, gesture navigation, an app store, a voice assistant and even an app-installer — all inside a single HTML file that runs anywhere the web runs.

Designed & developed by Daham Randunu 💙

---

🚀 Key Features

🔐 Security & Lock Screen
- Swipe-up unlock with smooth physics-based animation
- PIN lock (4 or 6 digits) and Password lock with brute-force protection (60s lockout after failed attempts)
- App Lock — lock individual apps with your PIN
- Always-On Display (AOD) with double-tap to wake
- Lock screen customization: clock size / weight / effects (Normal, Blur, Liquid Glass), clock colors, wallpaper styles
- Lock screen shortcuts (Camera, Photos, Flashlight, Voice…)
- Notifications mirrored on lock screen & AOD

🏠 Home Screen
- Multi-page app grid with hexagon glass icons
- Icon shape system: Hexagon / Round / Square / No-label / Flat / Mono themes
- Drag-to-reorder pages, page dots, edge-glow swipe hints
- Edit Home Screen mode — wallpapers, themes, animations, one-hand mode
- Parallax Wallpaper with smooth motion
- Long-press any app: info, features, uninstall
- iOS-style icon-morph app open/close animations (GPU-smooth, 60–120 FPS)

🔔 System UI
- Status bar: live clock, signal, battery % with charging indicator
- Control Center — Wi-Fi, Bluetooth, Cellular, Airplane, Torch (real flashlight on supported devices), DND, Rotation, brightness & volume sliders, resizable tiles
- Notification Center with media playback controls
- Recent Apps carousel with live screenshots & swipe-to-dismiss
- Glassmorphism toasts, confirm dialogs & haptic feedback (`navigator.vibrate`)

📱 Apps (25+ Working Apps)

App	Highlights	
📞 Phone	Dialer with ringtones	
💬 Messages	SMS-style conversations	
📷 Camera	Photo/Video, lenses (0.5x/1x/2x/Macro), zoom slider, aspect ratios, modes (Portrait, Night, Bokeh), tap-to-focus, front/back	
🖼️ Photos	Gallery, filters, favourites, details, editor, delete	
🎵 TMusic	Local music player with progress & controls	
🕐 Clock	Clock, Alarm, Timer, Stopwatch, World Clock	
📝 Notes / NotesPro	Full note editor with search	
📅 Calendar / CalPro	Month view + events	
🌐 TBrowser	URL bar with search	
🧮 Calculator	Clean iOS-style calculator	
🎨 Drawing / Sticker	Canvas drawing with colors & tools	
📹 VideoPlayer / Video Library	Local video playback	
🎧 Visualizer	Audio-reactive visualizer	
💰 TPay	Wallet UI with balance, actions & transactions	
🏪 TStore	Install new apps into the OS	
📦 TPA Installer	Telzon's own `.tpa` package installer (zip-based, like APK)	
✨ TelzonAI	Gemini-powered AI chat — voice mode with Speech-to-Text & Text-to-Speech, Sinhala/Tamil/English support, offline fallback replies, custom API key	
⚙️ Settings	Full system settings (see below)	
…and more	Reminders, Habits, Goals, Health, Files, Mail, Maps, WebIDE	

⚙️ Settings
- Telzon Account (cloud-ready profile)
- Network: Wi-Fi, Mobile Data, Bluetooth toggles
- Display: Wallpaper & Style, Dark/Light mode, Refresh rate (auto-adapt), Parallax wallpaper, Animation speed
- Battery: percentage display, Battery Saver (Normal Mode)
- Security: Lock Screen setup (PIN/Password)
- Sounds: Touch sounds, Haptic intensity
- AI: TelzonAI API key management
- Apps manager with package installer

🧠 Smart Systems
- Adaptive Performance — targets 60/90/120 FPS based on device capability, FPS monitor with automatic Normal Mode suggestion
- Normal Mode — one-tap battery saver that instantly reduces all animations
- GPU-first rendering — `will-change`, `contain`, `content-visibility`, transform/opacity-only animations, snap-blur filters for zero jank
- Haptics everywhere — contextual vibration patterns
- Liquid Glass UI — backdrop-filter glass plates across panels

☁️ Cloud & PWA
- Firebase-ready cloud sync (photos, videos, account)
- Installable PWA — add to home screen, standalone display, offline-ready
- All settings persist via storage (survives restarts)

---

🛠️ Tech Stack

- HTML5 — semantic structure, `viewport-fit=cover`, safe-area insets
- CSS3 — glassmorphism, `clip-path` hexagons, FLIP-style GPU animations, CSS variables, `env()` notches, media queries, `prefers-reduced-motion` support
- Vanilla JavaScript — zero dependencies, single-file architecture
- Web APIs — `getUserMedia` camera, MediaRecorder, Web Audio, SpeechRecognition/SpeechSynthesis, Vibration API, Battery API, localStorage, Canvas 2D

---

📲 Run It

```bash
# 1. Clone
git clone https://github.com/telzonmobile/telzonos.git
cd telzonos

# 2. Open index.html in any browser — that's it.
#    (or serve it)
npx serve .
```

Then on your phone: Add to Home Screen → TelzonOS installs as a fullscreen PWA. 📱

> 💡 Tip: for camera & microphone features, serve over `https` or `localhost`.

---

📁 Project Structure

```
telzonos/
├── index.html      # The entire OS (single file)
├── icon-192.png    # PWA icon
├── icon-512.png    # PWA icon (maskable)
└── README.md
```

---

🗺️ Roadmap

- Lock screen security (PIN/Password/App Lock)
- Control Center & Notification Center
- TStore + `.tpa` package installer
- TelzonAI voice assistant (Gemini)
- PWA installable
- Full cloud sync (Firebase)
- Multiplayer / share features
- Custom theme studio
- 100+ apps catalog

---

🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

⚠️ Disclaimer

TelzonOS is an independent, fan-made project. It is not affiliated with, endorsed by, or connected to Apple, Google, Android or any other company. All code and design are original works of the Telzon project.

---

📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

👨‍💻 Author

Daham Randunu — Chief Designer, Telzon™

⭐ Star this repo if you like it — it keeps the project alive!

"Think Your Own Way…"
