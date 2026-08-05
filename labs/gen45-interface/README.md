# Targeting MITF — 60-second explainer

A single-file, dependency-free vertical (9:16) scientific explainer on the MITF pigmentation
pathway and a proposed small-molecule MITF binder. Twelve shots, five seconds each.

Open `index.html` in any browser. Nothing is fetched, installed, or sent anywhere.

## What it is

A player and a video in one file. The stage renders at exactly 1080 × 1920; the editor chrome
around it is deliberately duller than the frame so the reel always reads as the brighter object.

Each shot is composed live from an SVG scene graph over a canvas depth field. Nothing is a
pre-rendered image, so every frame stays crisp at export resolution and every label remains
real text rather than pixels baked into artwork.

## The visual system

The reel is built so a viewer with no audio, no scientific background and only brief labels can
still follow the mechanism. Three rules carry that load:

**Colour is semantic and fixed.** Cyan is signalling in motion. Purple is receptor and DNA
structure. Gold is transcriptional activation. Brown is MITF and pigmentation biology. Orange is
pigment genes and enzymes. Near-black brown is melanin. White is the candidate molecule and
nothing else. Light blue is the Thiamidol comparator. Desaturated blue-grey is pathway
suppression. No object borrows another's colour.

**Certainty is visible before it is read.** Shots 1–7 carry a solid cyan border and an
"Established biology" badge. Shots 8–10 carry a dashed amber border and a "Computational
hypothesis" badge. Shot 11 compares two intervention levels; shot 12 closes on a wet-lab
question. You can tell fact from proposal at a glance, with the sound off.

**Silhouettes are distinct.** MITF is a two-lobed bHLH-LZ dimer with a leucine-zipper kink, never
a generic blob. MC1R is seven membrane-spanning helices. PKA is a bilobed kinase with a substrate
cleft. Tyrosinase is a membrane-anchored enzyme with a visible catalytic cleft and its two copper
centres. The candidate and Thiamidol are ball-and-stick molecules on different scaffolds.

Full details in `MITF_VIDEO_VISUAL_SYSTEM.md`.

## The hero shot uses real coordinates

Shot 9 is not an illustration. It renders **PDB 9H7Q** — *MITF in complex with
5-chloro-3-phenyl-1H-indole-2-carboxylic acid*, X-ray, 1.72 Å — as deposited: chains A and B of
the bHLH-LZ dimer (157 Cα points) and the 19-atom ligand with its 21 bonds, drawn by a custom
canvas projector with Catmull-Rom backbone smoothing and depth sorting.

The three on-screen residue callouts are real contacts computed from the deposit, not decoration:

| Residue | Chain | Closest approach |
| --- | --- | --- |
| GLU260 | A | 2.92 Å |
| GLN261 | B | 2.81 Å |
| LYS265 | B | 3.97 Å |

Twelve residues sit within 4.5 Å in total, spanning both chains — the ligand binds at the A/B
dimer interface. The coordinates are recentred by a single rigid translation; no rotation,
scaling or idealisation is applied. `9h7q.cif` and `mitf-9h7q-extract.json` are included so the
numbers can be checked.

The same real ligand geometry is reused wherever the candidate molecule appears (shots 8, 10, 11
and 12) — the molecule's shape is real everywhere, only its surroundings are illustrative. The
Thiamidol comparator scaffold *is* invented and must not be presented as structural.

No PyMOL, ChimeraX, Mol* or NGL is involved: none are installed, and the artifact CSP blocks
external CDNs, so the renderer is written from scratch against the parsed coordinates.

## Scientific framing

The MITF-binding route is presented as a computational hypothesis awaiting wet-lab validation,
never as established fact. Shots 8–10 use *proposed*, *predicted* and *hypothesis*; the word
*inhibitor* is reserved for Thiamidol, which genuinely is one. Shot 9's claim is limited to
"predicted binding may alter MITF leucine-zipper dynamics" — not that it blocks DNA binding or
disables the protein, neither of which is established.

The depicted endpoint is **partial** pathway suppression with the melanocyte intact: gene output
falls to roughly 45% rather than zero, pigment granules become fewer rather than absent, and a
viability indicator stays on screen. No shot depicts cell death.

See `MITF_VIDEO_SCIENCE_NOTES.md` for the pathway as drawn, the corrections made, and the
permitted/forbidden wording tables.

## Using it

| Action | How |
| --- | --- |
| Play / pause | `Space`, or the transport button |
| Move between shots | `←` / `→`, the timeline, or the shot list |
| Silent-viewer test | Eye button in the rail — hides every label so you can check the graphics carry the story alone |
| Safe-area guides | Grid button in the rail |
| True export size | `1080×1920` — the stage becomes exactly that many pixels |
| Save the current frame | `Save PNG` — composites the canvas underlay with the live SVG |
| Full-screen preview | Expand button in the rail |
| Copy shot list + VO script | `Export script` |

## Files

| File | What it is |
| --- | --- |
| `index.html` | The whole application — player, scenes, molecular renderer |
| `MITF_VIDEO_VISUAL_SYSTEM.md` | Palette tokens, type scale, layout zones, component inventory, motion grammar |
| `MITF_VIDEO_SCIENCE_NOTES.md` | Pathway as depicted, corrections, 9H7Q provenance, claims discipline |
| `MITF_VIDEO_SHOT_LIST.md` | Production shot list: scene, camera, labels, footer and VO per shot |
| `9h7q.cif` | The deposited structure, unmodified |
| `mitf-9h7q-extract.json` | Cα traces, ligand atoms/bonds, and computed contact distances |
| `backup/index.v1.html` | The previous build, kept for comparison |

## Attribution

An independent piece of work. Not affiliated with, endorsed by, or connected to Runway. 9H7Q is
used under the PDB's open data terms.
