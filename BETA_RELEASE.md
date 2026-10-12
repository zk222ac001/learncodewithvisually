# LearnCodeVisually — Public Beta 1 (12 October 2026)

Public site: https://learncodevisually.com/
Source: https://github.com/zk222ac001/learncodewithvisually

## What learners can use
- Interactive programming tutorials and visual step-through models
- C, C++, Python, Java, JavaScript and C# examples
- Ten interface languages, including right-to-left Arabic and Urdu
- Practice exercises, quizzes and browser-local learning progress
- On-demand OneCompiler embedded editor (external provider; requires internet)

## Known limitations
- Visual traces are pedagogical simulations, not arbitrary-language interpreters.
- Embedded editor availability and code execution depend on OneCompiler.
- Exercise checking is self-guided, not automatic server-side grading.
- AI Tutor is disabled for the public beta pending additional approval, verification and data handling review.
- AdSense ownership verification is present, but ad scripts are intentionally not loaded; advertising and consent setup remain separate.
- Browser-local progress is not synced across devices and can be cleared in browser settings.
- Website legal/privacy disclosures are still being reviewed for any future advertising, paid or AI service.

## Release guardrails
- Preserve the Google AdSense verification metadata and ads.txt.
- Preserve CNAME and canonical sitemap/robots URLs.
- Keep interactive lessons accessible to learners without creating an account.
- Keep the AI Tutor publicly disabled; no secret keys in client-side files.
- Before any public AI or ad activation, finish security, legal and consent validation.

## Checking the release
The CI workflow `SEO and Course Regression Checks` runs `npm test`, Worker tests, and Chromium browser tests for pushes to main and pull requests. The GitHub Pages build/deployment workflow must also succeed after merging the beta.

```sh
npm ci
npm test
npx playwright install chromium
npm run test:browser
```

## Feedback
Send reports to https://learncodevisually.com/contact.html or https://github.com/zk222ac001/learncodewithvisually/issues/new. GitHub issues are public; never include personal student data or passwords.

## Release focus
This beta adds a clearly visible site-wide release notice on the main learning page, updates the feedback issue link after the repository rename, and preserves all current learning functionality. No new backend services, advertising scripts, DNS or monetization changes are included.
