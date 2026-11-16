# Test the 3D Memory & References Lab

The multilingual update is on `feature/multilingual-memory-lab`. Review it before merging into `main`; the production site serves `main`.

## Run locally

```sh
git clone --branch feature/multilingual-memory-lab https://github.com/zk222ac001/learncodewithvisually.git
cd learncodewithvisually
python -m http.server 8000 --bind 127.0.0.1
```

On Windows, `py -m http.server 8000 --bind 127.0.0.1` also works. On Linux/macOS use `python3` if needed. Alternatively download this branch as a ZIP, extract it and run the server in that folder. No npm installation is needed to preview the site.

Open http://localhost:8000/pointers-3d.html?lang=da&code=python . The existing `pointers-3d.html` URL remains compatible; without parameters it starts in English/C.

## Language support

Programming languages: C, C++, Python, Java, JavaScript and C#.

Website languages: English, Danish, Spanish, French, German, Portuguese, Arabic, Urdu, Hindi and Simplified Chinese. Translations cover the lab's headings, controls, step explanations, model notes, validation and accessibility labels. Arabic and Urdu use RTL prose; code, identifiers and program output remain LTR. These additions translate the lab and its course banner, not the entire existing detailed pointer tutorial.

The translated blue course banner appears for every programming language and carries both selections to the lab. The return link preserves them. Changing website language pauses playback and retains the current step. Changing programming language starts its first supported scenario.

## Examples to review

- **C:** pointer aliasing/function arguments, plus allocation success/failure. Try 5, 12, 42; the final output is `value = 42`. Allocation outputs 60 or `Allocation failed` on the forced-failure path. Uninitialized storage, dangling pointers and ended lifetimes are distinguished.
- **C++:** reference aliases/function arguments, plus `unique_ptr` ownership with explicit `reset()`. A reference cannot be reseated; resetting unique_ptr destroys its owned integer immediately.
- **Python, Java and JavaScript:** two names initially share mutable object A. Mutation changes A; reassignment makes alias refer to a distinct B. With defaults, output is `20 30`.
- **C#:** shared class objects plus replacement of a caller's alias variable through a `ref` parameter. The other variable retains its reference to A.

Managed-language diagrams retain the final reference snapshot; they make no claim about garbage-collection timing. C/C++ lifetime endings are shown where defined by the examples. Program output stays literal so it can be compared with a compiler/runtime.

Try Previous/Next, Play/Pause, speed, Restart, rotation, tilt, zoom and Flat view. Test keyboard controls and narrow screens, especially Arabic and Urdu. Reduced-motion mode starts flat; playback pauses when the page is hidden. The text memory state describes the same relationships without relying on the visual scene.

## Implementation and limitations

`memory-lab-core.js` produces language-specific source and immutable trace snapshots. It reuses the existing C pointer model. `memory-lab-i18n.js` contains the locale dictionaries. Values are bounded integers from -999 to 999. These are guided models, not an interpreter/debugger for arbitrary edited code. Allocation failure is demonstrated by deliberately substituting NULL.

The scene uses browser-native CSS 3D transforms with no external runtime dependencies, AI service, accounts or backend. No data leaves the page automatically. The explicit OneCompiler link opens the provider separately and requires manual pasting. Downloads use the appropriate filenames, including `Main.java` and `Program.cs`.

## Automated verification

```sh
npm ci
node --test tests/memory-lab.test.cjs tests/pointers.test.cjs
npx playwright install chromium
npx playwright test tests/browser/pointers-3d.spec.cjs tests/browser/memory-lab-locales.spec.cjs
```

The `Multilingual memory lab` PR workflow requires all six runtimes, compares generated program output with the model, tests all 60 locale/language combinations and every supported scenario, checks selection-preserving course navigation, and uploads English, Danish, Arabic and Urdu screenshots. The normal repository regression workflow also runs.
