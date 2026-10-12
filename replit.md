# EstoquePro on Replit

## Stack
The imported project uses React with Create React App, Express, and SQLite.
Keep the existing frontend/backend structure and database.

## Run
- Requires Node.js 22 or newer (better-sqlite3 requirement).
- Install dependencies with `npm install` in the root. Its postinstall script
  installs the backend and frontend dependencies using their lockfiles.
  If installation skips that script, run `npm run postinstall` explicitly.
- Click Run to launch the `Start application` workflow, or run `npm start`
  in the project root.
- React listens on `0.0.0.0:5000`; Express listens internally on
  `127.0.0.1:3000` so only the frontend is exposed in the Replit preview.
- Browser requests use `/api`; the React development server proxies them to
  Express. Original backend routes remain available for local API clients.
- The launcher starts both services and stops both when either exits.
- No external services or additional secrets are needed.

## Data and checks
- SQLite data is stored in `backend/database/database.sqlite`.
  Preserve this file: it contains the imported data.
- Run `npm run build` from the root to check the frontend production build.
- Development host checking is disabled only by the development launcher so
  Replit's preview proxy can reach the app.
- This setup runs the development preview; publishing needs separate production
  serving and durable-storage configuration.
