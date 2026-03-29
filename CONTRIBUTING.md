# Contributing

Thanks for your interest in contributing to **Page Views API**. We're happy to have you here.

This project is open-source and built for developers. Whether you're fixing bugs, improving docs, or adding features – your contributions are welcome.

Before you start, please take a moment to review this guide.

---

## Getting Started

Follow these steps to set up the project locally.

---

### 1. Fork the repository

Click the **Fork** button on the top right of this page to create your own copy.

---

### 2. Clone your fork

```bash
git clone https://github.com/<your-username>/page-views-api.git
cd page-views-api
```

---

### 3. Create a new branch

```bash
git checkout -b feature/your-feature-name
```

Use meaningful names:

- `feature/add-script-tracking`
- `fix/rate-limit-bug`
- `docs/improve-readme`

---

### 4. Install dependencies

We use **bun** for package management.

```bash
bun install
```

---

### 5. Set up environment variables

Create a `.env.local` file in the root:

```env
UPSTASH_REDIS_REST_URL=your_upstash_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_token
```

You can get these from your Upstash dashboard.

---

### 6. Run the development server

```bash
bun dev
```

The project should now be running at:

```
http://localhost:3000
```

---

## Project Structure

```
app/
  api/
    v1/
      track/
      views/
  script/
lib/
  api/
    rate-limit.ts
    redis.ts
    tracking.ts
    utils.ts
    validation.ts
```

- **app/api/** → API routes
- **app/script/** → tracking script
- **lib/api/** → core logic (Redis, tracking, validation)

---

## Development Guidelines

- Use **TypeScript**
- Keep functions small and readable
- Follow existing code structure
- Avoid unnecessary dependencies
- Prefer clarity over cleverness

---

## Making Changes

### 1. Make your changes

- Add or update code
- Keep changes focused (avoid unrelated edits)

---

### 2. Test your changes

Before submitting:

- Verify API endpoints work correctly
- Check edge cases
- Ensure nothing breaks

---

### 3. Commit your changes

Follow **Conventional Commits**:

```bash
git commit -m "feat: add script-based tracking"
git commit -m "fix: handle missing site parameter"
git commit -m "docs: update usage section"
```

---

### 4. Push your branch

```bash
git push origin feature/your-feature-name
```

---

### 5. Open a Pull Request

- Provide a clear title
- Explain what and why
- Keep PRs small and focused

---

## Pull Request Guidelines

Please ensure your PR:

- Has a clear description
- Solves a specific problem
- Does not include unrelated changes
- Includes examples/screenshots if needed

---

## Reporting Issues

If you find a bug or have a suggestion:

1. Check existing issues
2. Create a new [issue](https://github.com/ratneshchipre/page-views-api/issues) with:
   - Clear title
   - Steps to reproduce
   - Expected vs actual behavior

---

## Security

If you discover a security issue:

- Do NOT open a public issue
- Contact privately (add your email here)

---

## Code of Conduct

Please be respectful and constructive.

> Be kind. Be helpful. Be respectful.

---

## Final Note

Every contribution matters – no matter how small.

Thanks for helping improve **Page Views API**!
