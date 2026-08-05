# Gen-4.5 interface study — "Targeting MITF to Reduce Pigmentation"

A single-file, dependency-free clone of a Gen-4.5-style generative video interface, loaded
with a real 12-shot storyboard as its working session.

Open `index.html` in any browser. Nothing is fetched, installed, or sent anywhere.

## What it is

Two things at once:

1. **The interface** — icon rail, session bar with credit meter, a 9:16 render gate with
   title-safe guides, a 60-second timeline of twelve 5-second segments, a floating composer
   (model / ratio / duration / cost), a shot inspector drawer, and a simulated render queue.
2. **The storyboard** — the twelve shots of *Targeting MITF to Reduce Pigmentation*, each
   with its scene, camera move, on-screen labels, lower-third caption, voiceover line, and a
   copy-ready generation prompt.

## Frames are drawn, not generated

Every frame is composed live on a 2D canvas from per-shot layer parameters — membranes,
receptors, particle streams, nucleus, DNA, protein blobs, melanosomes, split-screen
comparison, hero end card. No model is called. This is a storyboard previsualisation tool:
it shows composition, labelling, pacing and colour code so the real prompts can be written
against something concrete.

## Using it

| Action | How |
| --- | --- |
| Play / pause the reel | `Space`, or the transport button |
| Move between shots | `←` / `→`, the timeline, or the shot list |
| Read a shot's full brief | Shot inspector (magnifier in the rail) |
| Copy one shot's prompt | **Copy prompt** in the composer |
| Copy the whole package | **Export all →** — master style prompt, full VO script, all 12 prompts |
| Save a frame as PNG | **Save frame** in the inspector (exports at 1080×1920) |

## Colour code

MITF brown · candidate molecule pearl white · MC1R blue-violet · α-MSH cyan · cAMP turquoise ·
CREB gold · TYR/TYRP1/DCT orange · melanin dark brown · Thiamidol silver-blue ·
membrane translucent blue · nucleus glowing blue · DNA violet.

## Scientific framing

The MITF-binding route is presented throughout as **proposed** — a computationally
prioritised hypothesis awaiting wet-lab validation — never as established fact. Shots 9 and
10 are worded conditionally ("if… should…") for that reason, and the badge in the session bar
carries the same qualifier.

## Attribution

An independent interface study. Not affiliated with, endorsed by, or connected to Runway.
No Runway branding, logos, or assets are reproduced.
