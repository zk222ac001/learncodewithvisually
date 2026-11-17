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

## OOP explanations and C++ workshop

The OOP lab pages now add original teaching content before the existing model:
class/object/constructor foundations, the four pillars, purpose, connections to
the existing examples, common mistakes, and four question/answer checks. Pillar
navigation opens the matching lab while retaining both language choices.

`oop-guide-data.js` contains all explanations in ten locales. `oop-guide.js` and
`oop-guide.css` render the content and accessible relationship diagrams.
`oop-workshop.js` contains eight independent C++17 examples: single, multiple,
multilevel and hierarchical inheritance; hybrid/diamond with a virtual base;
access control; overloading; and overriding through a base reference. The
workshop is explicitly labelled C++; it does not replace the main lab’s selected
programming language. Its selected concept and step survive locale changes.

The workshop presents guided expressions and modelled output, not arbitrary
code execution. Download each example to compile and run it. Diagram arrows
point from derived to base; the overloading example has no inheritance arrows.
The diamond example has one virtual base subobject, and the polymorphic base
has a virtual destructor. All examples initialize their data.

The requested Medium article is linked as further reading; its text and code
are not reproduced. Explanations and examples were written for this course.
The C++ working draft is linked for virtual functions, multiple inheritance
and access control.

Validate with `node --test tests/oop-guide.test.cjs` and
`npx playwright test tests/browser/oop-guide.spec.cjs`.
The OOP workflow compiles every C++ example and verifies stdout, tests all ten
locales and six main-lab languages, and uploads desktop/mobile/RTL screenshots.

### Dynamic OOP workshop pilot

The OOP workshop adds explicit Play/Pause controls and 0.5×/1×/2× playback speeds. Playback stops when a workshop closes, the topic/language/scenario changes, the page becomes hidden, or a student opens a prediction challenge. Manual step/reset controls also pause playback. No animation starts automatically. System reduced-motion preferences disable decorative animation.

Blue identifies active classes, purple the related source line, and green output, with text labels and active-state text alternatives. The single-inheritance example accepts an integer object ID from 0 through 999. Applying it resets the trace and updates the displayed and downloaded C++ source plus expected output. This remains a guided model of the shown example, not an arbitrary C++ interpreter. Prediction challenges accept any class participating in the next modeled step; they give feedback without advancing.
