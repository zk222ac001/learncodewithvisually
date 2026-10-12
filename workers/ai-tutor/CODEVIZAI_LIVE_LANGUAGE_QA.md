# CodeVizAI AI Tutor — real answer-quality verification

**Status: manual live evaluation not yet performed.** This is a testing worksheet, not evidence that the model passed. With the public backend disabled and private credentials removed, actual model requests should wait for an explicitly authorized, controlled test window.

## Consistent scoring

For each test, mark **PASS / FAIL / NOT TESTED** after personally examining the genuine Cloudflare Workers AI response, not a mock. Pass only if the explanation is factually correct, source code is valid for the chosen language, the chosen help mode and explanation level are respected, and the model does not pretend it executed code.

| Language | Mode and level | Safe example test question | Key facts to verify | Actual verdict |
|---|---|---|---|---|
| C | ask / beginner | What does `int x=3; printf("%d", x++);` print? | Prints 3; post-increment makes x equal 4 afterward | NOT TESTED |
| C++ | explain / intermediate | Explain why `std::vector<int> v{1,2}; v.push_back(3);` changes size | Size 2 → 3, indexing starts at zero; distinguish size from capacity | NOT TESTED |
| Python | debug / beginner | Why does `items=[1,2]; print(items[2])` fail and how do I fix it? | IndexError; valid indices 0,1; alternatives demonstrated | NOT TESTED |
| Java | review / intermediate | Review `String a = new String("hi"); if(a=="hi") System.out.println("same");` | `==` compares references; prefer `.equals` for content | NOT TESTED |
| JavaScript | hint / beginner | Give one hint for a `for(let i=0;i<3;i++)` loop that prints 0,1,2 | One scaffolded hint rather than immediately giving full solution | NOT TESTED |
| C# | debug / intermediate | Why does `int[] a={1,2}; Console.WriteLine(a[2]);` fail? | IndexOutOfRangeException; legal indices 0 and 1 | NOT TESTED |
| Rust (extra) | ask / beginner | How is `let mut x=1;` different from `let x=1;`? | Mutability binding semantics and a concise example | NOT TESTED |

## Additional checks

- [ ] Request a Danish answer by setting the website language to Danish. Confirm it follows the selected response language.
- [ ] Verify Beginner versus Advanced responses genuinely differ in detail and accuracy.
- [ ] Try an irrelevant/non-programming question; the Tutor should redirect to programming.
- [ ] Submit code containing a **dummy** credential-like string (never a real key); check that it warns not to share secrets.
- [ ] Confirm empty/unavailable model responses produce a safe error, not fake execution output.
- [ ] Confirm code blocks and **Copy code** display correctly on desktop and narrow mobile widths.
- [ ] Confirm actual Cloudflare 25-reservation shared daily cap and 5-per-60s-per-IP limit without disrupting visitors.
- [ ] Review logged usage and actual account plan after controlled tests.

## Report template

Record for each manual test: UTC timestamp, selected language, mode, explanation level, redacted question, redacted model response, observed error/incorrect claim, PASS/FAIL, and reviewer notes. Never save real credentials or sensitive student material in this repository.

## Release implications

All untested rows remain release gates. Existing automated tests validate routing, inputs, and mocked model invocation; they **do not** establish live answer quality. Final privacy controller disclosures and provider retention/processing review are also still pending. Do not activate public AI solely because the software tests pass.
