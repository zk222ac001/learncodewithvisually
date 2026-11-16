# Course visual labs

`visual-labs.html?lang=da&code=cpp&topic=functions-8` opens a shareable lab.
Blue entry buttons appear on the homepage, assignment-bearing lesson sections,
formatting references, and all seven data-structure chapters. Return links retain
both language selections and the originating topic/chapter.

Coverage: 84 assignment-bearing sections, seven data-structure chapters, and two
formatting references (93 entries). Each offers C, C++, Python, Java, JavaScript
and C# source with UI explanations in English, Danish, Spanish, French, German,
Portuguese, Arabic, Urdu, Hindi and Chinese.

## What the model means

The 3D scenes are **guided conceptual milestones**, not an interpreter or an
instruction-accurate debugger. Examples have fixed inputs and selected states.
The highlighted source is related to the current concept, not necessarily the
next instruction executed. Final snapshots remain visible for review; they do
not claim to show garbage collection timing or actual memory addresses.
Students predict output, reveal the complete program output, then download or
copy the runnable source to experiment locally or in OneCompiler. Source names,
comments and literal program output retain the original example language.

Layouts distinguish arrays/values, call stacks, connected objects, trees and
graphs. Flat view, reduced-motion defaults and a text state table are available.
C examples explain analogous struct/composition/status-code techniques where C
has no classes or exceptions. Python/JavaScript access-control differences are
also stated explicitly.

## Maintenance and validation

- `course-labs-core.js`: model states for each topic and programming language.
- `course-labs-i18n.js`: UI, topic suffixes and conceptual step explanations.
- `course-labs-ui.js`: catalogue, renderer, transport and source/output tools.
- `course-labs-links.js`: lightweight lesson entry points; does not load examples.
- `course-labs-content.js`: generated data. Rebuild with
  `node scripts/build-course-lab-content.cjs` after changing canonical examples.
  The 84 assignment programs load directly from `assignment-solutions.js`.
- `tests/fixtures/course-lab-extra-outputs.json`: native stdout fixtures for the
  seven data-structure examples; formatting fixtures use canonical course data.

Run `node --test tests/course-labs.test.cjs tests/course-labs-native.test.cjs tests/assignment-solutions.test.cjs`
and `npx playwright test tests/browser/course-labs.spec.cjs`.
The dedicated workflow installs all six runtimes, requires their availability,
checks every source against its expected output, validates all 5,580 localized
model combinations, completes all 558 models in a browser, and uploads desktop
and RTL/mobile screenshots. Random-number output is validated as a range rather
than a fabricated deterministic result.
