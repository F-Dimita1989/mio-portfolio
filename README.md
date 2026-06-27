# Portfolio - Filippo Dimita

Portfolio personale **mobile-first** in React e TypeScript.
Presenta progetti, competenze, percorso formativo e lavorativo, con design minimalista tech e animazioni leggere.

## Panoramica

Sito statico a singola pagina per recruiter, aziende e collaboratori.
Include intro animata, sezioni scrollabili, form contatti protetto e link a GitHub, LinkedIn e CV.

- **Autore:** Filippo Dimita - Web Developer
- **Sede:** Santeramo in Colle, provincia di Bari

## Funzionalità

- Hero con presentazione, stack e call-to-action
- Progetti con card, tag, stato e link (demo, repo, sito)
- Competenze organizzate per categoria
- Studi e lavoro con timeline (formazione + esperienze)
- Chi sono con bio, interessi e note professionali
- Contatti con form AJAX e link rapidi
- Intro screen alla prima visita (rispetta `prefers-reduced-motion`)
- Dot grid animata con interazione mouse/touch
- Animazioni scroll con `IntersectionObserver`
- Security headers per deploy su Vercel e Netlify

## Stack tecnologico

| Area | Tecnologie |
| --- | --- |
| Frontend | React 19, TypeScript |
| Build | Vite 8 |
| Styling | Tailwind CSS 4 |
| Utilità | clsx, tailwind-merge |
| Form | [FormSubmit](https://formsubmit.co) (AJAX) |
| Font | Inter, JetBrains Mono |

## Struttura del progetto

```text
mio-portfolio/
|-- public/          # Asset statici (CV, favicon, banner, _headers)
|-- src/
|   |-- components/  # UI: Hero, Projects, Skills, Contact, Intro...
|   |-- data/        # Contenuti editabili
|   |-- hooks/       # useInView, useIntroScreen
|   |-- lib/         # Utilità (cn, sicurezza form)
|   |-- styles/      # global.css, intro.css, toaster.css + tema Tailwind
|   |-- App.tsx
|   `-- main.tsx
|-- vercel.json
|-- .env.example
`-- package.json
```

### Dove modificare i contenuti

| File | Contenuto |
| --- | --- |
| `src/data/profile.ts` | Nome, ruolo, bio, about, interessi |
| `src/data/projects.ts` | Progetti e link |
| `src/data/skills.ts` | Competenze per categoria |
| `src/data/education.ts` | Formazione ed esperienze |
| `src/data/contacts.ts` | Link contatti |
| `src/data/contactConfig.ts` | Email e endpoint FormSubmit |
| `src/data/routes.ts` | Route, hash e voci del menu |

## Avvio in locale

### Requisiti

- Node.js 20+
- npm

### Installazione

```bash
git clone https://github.com/F-Dimita1989/mio-portfolio.git
cd mio-portfolio
npm install
npm run dev
```

Apri `http://localhost:5173`.

### Script disponibili

| Comando | Descrizione |
| --- | --- |
| `npm run dev` | Server di sviluppo |
| `npm run build` | Build produzione in `dist/` |
| `npm run preview` | Anteprima build |
| `npm run lint` | ESLint |
| `npm run test` | Test unitari (Vitest) |
| `npm run test:watch` | Test in modalità watch |

## Form contatti

Il form usa **FormSubmit** senza backend proprio.

### Prima attivazione

1. Invia un messaggio di prova dal sito.
2. Apri l'email di conferma FormSubmit.
3. Clicca il link di attivazione.

Dopo la conferma i messaggi arrivano su `f.dimita1989@gmail.com`.

### Protezioni integrate

- Honeypot (`_honey`)
- reCAPTCHA FormSubmit
- Blacklist spam
- Validazione email e limiti lunghezza campi
- Cooldown 60 secondi tra invii

### Email invisibile (consigliato in produzione)

Dopo l'attivazione FormSubmit, usa il token "email invisibile" per non esporre l'indirizzo nell'endpoint del bundle.

**Locale:**

```bash
cp .env.example .env
```

```env
VITE_FORMSUBMIT_TOKEN=il-tuo-token-formsubmit
```

**Vercel:** Settings → Environment Variables → aggiungi `VITE_FORMSUBMIT_TOKEN` per Production (e Preview se serve), poi rideploy.

## Deploy

| Piattaforma | Build command | Output |
| --- | --- | --- |
| Vercel | `npm run build` | `dist` |
| Netlify | `npm run build` | `dist` |

### Checklist post-deploy

- [ ] Form contatti funzionante
- [ ] Link GitHub, LinkedIn e CV
- [ ] Banner e favicon visibili
- [ ] Test su mobile

## Sicurezza

- Nessuna credenziale SMTP nel frontend
- Segreti solo in `.env` (escluso da git)
- Link esterni con `rel="noopener noreferrer"`
- Validazione input lato client
- Security headers completi su tutte le route (Vercel)

## Accessibilità e UX

- Navigazione da tastiera e focus visibile
- Etichette ARIA su sezioni e form
- Target touch adeguati su mobile
- Supporto `prefers-reduced-motion`
- Layout responsive

## Licenza

Progetto personale - Filippo Dimita.

- Email: f.dimita1989@gmail.com
- GitHub: [@F-Dimita1989](https://github.com/F-Dimita1989)
