# Privacy and provider review — 5 November 2026

Status: **PR #48 merged; controller name/email confirmed; provider and legal-basis review remains open**.

Owner update, 5 November 2026: Zuhair Khan confirmed his legal name and authorized keeping zk222ac@gmail.com as the public contact address. The owner reports all tests passed. GitHub confirms PR #48 was merged as `12b28b367be10700d2421b622dbbd7fc51f5bcfd`. The owner report does not independently establish deployed cookie/network behavior or private provider settings.
Reviewed main commit: `17c7102dc14edb9411a81bd04e3918b40663795c`.
This is a technical and documentation review, not a compliance certification.

## Confirmations received on 6 November 2026

- Production screenshots show optional Worker Logs, Traces and Issues switched off and no telemetry export destinations configured.
- The visible bindings are Workers AI `AI`, Durable Object `AI_BUDGET` and rate limiter `RATE_LIMITER`. The Turnstile secret is marked encrypted; no secret value was supplied.
- These screenshots confirm the displayed configuration only, not all account integrations, provider-side retention, contracts or data locations.
- The owner adopted a manual monthly correspondence review: delete general enquiries/feedback within six months after resolution; retain a minimal privacy-request record for twelve months after closure, then review and delete unless still needed; delete spam and unnecessary sensitive attachments promptly. Keep information needed for ongoing disputes separately with a documented reason.
- This approval establishes the intended practice. No mailbox messages were inspected, moved or deleted, and no automatic deletion rule or scheduled reminder was created.

## Changes prepared

- Replace the OneCompiler embed and automatic code/input transfer with a local, text-only preview, explicit clipboard action and external link. Opening the preview makes no provider request. The external link has no code/input in its URL and uses `noopener noreferrer`. Users can still download and run examples locally.
- Start the separate loop tutor's Turnstile script only after the visitor presses a verification button. The general tutor already waits until its dialog is opened. These are user-action boundaries, not a certified consent management platform or a legal-basis determination.
- Clear conversation now also removes draft question/code. Clearing is disabled during an in-flight request so a late response cannot silently restore history after clearing. Closing the dialog still retains the conversation in page memory.
- Expand privacy disclosures: actual local-storage keys, no automatic local expiry, hosting, AI payload, provider links, outcome summaries, rights, complaints, email/public issue handling and international-processing uncertainty.
- Keep AdSense verification only; do not add advertising, analytics or a consent banner that falsely implies compliance.

## Data flows and provider findings

| Service | Trigger and data | Findings and outstanding checks |
|---|---|---|
| GitHub Pages / Cloudflare delivery | Page requests: IP address, URL and connection metadata | Live homepage response headers include GitHub/Cloudflare delivery indicators. Account log retention, analytics features, contracts and regions cannot be determined from source or HTTP headers. |
| Cloudflare Turnstile | General tutor opening, or explicit loop-verification click after this change: network/browser signals and verification token; backend verifies token with connecting IP | Turnstile's policy describes security processing. Verify actual widget mode, optional pre-clearance, security settings and notice requirements. Do not assume all Cloudflare processing is covered by one retention statement. |
| Cloudflare Workers AI | Explicit question submission: question, optional code, language/level/help type and up to six shortened recent messages; separate loop request includes step | Standard inference is covered by Cloudflare's stated no-training / limited-to-request processing commitment, subject to exceptions. Current code calls the AI binding; it does not configure AI Gateway. Confirm no account-level logging/caching or stateful features alter retention. |
| Cloudflare rate limiter / Durable Object | IP-based rate limiting; shared aggregate daily reservations and outcomes | No questions, code, answers or IPs are deliberately written by application code to its database. Daily history older than the seven-day window is pruned on the next successful reservation, not automatically after seven elapsed days. Inactive storage can remain longer. |
| OneCompiler | After this change: visitor opens external site, then optionally pastes code/input | Provider policy describes logs, cookies and advertising. Removed iframe integration avoids automatically loading those services inside lessons. Do not equate external navigation with legally valid consent to every provider activity. Provider retention and child-related suitability remain to be assessed for recommended classroom use. |
| Contact email / GitHub issues | Visitor sends a message or opens/posts an issue | Email contains sender/message data; issues are public. Email-retention policy confirmed on 6 November (see above); rights handling remains to be verified. Discourage private student data in either route. |
| Google AdSense | Current HTML ownership meta tag and ads.txt only | No advertising loader found in reviewed HTML. Configure and test required consent and exclusions before future ad serving. Google-certified CMP is required for personalized ads in EEA/UK/Switzerland; certification alone is not GDPR compliance. |

## Live observations and limits

- `curl` GET retrieved homepage and privacy page successfully on 5 November 2026. The live privacy notice still contains the incomplete-operator disclosures. This observation predates the merge of PR #48; deployment of subsequent changes must be checked separately.
- Read-only Worker `/health` returned `enabled:true`, `ready:true`, and the general-programming capability. No real question, private data or paid inference request was submitted during this review.
- A Python HTTP client received 403 on eight attempted URLs; those responses are not evidence that the pages are broken for users. The successful curl fetches demonstrate the difference.
- Chromium could not start in this environment because socket creation was denied. No claim is made about live browser cookies, consent dialogs, third-party redirects or network behavior across regions.
- Source review covered current files, not all historical commits, all branches, hosting secrets, account audit logs or provider configurations.

## Required owner information before finalizing the notice

1. **Confirmed:** individual controller **Zuhair Khan**, public email **zk222ac@gmail.com** (owner confirmation, 5 November 2026). Do not post identity documents, private home-address evidence, account tokens or contracts containing secrets in this public repository.
2. Confirm the service/accounts in use: GitHub Pages, Cloudflare proxy/Workers/Workers AI/Turnstile, email, any analytics, AI Gateway, request logging, log export or other integrations. Record only non-sensitive configuration conclusions here.
3. Optional Worker logging is confirmed off and the contact-email retention policy is adopted. Confirm remaining provider-level retention/access/deletion settings for hosting/security systems, applicable provider roles/agreements, processing locations and transfer safeguards. Public policy links do not prove an account's contractual position.
4. Select and document a supported legal basis for each processing purpose. For example, service security may be assessed under legitimate interests, but that requires the operator's necessity/balancing assessment; do not automatically claim that basis. Assess browser storage separately, including which functions are strictly necessary for a requested service and which require consent.
5. Confirm intended audience and safeguards for younger learners, school use and submissions. If relying on consent for a child-facing service, assess applicable age/parental requirements. A warning not to enter personal information does not remove processing responsibilities.
6. Correspondence retention policy confirmed on 6 November. Implement the monthly manual review and establish a usable privacy-request procedure; complete remaining disclosures with verified conclusions.

The updated public page deliberately preserves explicit missing-information statements. Do not represent it as a finalized GDPR notice or treat the merge as completion of the remaining owner review.

## Sources reviewed

- [European Commission: information for individuals](https://commission.europa.eu/law/law-topic/data-protection/information-individuals_en)
- [Datatilsynet: cookies and similar technologies](https://www.datatilsynet.dk/regler-og-vejledning/cookies-og-lignende-teknologier)
- [Datatilsynet: complaints](https://www.datatilsynet.dk/borger/klage/saadan-klager-du)
- [Workers AI data usage](https://developers.cloudflare.com/workers-ai/platform/data-usage/)
- [Turnstile Privacy Addendum](https://www.cloudflare.com/turnstile-privacy-policy/)
- [Cloudflare DPA](https://www.cloudflare.com/cloudflare-customer-dpa/)
- [GitHub privacy statement](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement)
- [OneCompiler privacy policy](https://onecompiler.com/privacy-policy)
- [Google CMP requirements](https://support.google.com/adsense/answer/13554116)
