# FullStack-Java

A small full‑stack example: a Spring Boot backend (Maven) and a Vite + React frontend. This README explains the project layout, how to run both services locally on Windows (PowerShell), and quick troubleshooting steps.

## Repo layout

- `Backend-Application/` — Spring Boot backend (Maven wrapper included)
  - `pom.xml` — Maven project file
  - `mvnw`, `mvnw.cmd` — Maven wrapper scripts
  - `src/main/java/com/Sidharth/BackendApp/` — Java sources
    - `Controller/` — REST controllers (UserController.java)
    - `Model/` — JPA entities (User.java)
    - `Repository/` — Spring Data repositories (UserRepository.java)
    - `Exception/` — custom exceptions and advice
  - `src/main/resources/application.properties` — app configuration

- `Frontend-Application/Frontend/` — Vite + React frontend
  - `package.json` — frontend dependencies and scripts
  - `src/` — React source files
    - `Layout/` — UI layout components (Navbar)
    - `Pages/` — page components (Home)
    - `Users/` — Add/Edit/View user pages

- `HELP.md` — (project helper file, if present)

## What this project provides

- Backend: REST API for basic user CRUD (endpoints used by the frontend):
  - `POST  /addUser`        — create a new user
  - `GET   /getUser`        — list users
  - `GET   /getUser/{id}`   — get single user by id
  - `PUT   /updateUser/{id}`— update user by id
  - `DELETE /deleteUser/{id}` — delete user by id

- Frontend: React app (Vite) that calls the backend using axios and includes simple pages:
  - `Home` — lists users
  - `AddUser` — simple form to add a user
  - `EditUser` — edit form for a user
  - `ViewUser` — view details

> The frontend expects the backend at http://localhost:8080 and the Vite dev server runs at http://localhost:5173. The backend controller already includes CORS allowing `http://localhost:5173`.

## Prerequisites

- Java 17+ (or the version your `pom.xml` requires). If you don't have Java installed, install an SDK and make sure `java` is on your PATH.
- Node.js 18+ and npm (for the frontend) — or pnpm/yarn if you prefer (adjust commands accordingly).
- PowerShell (instructions below use PowerShell syntax).

## Running the backend (Spring Boot)

Open PowerShell and run:

```powershell
cd Java\Backend-Application
# Use the included Maven wrapper to build & run
.\mvnw spring-boot:run
```

Notes:
- If the app fails to start, inspect the console for the stack trace. Typical problems:
  - Port 8080 already in use — change `server.port` in `src/main/resources/application.properties` or stop the other service.
  - Database configuration missing — check `application.properties` (this project may use an in-memory DB or expect external DB credentials).

## Running the frontend (Vite + React)

Open a second PowerShell window and run:

```powershell
cd 'Frontend-Application\Frontend'
# Install deps if you haven't already
npm install
# Run the dev server
npm run dev
```

Open http://localhost:5173 in your browser.

## Quick dev workflow

- Start backend first (.\mvnw spring-boot:run). Confirm it listens on port 8080.
- Start frontend (npm run dev).
- Open the UI and test features (add, edit, view, delete users).
- If the frontend shows CORS or network errors, check backend console and browser DevTools (Network tab) for the exact request/response.

## Debugging tips

- Browser DevTools (Network tab): inspect the failing request, its `Request Payload`, and the response status/body.
- Backend logs (where you ran `mvnw`): look for exceptions and stack traces. Common Jackson errors indicate JSON mismatches.
- If the frontend reports `Uncaught ReferenceError: id is not defined`, the frontend route/link is missing the id (the app passes id via query string `?id=`). Edit links should include `?id={id}` or you can change routes to use `/edit-user/:id`.
- If PUT/POST returns 400, verify Content-Type is `application/json` and that the payload has the expected fields (see `User` model: `id`, `name`, `userName`, `email`).

## Tests

This project doesn't include automated tests by default. You can add unit/integration tests for the backend using Spring Boot Test and for the frontend using your preferred React testing library.

## Useful commands (Windows PowerShell)

- Run backend: `cd ...\Backend-Application; .\mvnw spring-boot:run`
- Build backend jar: `cd ...\Backend-Application; .\mvnw clean package`
- Run frontend: `cd ...\Frontend-Application\Frontend; npm install; npm run dev`
- Lint / format: use available linters (none provided by default in this repo)

## Next improvements (suggestions)

- Add a README inside `Backend-Application` and `Frontend-Application/Frontend` with service-specific details.
- Add environment variables support (e.g. `application-dev.properties`) and document expected DB connection info.
- Add simple integration tests for the backend REST API and CI workflow (GitHub Actions).
- Make frontend routes consistent: either use query strings (`?id=...`) everywhere or convert to path params (`/edit-user/:id`).

## Contact / support

If you run into issues, paste the browser network request details (headers/payload/response) and backend console output here and I can help debug the exact error.

---

If you'd like, I can also:
- Add a shorter README specifically inside `Frontend-Application/Frontend` and another inside `Backend-Application`.
- Create a sample `.env.example` or document exact Java version and Node version used.

Tell me which extras you want and I'll add them.
