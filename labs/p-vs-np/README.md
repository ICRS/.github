# P vs NP — Inside the Computation (V1)

A 30.00-second vertical animation (1080 × 1920, 30 fps) that explains the intuition behind
P vs NP by putting the viewer inside a Boolean satisfiability checker.

The formula is fixed:

```
F = (A ∨ B ∨ C) ∧ (¬A ∨ B ∨ ¬C) ∧ (A ∨ ¬B ∨ ¬C)
```

The candidate handed to the checker is `A = B = C = 1`. Five of the eight assignments satisfy
`F` (`001`, `010`, `100`, `110`, `111`); `000` fails Rule 1, `011` fails Rule 3, `101` fails
Rule 2. Every lamp, port value and verdict on screen is produced by the Boolean evaluator in
`index.html` (`CLAUSES`, `litValue`, `clauseValue`, `formulaValue`, `firstFailing`), so the
picture cannot drift away from the logic.

## Files

| File | What it is |
| --- | --- |
| `index.html` | The whole piece: logic, 2.5D engine, timeline, player and the three browser modes. Self-contained, no build step. |
| `render-mp4.mjs` | Deterministic MP4 renderer. Steps the timeline frame by frame and pipes the frames to ffmpeg. |
| `p-vs-np-30s.mp4` | The rendered film (default output path of the renderer). |
| `NARRATION.md` | Timed narration script and the on-screen caption schedule. |
| `MATH_NOTES.md` | The mathematical guardrails, including the full truth table for `F`. |

## Running it

Open `index.html` in a browser. That is the whole procedure.

```
# macOS
open index.html
# Linux
xdg-open index.html
```

No server, no install, no build, no network. The file loads over `file://` because it has no
external dependencies of any kind: no libraries, no CDN, no webfonts, no `fetch`, no ES module
imports. Typography uses the system sans and system monospace stacks. The film starts playing
on load and loops back to `t = 0` when it reaches 30.00 s.

## The three modes

The tab strip at the top switches modes. Switching modes resets that mode's state, so each one
always opens from a known starting point.

| Mode | What it is for | Opens at |
| --- | --- | --- |
| **Film** | The 30.00 s piece itself, with transport controls and a scrub bar. This is what the MP4 contains. | `t = 0`, playing |
| **Inspect** | A frozen checker you drive by hand. Toggle A, B and C and watch the same evaluator light the same ports, rules and verdict. Use it to confirm that nothing on screen is hard-coded, and to walk through any of the eight assignments. | `A=1 B=1 C=1`, paused |
| **Scaling** | The candidate space on its own, with a variables slider from 1 to 50. Use it to show growth without implying a solver benchmark — the panel says so in as many words. | `n = 3`, paused |

Inspect and Scaling exist only in the browser. The renderer hides them, so the MP4 is the Film
mode alone.

## Controls

| Control | Mode | Behaviour |
| --- | --- | --- |
| Play / Pause button | Film | Toggles playback; the `aria-label` and the glyph swap between Pause and Play. |
| Replay button | Film | Seeks to `t = 0` and redraws. Does not change the play state. |
| Scrub bar | Film | Range input, 0–3000 over the 30.00 s duration, i.e. 10 ms per step. Dragging seeks and redraws immediately. |
| Timecode readout | Film | `current / 30.00`, two decimal places, tabular figures. |
| `Space` | Film | Toggles play/pause. Ignored while the focus is inside an `<input>`, so the scrub bar and the variables slider keep their own key handling. |
| A / B / C bit tiles | Inspect | Click a tile to flip that variable. The rule rows, the per-literal values and the verdict recompute from the evaluator. |
| Variables slider | Scaling | 1 to 50. Updates `2^n` (exact, via `BigInt`), the bar, and the "one complete check" line. |

### Console harness

`index.html` exposes `window.__pvsnp` for scripting and debugging: `renderAt`, `stateAt`,
`DURATION`, `CLAUSES`, `litValue`, `litValues`, `clauseValue`, `formulaValue`, `firstFailing`,
`idxToAsg`, `asgToStr`, `countAssignments`, `setMode`, `seek(t)`, `pause()`,
`setAssignment([a,b,c])` and `setN(n)`. The renderer uses `pause()` and `renderAt(t)` and
nothing else.

## Re-rendering the MP4

```
node render-mp4.mjs
```

That renders the full 900 frames and writes `p-vs-np-30s.mp4` next to the script. Progress is
logged every 90 frames with an elapsed time, a per-frame cost and an ETA; the final line prints
the total time and the output path.

For a quick smoke test, render the first three seconds to a scratch file:

```
LIMIT=90 OUT=test.mp4 node render-mp4.mjs
```

### Environment variables

| Variable | Default | Effect |
| --- | --- | --- |
| `LIMIT` | `TOTAL`, i.e. `FPS * SECONDS` = **900** | How many frames to render. Frames always start at `f = 0`, so a smaller `LIMIT` truncates the film rather than sampling it. |
| `OUT` | `<script directory>/p-vs-np-30s.mp4` | Output path. ffmpeg picks the muxer from this extension — there is no explicit output `-f`. |
| `FFMPEG` | `/usr/local/lib/python3.11/dist-packages/imageio_ffmpeg/binaries/ffmpeg-linux-x86_64-v7.0.2` | The ffmpeg binary to spawn. |

`FPS` (30) and `SECONDS` (30) are constants in the script, not environment variables.

### What the renderer does

1. Launches headless Chromium via Playwright, imported from an absolute path
   (`/opt/node22/lib/node_modules/playwright/index.mjs`).
2. Opens a page at 1160 × 2010, `deviceScaleFactor: 1`, and loads `index.html` over `file://`.
3. Waits 800 ms, calls `window.__pvsnp.pause()` to stop the animation loop, then injects CSS
   that hides the header, tabs, controls, panels and footnote and forces the stage to exactly
   1080 × 1920.
4. For each frame `f`, calls `window.__pvsnp.renderAt(f / 30)` and screenshots the `#stage`
   canvas as JPEG at quality 96, writing the buffer into ffmpeg's stdin with backpressure
   handling.
5. Closes the browser, waits for ffmpeg to exit and prints the exit code. On a non-zero exit it
   prints the tail of ffmpeg's stderr (the last 2500 characters of a buffer capped at 8000).

This is not a screen recording. Frame `f` is `renderAt(f / FPS)`, so timing is exact and the
same frames come out on every run regardless of machine speed.

### Export settings passed to ffmpeg

Read straight from the argument list in `render-mp4.mjs`:

| Concern | Flag | Value |
| --- | --- | --- |
| Overwrite output | `-y` | — |
| Input format | `-f` | `image2pipe` (JPEG frames on stdin) |
| Input frame rate | `-framerate` | `30` |
| Video codec | `-c:v` | `libx264` |
| Encoder preset | `-preset` | `slow` |
| Quality | `-crf` | `17` |
| Pixel format | `-pix_fmt` | `yuv420p` |
| Profile | `-profile:v` | `high` |
| Level | `-level` | `4.2` |
| Output frame rate | `-r` | `30` |
| Streaming | `-movflags` | `+faststart` |
| Colour primaries | `-color_primaries` | `bt709` |
| Transfer characteristics | `-color_trc` | `bt709` |
| Colour matrix | `-colorspace` | `bt709` |
| Container | — | MP4, inferred from the `OUT` extension |
| Resolution | — | 1080 × 1920, from the canvas element and the injected stage CSS |
| Audio | — | none; no audio input and no `-c:a` flag are passed |

The committed `p-vs-np-30s.mp4` matches: 30.00 s, 1080 × 1920, 30 fps, H.264 High, `yuv420p`,
bt709, faststart.

## How it is built

### A deterministic timeline

`stateAt(t)` is a pure function of time. It builds a fresh state object on every call — camera,
register values, per-station progress, marker position, tree reveal, scale bar, captions, HUD —
and keeps no accumulated animation state anywhere. `renderAt(t)` draws `stateAt(t)` in four
passes: the 3D scene, the HUD, the captions and the final cards.

The browser player only advances a clock and calls `renderAt`. The renderer ignores the clock
entirely and calls `renderAt(f / 30)` directly. That is why scrubbing, replaying and rendering
all agree to the frame.

Timing comes from a handful of named schedules rather than tweening state: `CAM_KEYS` (eleven
camera keyframes, smoothstep-interpolated), `MARK` (four marker moves along the rail), `EVAL`
(three clause evaluation windows), the `TESTS` pair in the enumerator beat, and the `CP`
checkpoint list that steps the variable count 3 → 4 → 10 → 20 → 50. Every fade is a
`ramp(t, a, b)` smoothstep, so alphas are reproducible rather than eased by a library.

Beat boundaries, read from `stateAt`:

| Beat | Window | What happens |
| --- | --- | --- |
| 1 | 0 – 3.00 | Enter the task. The registers load the supplied bits at 2.45–2.95. |
| 2 | 3.00 – 9.20 | Follow the checker over the supplied answer: three rule stations, then the ALL gate at 8.62. |
| 3 | 9.20 – 15.20 | Remove the answer. The assignment tree reveals 11.90–13.25; the enumerator tests `000` then `001` and stops. |
| 4 | 15.20 – 22.40 | Scale the candidate count through the checkpoint list up to `n = 50`. |
| 5 | 22.40 – 25.40 | The must-we-search distinction, with the dashed "Another algorithm?" route drawn deliberately empty. |
| 6 | 25.40 – 30.00 | The question: the fast/unknown contrast, then `P = NP?`, then "Still an open question." |

Counts are exact: `countAssignments(n)` is `1n << BigInt(n)`, so `n = 50` prints
`1,125,899,906,842,624` rather than a float approximation.

### The engine

A hand-written 2.5D renderer on canvas 2D. No libraries.

- **Camera.** `makeCam(pos, target)` builds a roll-free basis from world up; the focal length is
  `(W/2) / tan(FOV/2)` with `FOV = 40°` horizontal. `project()` returns screen `x`, `y`, a depth
  and a scale, and culls anything within 0.05 units of the camera plane. During 3.00–9.40 the
  camera ignores its keyframes and rides beside the execution marker instead.
- **Painter's algorithm.** Draw calls are not painted immediately. Each one pushes a
  `{ depth, fn }` record onto a render list; `flush()` sorts far to near and then paints. Contact
  shadows push at `depth + 900` so they always land behind geometry; glows and labels push
  slightly in front of their anchor.
- **Shading.** Boxes are eight corners and six faces with backface culling, and each face gets a
  Lambert term of `0.44 + 0.74 · max(0, n·key) + 0.16 · max(0, n·fill)` against a key light at
  `(-0.45, 0.82, -0.36)` and a fill at `(0.62, 0.30, 0.55)`, both normalised. Optional edge
  lighting strokes the face outline.
- **Contact shadows.** Radial gradients projected onto the floor plane and squashed by the
  object's depth-to-width ratio.
- **Text.** World-anchored but drawn in screen space at a size derived from the projected scale
  and clamped, so labels stay crisp instead of being warped into the perspective. Captions, the
  HUD and the final cards are pure screen space, drawn after the flush. Long captions reflow via
  `wrapText` and are never shrunk to fit.

### The world is the computation

Objects map one-to-one onto parts of the evaluation: three registers hold A, B and C at `z = 0`;
conductors run the length of the machine and change colour when they carry a known value; three
rule stations at `z = 6.2 / 11.6 / 17.0` each tap their three literals, negate them through a NOT
block where required, feed an OR body and light an output lamp; the ALL gate at `z = 23.2`
collects the three lamps. Behind the registers, the assignment tree descends through "choose A",
"choose B" and "choose C" to eight leaves, one per complete assignment.

## V1 limitations

Each of these is a property of the current code, not a wish list.

| # | Limitation | Where it comes from |
| --- | --- | --- |
| 1 | **No audio is bundled.** There is no audio element, audio file, Web Audio use or speech synthesis anywhere in `index.html`, and the renderer pipes video frames only — no audio input and no `-c:a` flag. `NARRATION.md` is a script for a future pass; the film is designed to be understood silently. | `index.html`, `render-mp4.mjs` ffmpeg argument list |
| 2 | **The enumerator demonstrates two candidates, not eight.** The beat-3 `TESTS` array holds exactly two entries — `000` at 13.30–13.90 and `001` at 14.05–14.95 — and stops on the first success. All eight leaves are drawn, but six never receive a verdict; the "dim = not yet tested" legend covers the gap. | `TESTS` in `stateAt` |
| 3 | **`ENUM_ORDER` is dead.** `const ENUM_ORDER = [0, 1]` is declared and never read; the order actually shown is hard-coded in `TESTS`. Changing `ENUM_ORDER` changes nothing on screen. | `index.html` line 598 |
| 4 | **The candidate-space bar aggregates above 64 cells.** `cells = Math.min(64, …)`, so from `n = 7` upward the bar stops being one cell per leaf and starts being a sampled bar; above 64 assignments it prints "each cell = N assignments" (at `n = 50`, 17,592,186,044,416 per cell). The feeder funnel is capped too: at most 6 levels and at most 32 wires per level. | `drawScaleBar` |
| 5 | **The scene palette is a second, brighter copy of the interface tokens.** `C_RAISE` is `#262630` against the CSS `--raise2` `#16161A`, and `C_EDGE` is `#5C5C70` against the CSS `--line` of 10 % white, so solids and edges read against black under Lambert shading. Text and accent tokens are identical in both sets. The consequence is that the two palettes are independent literals: editing the CSS will not change the canvas. | `:root` block vs the `C_*` constants |
| 6 | **Fixed 30 s, no runtime re-timing.** `DURATION = 30` in `index.html`; `FPS = 30` and `SECONDS = 30` in the renderer. There is no query parameter, environment variable or argument for duration, frame rate or beat timing. `LIMIT` can only truncate. | both files |
| 7 | **Two tag captions are literal strings, not derived.** `"000 — candidate rejected (Rule 1 fails)"` and `"001 — all rules pass. Stop."` are written out rather than generated from `asgToStr` and `firstFailing`. They agree with the evaluator today, but unlike the lamps and ports they would not follow a change to `CLAUSES`. | beat 3 captions |
| 8 | **The "Verified — not searched." caption is cut mid-fade.** Its fade-out ramp targets 9.30, but the beat-2 block stops at 9.20, so the line disappears at roughly 35 % alpha — a one-frame pop rather than a fade. | beat 2 captions |
| 9 | **Frames are JPEG before they reach x264.** The renderer screenshots as JPEG quality 96, so the pipeline is lossy twice. PNG frames would remove the first loss at the cost of pipe throughput. | `canvas.screenshot` call |
| 10 | **The renderer hard-codes two absolute paths.** Playwright is imported from `/opt/node22/lib/node_modules/playwright/index.mjs`, and the default ffmpeg binary is an `imageio_ffmpeg` path under `dist-packages`. The ffmpeg path can be overridden with `FFMPEG`; the Playwright import cannot be overridden without editing the file, so the script is not portable as written. | `render-mp4.mjs` lines 9 and 19–20 |
| 11 | **Inspect and Scaling never reach the MP4.** The injected render CSS hides `header`, `.tabs`, `.controls`, `.panel` and `#footnote`, so the exported film is the Film beat only. The interactive proof that nothing is hard-coded is browser-only. | injected stylesheet |
| 12 | **`st.fade` is unused.** The state object carries `fade: 1` and nothing reads it. | `stateAt` |
