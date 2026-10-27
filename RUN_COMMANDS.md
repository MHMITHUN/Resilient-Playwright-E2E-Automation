# ⚡ Quick Run Commands

## First Time Setup
```bash
npm install
npx playwright install
```

## Running Tests

### 1. Run Complete Suite (Chromium)
```bash
npm run test:chromium
```

### 2. Run Headed (Visible Browser)
```bash
npx playwright test --headed
```

### 3. Run Interactive UI Runner
```bash
npm run test:ui
```

### 4. Run Cross-Browser Suites
```bash
# Firefox
npm run test:firefox

# WebKit (Safari engine)
npm run test:webkit
```

### 5. Run by Module
```bash
# Full End-to-End User Journey (Register -> Checkout -> Pay -> Teardown)
npm run test:e2e

# Authentication Scenarios
npm run test:auth

# Products & Cart Scenarios
npm run test:products
```

## View Reports
```bash
npm run report
```
