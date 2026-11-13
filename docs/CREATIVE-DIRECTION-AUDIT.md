# Creative-direction audit — 13 November 2026

## Assessment
The portfolio has useful work and a coherent neutral/serif visual foundation. It is not yet a leading creative portfolio: the biggest gap is evidence and editorial selection, not additional animation. This is a qualitative design review, not a measured percentile ranking.

## Findings and decisions
| Priority | Finding | Why it matters | Action |
| --- | --- | --- | --- |
| High | Resume link opens a Drive preview; its fixed file-size/update claims are not derived from an actual local file. | A broken or misleading CTA weakens confidence at the point of contact. | Removed the entire CV section. Replaced it with a concise project enquiry and direct contact links. Keep a CV separately for applications if needed. |
| High | Large introductory hero, category labels, and an oversized old reel delayed seeing representative work. | The first visit should establish what you make and show evidence quickly. | Shortened hero; four selected projects now lead the homepage, followed by category links, a concise About, and Contact. |
| High | Seventeen editing projects were presented in a horizontal carousel. | It was difficult to compare projects and understand the range. | Responsive grid, six initially visible, all seventeen accessible on demand. This is progressive disclosure, not a final quality ranking. |
| High | Existing descriptions contain unsupported outcomes and inconsistencies. | Invented or incorrect context is more damaging than a short, factual case study. | Still requires verification. Just For Hearts is described as healthcare in experience and wedding work in projects. Creator volumes claim retention improvements/turnaround without evidence. Do not publish these claims as verified. |
| High | Video editing highlights still date to 2022–2024 despite newer exports existing. | Visitors cannot judge current ability from the latest work. | Newer video inventory prepared separately; YouTube links and exact contribution credits remain required. |
| High | Brand cases mostly show logos or label exports with minimal decision-making context. | A logo gallery demonstrates outputs but not the designer's judgement or the breadth of a system. | Added clean galleries previously; next add a brief, your role, one meaningful constraint, an explanation of choices, and applications. |
| Medium | Tailwind build omitted pages while a CDN runtime generated additional styles. | Layout depended on a second styling system and could change between loading and build contexts. | Added pages to build scanning and removed CDN Tailwind configuration and obsolete import map. Restarted the dev server and inspected refreshed layouts. |
| Medium | Desktop navigation was hidden behind a menu; custom cursor replaced the native pointer. | Basic browsing required unnecessary interaction. | Visible desktop Work/About/Contact links and native cursor. Mobile menu retained. |
| Medium | Project URLs used manual history replacement separate from the router. | Back navigation and shared links could diverge from the visible project. | Project modal now derives from route parameters. Checked direct entry, close, Escape, and browser Back. |
| Medium | Weak focus handling and tiny low-contrast labels. | Keyboard users had little guidance, and secondary information was hard to read. | Added focus styling, dialog semantics, initial focus/Tab containment/restore, reduced-motion configuration, clearer labels and larger card text. Not a comprehensive accessibility certification. |
| Medium | About and Contact carried several decorative panels and repetitive facts. | Presentation competed with the work and felt like a resume template. | Reduced to portrait, two paragraphs, education, and direct contact links. Removed generic category process strips. |
| Medium | Structured data asserted a location not confirmed in the current content. | Search metadata should match verified information. | Removed the unconfirmed address; updated specialties to the three current areas. |

## Content standard for the next pass
Aim for a small, defensible lead selection; six to eight strong case studies across all three disciplines is a useful editorial target, with older work available as an archive.

### Video editing
- Lead with the strongest finished recent edit, not whichever item happens to come first in the data.
- Use a distinctive poster frame or approved thumbnail. The Christina Perri playlist currently has an intentional typographic cover, not a frame from the video.
- State client/series, deliverable format, year, and exact role. Distinguish supplied footage, 3D renders, animation, music, and collaborators from your own contribution.
- Explain one or two concrete choices about structure, pacing, sound, or transitions. Avoid generic phrases such as “high-energy” without showing what they mean.
- Group series/variants (e.g. Gemello) into one case study rather than making each export a headline project.
- Bonzer's project index still says music and voiceover pending. Confirm a finished version before presenting it as complete.

### Branding and packaging
- Ayurexim and Festive offer more substance than isolated logo marks; build these into the strongest brand stories.
- Show a strong product/range image, then flat label details, type/colour choices, and actual applications. Keep mockups explicitly labelled.
- OptoSphere, WEBEE, Motioncraft, and ORBITO need applications and a short rationale before they read as complete case studies. Do not inflate them with invented research or business outcomes.
- Use a consistent cover system: current aspect ratio is consistent, but differently proportioned source artwork still creates unequal white margins. A later art-direction pass can prepare intentional covers while retaining full artwork inside.

### VFX compositing
- A reel alone is insufficient to assess technical contribution. Add two or three breakdowns with original plate, intermediate passes, final shot, software, and exact responsibility.
- Clearly credit source footage and collaborative work; do not imply every shot was created entirely by you.
- Keep the 2024 reel honestly dated until a new reel exists.

## Verification
- Production build and TypeScript checks.
- Existing 15 automated tests.
- Browser interaction checks at 1440px desktop and 390px mobile: homepage, editing grid expansion, branding dialog focus, direct project URL, Escape, browser Back, mobile menu, contact hash navigation, and horizontal overflow.
- Inspected refreshed desktop/mobile screenshots after rebuilding the styling setup.
- No deployment, no external messages, no invented project outcomes.
- This pass did not watch every video end to end, verify external link availability, measure real-user performance, or complete a screen-reader audit. Video editing quality itself remains to be reviewed against the final films.
