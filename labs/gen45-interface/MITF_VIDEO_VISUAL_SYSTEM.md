# MITF Video — Visual System

Design system for *Targeting MITF to Reduce Pigmentation*, a 60-second, 12-shot, 9:16
scientific explainer built by Hamiltonian Labs.

Everything below is read from `index.html`. The SVG `viewBox` is `0 0 1080 1920`, which is
exactly the export frame, so every number in this document is a literal export pixel.

- **Frame** — 1080 × 1920 (9:16), 60 s total, 12 shots × 5 s.
- **Layers** — a `<canvas id="depth">` underlay (`z-index: 0`) carrying the ambient
  cytoplasmic depth field and, on shot 9 only, the 3D molecular render; an
  `<svg id="scene">` overlay (`z-index: 1`) carrying every scene component and all chrome.
- **Dependencies** — none. No CDN, no molecular-viewer library. All geometry is drawn by
  hand in SVG or projected onto the canvas by the in-file `Mol3D` projector.

---

## 1. Semantic colour tokens

Colour is the primary carrier of meaning in this reel. Each token has one fixed biological
referent and is never reused for anything else. All values are read directly from `:root`.

### 1.1 Stage palette

| Token | Hex | Fixed biological meaning |
| --- | --- | --- |
| `--background-deep` | `#020B14` | Deepest field. Frame ground and the bottom stop of the canvas gradient. |
| `--background-cellular` | `#071D2C` | Cellular interior / tissue ground. Top stop of the canvas gradient. |
| `--keratinocyte` | `#7397B5` | Keratinocyte body — the recipient cell, always cool blue. |
| `--keratinocyte-highlight` | `#A9C7DB` | Keratinocyte membrane and nuclear rim. |
| `--melanocyte` | `#A55B2A` | Melanocyte body and dendrites — the pigment-producing cell, always warm brown. |
| `--melanocyte-highlight` | `#D38A4A` | Melanocyte rim light, halo and dendrite highlight. |
| `--mc1r` | `#7658F3` | MC1R receptor at rest — receptor purple. |
| `--mc1r-active` | `#9B82FF` | MC1R after ligand binding. The colour shift *is* the activation event. |
| `--alpha-msh` | `#2BE7F2` | α-MSH peptide — extracellular signalling ligand. |
| `--camp-signal` | `#55F2FF` | cAMP second messenger and the membrane pulse ring. |
| `--pka` | `#FFD166` | Protein kinase A — transducing kinase, gold. |
| `--creb` | `#F5C451` | CREB / phospho-CREB — transcription factor, gold. |
| `--crtc3` | `#F7A84D` | CRTC3 — secondary coactivator, deliberately a step warmer and dimmer than CREB. |
| `--mitf` | `#8B4C23` | MITF protein body. Brown, matching the melanocyte, because MITF is the melanocyte's master regulator. |
| `--mitf-highlight` | `#D18A45` | MITF helix highlight, halo, and the "MITF route" identity colour in the comparison shot. |
| `--mitf-shadow` | `#3B1F12` | MITF interior shadow and the loop joining the two lobes. |
| `--dna` | `#9B68F5` | DNA backbone and nuclear envelope stroke. |
| `--dna-highlight` | `#C1A2FF` | DNA second strand, base rungs, regulatory-region boxes, transcript. |
| `--tyr` | `#FF9F32` | Tyrosinase — the gene track, the enzyme body, and the biosynthesis arrows. |
| `--tyrp1` | `#F5813E` | TYRP1 gene track. |
| `--dct` | `#FFB75C` | DCT gene track. |
| `--melanosome-membrane` | `#285B78` | Melanosome and plasma-membrane bilayer. |
| `--melanin` | `#1A0B06` | Melanin itself — near-black brown, the darkest pigment in the system. |
| `--melanin-highlight` | `#5B2C16` | Melanin granule rim, so granules read against the dark organelle. |
| `--candidate-molecule` | `#FFFFFF` | **The Hamiltonian candidate molecule and nothing else.** Pure white is reserved. |
| `--candidate-glow` | `#DFF8FF` | Candidate molecule halo. |
| `--thiamidol` | `#63C8F4` | Thiamidol, the downstream comparator. |
| `--thiamidol-glow` | `#BEEFFF` | Thiamidol halo and bond colour. |
| `--activation-arrow` | `#62EEFF` | Activating / stimulatory flow. |
| `--downregulation-arrow` | `#78A8D8` | Suppression, reduction, "less of". Deliberately desaturated. |
| `--established-border` | `#39D6E8` | Certainty: established biology. Also the viability indicator and validation chips. |
| `--hypothesis-border` | `#F3B34B` | Certainty: computational hypothesis. Also the pocket halo and residue callouts. |
| `--warning` | `#FFB347` | Certainty: open wet-lab question. Also the unresolved-step question mark. |

### 1.2 Editor chrome

These are the surrounding application, not the film. They are deliberately duller than the
stage so that nothing in the tool competes with the frame.

| Token | Value | Role |
| --- | --- | --- |
| `--chrome-bg` | `#08090B` | Application background. |
| `--chrome-panel` | `#0D0F12` | Rail, topbar, shot-list panel. |
| `--chrome-raise` | `#171A1F` | Raised surfaces: timeline segments, shot cards. |
| `--chrome-raise-hi` | `#22262D` | Hover / pressed surfaces. |
| `--chrome-line` | `rgba(255,255,255,.09)` | Hairline dividers and borders. |
| `--chrome-text` | `#D8DBE0` | Primary chrome text. |
| `--chrome-dim` | `#767C86` | Secondary chrome text. |
| `--chrome-faint` | `#4A4F58` | Eyebrow labels and disabled states. |

### 1.3 Non-tokenised literals

A small set of literals is used inside components where the value is a local rendering
detail rather than a semantic claim. They are listed here so the palette stays auditable.

| Literal | Where |
| --- | --- |
| `#16405C` `#113650` `#0D2C43` `#0A2337` `#071D2C` | The five stratified epidermal bands, lightest at the surface (shot 1). |
| `#8CC4DE` / `#6FA6C4` / `#7FB6D4` | Phospholipid head groups (outer / inner) and tails in `CellMembrane`. |
| `#F2F6FA` `#8FB4FF` `#FF6B6B` `#9BE88A` `#FFD166` | CPK atom colours: C, N, O, Cl, S. Used identically in SVG (`Molecule`) and canvas (`Mol3D`). |
| `#FFE9AE` / `#FFF3CE` / `#7A5410` / `#3A2607` | Gold-family strokes, phosphate disc, and dark text on gold bodies. |
| `#FFD3A0` / `#8A4A10` / `#E8B98F` | Tyrosinase rim, active-site shadow, melanin node text. |
| `#FF7A6B` | The "catalysis halted" cross over tyrosinase in the right-hand comparison panel. |
| `#04101A` at 72% | The readability plate behind every slotted label. |

### 1.4 Gradients, filters and markers

Defined once in `buildDefs()` and referenced by ID throughout.

| ID | Type | Use |
| --- | --- | --- |
| `gKera` | radial | Keratinocyte fill. |
| `gMelano` | radial | Melanocyte body fill. |
| `gMitf` | radial | MITF body fill. |
| `gNuc` | radial | Nucleus fill (`#2E5F9E` → `#132F55` → `#0A1B33`). |
| `gMsome` | radial | Melanosome lumen. |
| `gCand` | radial | Candidate-molecule sphere. |
| `gThia` | radial | Thiamidol sphere. |
| `gEpi` | linear | Epidermal ground. |
| `gMembrane` | linear | Membrane sheen. |
| `glowS` / `glowM` / `glowL` | filter | Merge-blur glows at σ = 6 / 14 / 30. |
| `blurOnly` | filter | σ = 22 blur with no source merge — every halo in the film. |
| `ahAct` `ahDown` `ahHyp` `ahTyr` `ahThia` | marker | Arrowheads, one per flow colour. |

---

## 2. Colour grammar

The rules, stated as rules. A frame is wrong if it breaks one.

1. **Cyan is signalling.** `--alpha-msh`, `--camp-signal` and `--activation-arrow` are the
   only cyans on stage. Anything cyan is a signal in transit or an activating relationship.
2. **Purple is receptor and DNA.** `--mc1r` / `--mc1r-active` for the receptor, `--dna` /
   `--dna-highlight` for the helix, regulatory boxes and nuclear envelope. Purple never
   appears on a cytoplasmic messenger.
3. **Gold is transcriptional activation.** `--pka`, `--creb`, `--crtc3`. Gold means the
   signal has become a transcriptional instruction.
4. **Brown is MITF and pigmentation lineage.** `--melanocyte` and `--mitf` share a family
   deliberately: the master regulator carries the colour of the cell it governs.
5. **Orange is pigment genes and pigment enzymes.** `--tyr`, `--tyrp1`, `--dct`. Gene track,
   enzyme body and biosynthesis arrows all share it, so the gene→enzyme link needs no label.
6. **Black-brown is melanin.** `--melanin` is the darkest value in the frame and appears only
   as pigment: granules, melanosome lumen, supranuclear caps, transported carriers.
7. **White is the candidate molecule, only.** `--candidate-molecule` is `#FFFFFF`. No other
   object on stage is pure white — body text is `#FFFFFF` but is typographic, not an object.
   This is what makes the candidate instantly separable from MITF in every frame it appears in.
8. **Light blue is Thiamidol.** `--thiamidol` is the comparator's identity colour and is used
   for the entire right-hand panel of shot 11, not just the molecule.
9. **Desaturated grey-blue is suppression.** `--downregulation-arrow` (`#78A8D8`) marks every
   "less of" relationship. It is deliberately low-chroma: reduction should look like a
   reduction, never like a new activating signal.

Two supporting conventions:

- **Warm versus cool panels.** In shot 11 the panel grounds carry the argument before any
  text does: warm (`--melanocyte` at 13%, `--mitf-highlight` stroke) is the proposed MITF
  route, cool (`--thiamidol` at 10%) is the Thiamidol route.
- **A colour never changes meaning between shots.** The three gene tracks keep their exact
  colours in shots 5, 10 and 11 so that a falling amplitude reads as the same genes, quieter.

---

## 3. Typography

### 3.1 The scale

Read from the `FS` object. These are literal pixels in the 1080 × 1920 export.

| Role | Constant | Size | Weight | Applied to |
| --- | --- | --- | --- | --- |
| Title | `FS.title` | **36 px** | 700 | Shot title at `TITLE_Y`, white, centred. |
| Subtitle | `FS.sub` | **24 px** | 500 | Shot subtitle at `SUB_Y`, white at 58%. |
| Label | `FS.label` | **22 px** | 600 | Slotted object labels, white. |
| Footer | `FS.foot` | **20 px** | 550 | Lower-third caption at `FOOT_Y`, white at 90%. |
| Small | `FS.small` | **18 px** | 650–800 | In-scene body: gene names, reaction steps, panel headers, viability text. |
| Badge | `FS.badge` | **17 px** | 700 / 500 | `SHOT NN` and the timecode in the top bar. |
| Tiny | `FS.tiny` | **17 px** | 600 | In-scene annotations: "Nucleus", "M-box", "Melanocyte", residue callouts. |

Four literal sizes exist outside the scale, all in shot 12 or in shot chrome:
**60 px** (the "?" glyph), **30 px** (the two closing question lines), **22 px** (the
"Hamiltonian Labs" brand line), **20 px** (the "→" separators between validation chips).

Typeface is `--sans` (system UI stack) throughout; `--mono` is chrome-only. On PNG export,
`font-family` is rewritten to a literal system stack so the rasterised SVG matches the preview.

### 3.2 The 16 px minimum-label rule

**No text in the export frame is ever smaller than 16 px.** The smallest value used anywhere
is 17 px (`FS.badge` and `FS.tiny`), which sets the practical floor with a pixel of headroom.

The rule exists because the frame is a 9:16 mobile deliverable: at typical phone playback the
1080-wide frame is displayed at roughly 400 CSS px, so a 17 px export label lands near 6 px
on-screen. Anything smaller stops being readable and starts being texture. If a scene needs
more information than fits at 17 px, the correct fix is to remove information, not to shrink
type.

Two consequences that are visible in the code:

- Every in-scene annotation is authored at `FS.tiny` (17) or `FS.small` (18) — there is no
  "fine print" tier at all.
- Slotted labels sit at 22 px on an opaque `#04101A` plate at 72% opacity, sized as
  `text.length × 12.1 + 44`, so contrast never depends on what is behind the label.

---

## 4. Layout zones

All geometry constants, verbatim:

| Constant | Value | Meaning |
| --- | --- | --- |
| `W` | `1080` | Frame width. |
| `H` | `1920` | Frame height. |
| `CX` | `540` | Horizontal centre (`W / 2`). |
| `SAFE` | `62` | Title-safe inset on all four edges. |
| `TOPBAR_Y` | `84` | Baseline for the shot number, timecode and certainty badge. |
| `TITLE_Y` | `178` | Title baseline (36 px). |
| `SUB_Y` | `222` | Subtitle baseline (24 px). |
| `SC_TOP` | `280` | Top of the scene band. |
| `SC_BOT` | `1552` | Bottom of the scene band. |
| `SC_MID` | `916` | Scene-band centre (`(SC_TOP + SC_BOT) / 2`) — the camera pivot for pushes and scales. |
| `FOOT_Y` | `1668` | Footer caption baseline. |

The frame therefore reads as five stacked zones:

```
0      ─┬─────────────────────────────────────────────┐
        │  certainty border: inset 14, rx 8, 5 px      │
84      │  TOPBAR   SHOT NN · 00:00–00:05   [ BADGE ]  │
178     │  TITLE                                       │  36 px
222     │  SUBTITLE                                    │  24 px
280     ├─────────────────────────────────────────────┤
        │                                              │
        │  SCENE BAND                                  │  1272 px tall
916     │  ·············· SC_MID ·····················  │
        │                                              │
1552    ├─────────────────────────────────────────────┤
1628    │  ▓ footer plate: x=62, w=956, h=62, rx=12 ▓  │
1668    │  FOOTER CAPTION                              │  20 px
1920    └─────────────────────────────────────────────┘
```

- Left and right label columns anchor at `SAFE + 8 = 70` and `W - SAFE - 8 = 1010`.
- The safe-area guide overlay (rail toggle) draws the `SAFE` rectangle, the `CX` centre line
  and the `SC_TOP` / `SC_BOT` rules.
- Render mode (`1080×1920` button) sets the stage to true pixel size so the type scale can be
  checked at delivery resolution rather than fitted preview.

---

## 5. Certainty system

Every frame declares its epistemic status twice: a full-frame border and a top-right badge.
Both are driven by one `CERT` table, so they can never disagree.

| Key | Shots | Badge label | Colour token | Border dash |
| --- | --- | --- | --- | --- |
| `fact` | 1–7 | ESTABLISHED BIOLOGY | `--established-border` `#39D6E8` | none — **solid** |
| `hyp` | 8–10 | COMPUTATIONAL HYPOTHESIS | `--hypothesis-border` `#F3B34B` | `18 14` — **dashed** |
| `cmp` | 11 | TWO INTERVENTION LEVELS | `--mitf-highlight` `#D18A45` | `26 10` — long dash |
| `question` | 12 | WET-LAB QUESTION | `--warning` `#FFB347` | `18 14` — dashed |

Implementation:

- **Border** — `rect` at `x=14, y=14, w=1052, h=1892, rx=8`, `stroke-width: 5`, `opacity: .78`.
- **Badge** — pill at `y = TOPBAR_Y - 27`, height 38, `rx 19`, black at 45%, stroked in the
  certainty colour with a `10 7` dash when the certainty is non-factual, a 6 px filled dot,
  then the uppercased label at 17 px / weight 700 / 1.5 letter-spacing.
- **Timeline** — each segment carries a 2.5 px underline in its certainty colour; the
  comparison shot uses a hard 50/50 gradient from `--mitf-highlight` to `--thiamidol`,
  encoding "two routes" in the scrubber itself.

The reading is intended to be pre-verbal: **solid cyan means this is known; a broken amber
edge means we are proposing, not asserting.** A viewer who never reads the badge still gets
the distinction from the border alone.

---

## 6. Label system

Labels are *slotted*, not free-floating. Each entry in a shot's `labels` array declares:

```js
{ key: "mel", text: "Melanocyte", color: "melanocyte-highlight", side: "r", slot: 1180 }
```

| Field | Role |
| --- | --- |
| `key` | Looks up a live anchor in the scene's `anchors` object. |
| `text` | The label copy. |
| `color` | A palette token — the chip colour and the anchor dot colour, so the label is colour-bound to its object. |
| `side` | `"l"` or `"r"` — which safe-area column the label parks in. |
| `slot` | The fixed vertical baseline in export pixels. |

**Why slots.** The text block never moves. Because slots are authored per shot and never
overlap, two labels can never collide or swap order, however the underlying objects move.
This is what keeps a 5-second shot legible without any collision-avoidance solver.

**Leader lines.** Every frame, `track(anchors)` re-points each leader:

1. Read the anchor `[x, y]` from the scene and clamp it to `30 … W-30`, `30 … H-30`.
2. Draw a two-segment path: a horizontal run from the label edge to an elbow at
   `±74 px`, then a straight diagonal to the anchor.
3. Move the 6.5 px anchor dot to the anchor.
4. If the scene publishes no anchor for that key, the leader and dot fade to zero rather
   than pointing at nothing.

**Anchors track motion.** Scenes mutate `anchors` inside `update(t)`, so leaders follow moving
objects: the α-MSH label follows the peptide across the membrane in shot 2; the candidate
label follows the molecule along the entry path in shot 8; in shot 9 the pocket, binder and
dimer anchors are back-projected from the live 3D render into viewBox coordinates each frame.

**Plate.** Each label sits on a `#04101A` plate at 72% opacity, `rx 18`, height 36, width
`text.length × 12.1 + 44`, inserted behind the leader so the text is legible over any scene.

**Silent-viewer test.** A rail toggle hides every `<text>` node and dims chrome graphics, so
the reel can be checked for whether it still communicates with the sound and captions off.

---

## 7. Component inventory

Twelve reusable builders. Each returns its root `<g>` plus whatever handles the scene needs
to animate it; no component animates itself, so all timing stays in one place per shot.

| Component | Draws | Animates via |
| --- | --- | --- |
| `CellMembrane` | A true phospholipid bilayer: two stroked leaflet rails plus head circles every 26 px and angled tails, optionally curved. | Static geometry; exposes `yAt(x)` so scenes can pin anchors and objects to the membrane's curve. |
| `Keratinocyte` | Cool blue seven-sided rounded cell with a visible nucleus, plus a hidden supranuclear melanin cap and six cap dots. | `setPigment(v)` fades the cap and dots in as pigment arrives; scenes jitter the transform for ambient life. |
| `Melanocyte` | Warm brown dendritic cell: blurred halo, 3–6 curved dendrites with highlight strokes, nucleus, and five internal melanosomes. | Returns `arms[]` (each with midpoint and endpoint) so transport routes can be built along real dendrites; `halo` opacity pulses. |
| `MC1R` | Seven tilted transmembrane helices with two extracellular and one intracellular loop, so it reads as a GPCR rather than a barcode. | `activate(v)` swaps every helix fill from `--mc1r` to `--mc1r-active` and raises the halo. |
| `AlphaMSH` | A short cyan peptide chain: six beads on a sine-displaced backbone, terminal beads smaller, one glowing. | Positioned by the scene; travels and rotates into the receptor. |
| `DNAHelix` | An antiparallel double helix: two phase-offset sine strands in `--dna` / `--dna-highlight` with 35 base rungs between them. | Static; exposes `yAt(u, phase)` for placing objects on the backbone. |
| `MITFDimer` | A dimeric bHLH-LZ: four coiled-coil helices forming two subunits, each running basic region → HLH → leucine zipper with a visible kink, joined by two loops, with a dark kink pocket between the zipper helices. Optionally instantiates the candidate ligand in that pocket. | `setPocketGlow(v)` raises an amber pocket halo; `halo` breathes; `pocketAt` publishes the pocket position for anchoring. |
| `Melanosome` | Pigment organelle: double membrane ring in `--melanosome-membrane`, dark lumen, and up to 30 seeded melanin granules with highlight rims. | `setFill(v)` — the single most important control in the film. `v` sets lumen opacity and reveals granules in order, so pigment load is one scalar. |
| `Molecule` | Ball-and-stick small molecule with CPK atoms, specular dots and a halo. `kind: "candidate"` projects the real deposited 9H7Q ligand geometry (its y–z plane, scaled to 132 units); `kind: "thiamidol"` draws a distinct light-blue comparator scaffold. | `setGlow(v)`; scenes translate, scale and rotate the root group. |
| `PathwayArrow` | A straight or quadratic directional arrow with a colour-matched marker head; `dashed` for proposed relationships. | Scenes ramp `opacity` to sequence the cascade. |
| `GeneTrack` | A labelled gene box plus a transcribed RNA wave running to the right, with a travelling head bead. | `set(level, phase)` — amplitude is `5 + level × 30`, wave opacity `.35 + level × .65`, box stroke `.4 + level × .6`. Transcriptional output is a single number. |
| `Mol3D` | The hero renderer. Projects real PDB 9H7Q coordinates — chains A and B, 157 Cα, plus the 19-atom deposited ligand — onto the canvas with rotation, −0.28 rad tilt, perspective divide, per-primitive depth sorting, a soft surface impression, and pocket-contact residues drawn in `--mitf-highlight` against `--mitf` for the rest of the backbone. | `draw(ctx, w, h, t, opts)` spins at π/2 rad per shot; the ligand slides in over `t ∈ [0.05, 0.45]` and then jitters. Returns projected pocket and ligand positions so SVG labels can track the 3D scene. |

---

## 8. Motion grammar

Timing is normalised: every scene receives `t ∈ [0, 1]` across its 5 seconds. The only easing
primitive is `ramp(t, from, to)` — zero before `from`, one after `to`, smoothstep between —
so every beat in the film has the same acceleration character.

### Activation looks like: colour change, then halo, then outward pulse

The receptor does not wobble or grow. `MC1R.activate()` swaps every helix from `--mc1r` to
`--mc1r-active` at the 0.5 threshold, the blurred halo rises to 34%, and a `--camp-signal`
ring expands from 12 px to 222 px while fading out. Downstream, each `PathwayArrow` lifts from
25% to 100% opacity in sequence (cAMP → PKA at `ramp(t, .34, .5)`, PKA → CREB at
`ramp(t, .56, .72)`), and the phosphate disc on CREB fades in on the same ramp. Activation is
always *a state change followed by a wave leaving the source* — never a size change.

### Transcription looks like: amplitude and travel

`GeneTrack.set(level, phase)` is the whole vocabulary. `level` sets the wave's amplitude
(5 → 35 px), its opacity, and its box stroke; `phase` advances the wave and runs a head bead
along it. Tracks stagger by 0.12 of the shot in shot 5 (`ramp(t, .26 + i×.12, .46 + i×.12)`),
so TYR, TYRP1 and DCT switch on in sequence rather than together. In shot 4 the MITF
transcript is drawn as a progressively lengthening sine polyline emerging from the gene box,
with the two MITF subunits converging and snapping into the assembled dimer at `form = 1`.

### Modulation looks like: partial decay, and a floor

Modulation is deliberately never a shutdown. In shot 10, gene level runs
`lerp(1, 0.45, ramp(t, .10, .80))` — a fall to roughly 45%, not to zero. Melanosome fill
follows: `0.85 → 0.38` and `0.75 → 0.30`. Arrows switch to `--downregulation-arrow`, the MITF
halo dims from 16% to 7%, and the "Cell remains viable" pill fades in over
`ramp(t, .45, .70)`. Shot 11's left panel does the same at `lerp(1, 0.38, …)`. The visual
claim is *less*, with the objects still present and intact.

### Binding looks like: approach, settle, jitter, glow

In `Mol3D`, `settle = ramp(t, .05, .45)` drives an approach offset of `(1 − settle) × 26`
applied along the ligand's displacement from the pocket centroid, so the molecule slides in
along a real vector rather than fading up in place. Once settled, a `sin(t × 34) × 0.22`
thermal jitter keeps it alive — the molecule is held, not glued. Behind everything, an amber
radial halo at the projected pocket centroid marks the site, and the twelve contact residues
are drawn thicker and lighter than the rest of the backbone. In SVG scenes the same event is
expressed as `MITFDimer.setPocketGlow(0.35–0.7)` breathing at 3.4–4 rad/s.

### Ambient layer

Under everything, `paintDepth(t)` paints a vertical gradient
(`--background-cellular` → `#04121D` → `--background-deep`), 42 seeded parallax particles
drifting at depth-scaled speeds in additive blend, and a radial vignette to 55% black. It
gives the frame atmosphere without adding any object that could be mistaken for biology.

### Camera

There is one camera move in the film: shot 1's slow push, `scale(1 + t × 0.07)` about
`(CX, SC_MID)`, with label anchors rescaled by the same factor so leaders stay attached.
Every other shot holds; motion comes from the biology, not the lens. Shot 12 adds a gentle
`sin(t × 1.4) × 4°` rock on the bound complex, and shot 9 orbits at π/2 radians across
its five seconds.

`prefers-reduced-motion` pauses autoplay and collapses all CSS transitions to 1 µs.
