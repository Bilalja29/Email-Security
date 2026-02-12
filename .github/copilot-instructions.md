# Copilot / AI Agent Instructions

Quick orientation
- This repo contains two parallel app implementations you may encounter:
  - **Next.js (TypeScript) app** in `app/` (App Router). The Next server provides the modern frontend, React components (`app/*` + `components/`) and API routes (`app/api/*`). Default dev port: 3000.
  - **Flask (Python) server** in `app.py` which serves Jinja templates (`templates/`) and contains sandbox-driving logic (`docker` usage). Default dev port: 5000.
  - The project ships a small Docker sandbox image (build with `Dockerfile.sandbox`) and a `shared_volume/` used to exchange files between host and sandbox.

How to run locally (dev)
- Frontend (Next):
  - Install: `pnpm install` (preferred) or `npm install`.
  - Start dev server: `npm run dev` (or `pnpm dev`). Site runs on http://localhost:3000 by default.
  - Key API routes live under `app/api/*`.
- Backend (Flask):
  - Create venv + install: `python -m venv .venv && .\.venv\Scripts\activate && pip install -r requirements.txt` (Windows syntax shown).
  - Start: `python app.py` (listen on port 5000, debug mode in `if __name__ == '__main__'`).
  - Docker sandbox: `docker build -t email-sandbox:1.0 -f Dockerfile.sandbox .` and ensure Docker daemon is running — the Flask endpoints run containers with network_mode='none' and mount `shared_volume/`.

Environment variables (most-used)
- Next.js (in `.env.local`):
  - `MASTER_KEY` — required to read/write encrypted IMAP configs (`data/imap-store.json`). See `lib/server-crypto.ts` for encrypt/decrypt.
  - `RESEND_API_KEY` or `SMTP_HOST`/`SMTP_USER`/`SMTP_PASS`/`SMTP_PORT`/`FROM_EMAIL` — used by `app/api/send-email/route.ts` (fallbacks to Ethereal for dev if unset).
- Flask / VirusTotal:
  - `VIRUSTOTAL_API_KEY` or `VT_API_KEY` — used by functions in `app.py` and `test_vt_hash.py` to query VirusTotal.
- Runtime notes: Node 18+ recommended for running the `scripts/*.js` test helpers (they use global fetch).

Persistence & data flows
- IMAP configs: stored by Next API under `data/imap-store.json` encrypted with `MASTER_KEY` (see `app/api/imap/route.ts` + `lib/server-crypto.ts`).
- Email fetching: Next uses `imapflow` + `mailparser` (`app/api/fetch-emails/route.ts`); Flask uses `imaplib` in `app.py`.
- Sandbox flow: Uploads are saved to `shared_volume/input/`; Flask runs `email-sandbox:1.0` with `shared_volume` mounted, executes file under `/sandbox_volume/input/` and collects `strace` logs (`/sandbox_volume/strace.log`).

Project conventions & patterns to follow
- Duplicate implementations: New features touching email/IMAP/sending may exist in both the Next.js API and the Flask server. Prefer updating Next.js API (`app/api/*`) as the canonical modern path, but be mindful of the Flask server which contains sandbox integration and helpful example flows.
- Secrets handling: Next.js encrypts IMAP stores with `MASTER_KEY`. Flask stores passwords in session (insecure for production) — keep this in mind when modifying authentication flows.
- Sandboxing: Container is run with resource limits (`mem_limit`, `cpu_quota`) and `network_mode='none'`. Tests and UI expect the sandbox to return structured `behaviors`/`verdict` objects.

Debugging & tests
- Helpful scripts: `npm run test:api`, `npm run test:imap`, `npm run test:fetch` (run the Node scripts in `scripts/`).
- VirusTotal smoke test: `python test_vt_hash.py` (set `VIRUSTOTAL_API_KEY` for real queries).
- Docker troubleshooting: inspect the container run by Flask and check `shared_volume` files and `strace.log` to understand sandbox behavior.

Files to inspect for more context (quick list)
- `app/` (Next app router + `app/api/*`) — canonical frontend and API implementations
- `components/` — React UI components used by Next app
- `app.py` — Flask demo server: IMAP, sandbox orchestration, VirusTotal usage, and routes
- `Dockerfile.sandbox`, `shared_volume/` — sandbox build + mounted data
- `lib/server-crypto.ts` — AES-GCM encryption logic used by Next API

When to ask for help
- If an API route exists only in Flask but you need it in Next, ask whether to port it to `app/api/*` or to keep the Flask demo for local-only workflows.
- If a required env var (e.g., `MASTER_KEY` or VT key) is missing, ask whether to use stubbed behavior or request test credentials.

If anything above is unclear or you want the instructions tuned to a particular workflow (e.g., only Next.js development, or CI-driven Docker sandboxing), tell me which area to expand and I will iterate. ✅
