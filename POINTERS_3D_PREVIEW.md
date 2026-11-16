# Test the Pointers & Memory 3D pilot

This pilot lives on `feature/pointers-3d-pilot`. It must be reviewed and tested before merging into `main`. GitHub Pages currently serves `main`, so the production URL will not show this branch yet.

## Run locally

With Git and Python installed:

```sh
git clone --branch feature/pointers-3d-pilot https://github.com/zk222ac001/learncodewithvisually.git
cd learncodewithvisually
python -m http.server 8000 --bind 127.0.0.1
```

On Windows, `py -m http.server 8000 --bind 127.0.0.1` also works. On Linux/macOS use `python3` if needed.

Visit http://localhost:8000/pointers-3d.html . Alternatively, select this branch on GitHub, use **Code → Download ZIP**, extract it, and run the server command inside the extracted folder. No npm installation is needed just to preview the site.

## What to check

1. Set values to 5, 12 and 42, then Apply & restart. Next should update the memory value and highlighted line together. The final output should be `value = 42`.
2. At the function call, both pointer labels should designate the same integer. Previous must restore the earlier state. At program exit the object should show ended lifetime.
3. Select allocation and apply. Newly allocated integers are uninitialized, then become 10, 20 and 30. Output is 60. After free, storage is ended and the pointer is marked dangling; after clearing, there is no active target.
4. Enable forced allocation failure and apply. No memory objects should appear, and output should be `Allocation failed`.
5. Try Play/Pause, speed, Restart, rotation, tilt, zoom and Flat view. Reduced-motion mode starts flat. Playback pauses when the page is hidden.
6. Test keyboard controls and a narrow/mobile window. The expandable text memory state provides the same information without depending on the 3D scene.
7. Copy/download the source and compile it as C. The modelled successful-path output should match actual execution.
8. Open the full C pointer lesson and follow its new 3D lab link. Existing examples and quizzes should still work.

## Scope and implementation

The lab is English/C only, with guided examples rather than an arbitrary-code debugger. It reuses `pointers-core.js` as the single source for code, memory state, explanation and output. Bounded integer inputs (-999 to 999) keep code generation simple and safe. Allocation failure is deliberately modelled by substituting NULL.

The scene uses browser-native CSS 3D transforms, with rotation, tilt and zoom controls. No Three.js, GPU/WebGL requirement, external runtime scripts, AI service, accounts or backend are added. No data leaves the page automatically. The explicit OneCompiler link opens the provider separately; code must be pasted manually. This is an intentional lightweight pilot; more complex graphs or robotics scenes may warrant Three.js later.

The existing pointer trace now ends local-object lifetimes on program exit instead of leaving those objects marked live.

## Automated verification

```sh
npm ci
npm test
npx playwright install chromium
npx playwright test tests/browser/pointers-3d.spec.cjs tests/browser/pointers.spec.cjs
```

The focused checks cover custom values against compiled C when GCC is available, lifetime, allocation failure, playback, mobile overflow, reduced motion, no automatic external requests, and discovery from the existing lesson. The PR also triggers the repository's normal regression workflow.
