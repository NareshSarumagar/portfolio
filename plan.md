# Naresh Saru Magar Portfolio — Approved Plan

## Implementation
- Build a single-page React + Vite portfolio served on the configured Webdev port.
- Use a responsive layout with semantic sections: hero, skills, workflow/about, and contact.
- Use the supplied portrait as the real-person image, with an animated ring/glow treatment rather than generating a lookalike.
- Keep contact actions as direct, safe browser links: WhatsApp, tel, and mailto.
- Serve `/manus-routes.json` with the single `/` route.

## Design direction
- **Design movement:** Alpine futurism meets dark glassmorphism — a calm, high-altitude visual mood with luminous technical details.
- **Core principles:** cinematic depth, restrained transparency, readable white type, and motion that rewards scrolling without distracting from the person.
- **Color philosophy:** deep midnight blue-black foundations make the supplied mountain portrait feel native; ice-blue and mint accents communicate clarity, reliability, and technical precision.
- **Layout paradigm:** asymmetric editorial composition with a large hero statement, offset portrait card, and horizontally framed skill bands rather than a generic centered grid.
- **Signature elements:** aurora gradient blobs, a thin orbital ring around the portrait, and compact monospace section labels.
- **Interaction philosophy:** links feel like instruments: clear, direct, and tactile with subtle lift, glow, and arrow movement on hover/focus.
- **Animation:** slow ambient background drift, portrait orbit pulse, staggered reveal on load, and gentle card hover translation; honor `prefers-reduced-motion`.
- **Typography system:** Space Grotesk for display and UI text; JetBrains Mono for metadata, labels, and skill tags.
- **Brand essence:** A full-stack builder who brings mountain calm and systems thinking to dependable digital products. Personality: grounded, curious, precise.
- **Brand voice:** concise, confident, human. Example lines: “Building clear systems for complex ideas.” and “Let’s turn the next useful thing into something real.”
- **Wordmark & logo:** a compact `NSM/` monogram in a rounded square, paired with a thin route-line accent.
- **Signature brand color:** glacier mint `#8FF7D5`, used sparingly for interactive emphasis.

## Project structure
- `index.html`: Vite HTML shell and metadata.
- `src/main.jsx`: React bootstrap.
- `src/App.jsx`: portfolio sections and content.
- `src/styles.css`: responsive visual system, glassmorphism, animations, and accessibility states.
- `public/assets/naresh-magar.png`: supplied portrait.
- `public/manus-routes.json`: page route manifest.
