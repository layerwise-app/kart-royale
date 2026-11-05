<a href="https://layerwise.app"><picture><source media="(prefers-color-scheme: dark)" srcset="https://layerwise.app/powered-by-dark.png"><img src="https://layerwise.app/powered-by.png" alt="Powered by Layerwise" width="174" height="28"></picture></a>

# Kart Royale

Kart Royale is a 3D kart racer that runs in the browser, built with Three.js.
It's a starting point for anyone who wants to make their own arcade racing
game. Players pick one of eight racers, then race seven AI rivals over three
laps of Sunset Bay Circuit, drifting for boosts and using items picked up from
boxes on the track. It plays with a keyboard, a gamepad, or on-screen touch
controls. The game loads no image or audio files: every texture, mesh, and
sound is generated in code.

Play the live demo at <https://kartroyale.layerwise.site/>.

Kart Royale was built with [Layerwise](https://layerwise.app), and you can
open it in Layerwise to make your own version.

## Where things live

The page is a TanStack Start app. `src/routes/index.tsx` renders the loading
screen and two empty layers, and `src/game-engine/main.ts` boots the game into
them. Everything else is under `src/game-engine/`:

| What | Where |
| --- | --- |
| Page title and description | `src/routes/index.tsx` (`homePageTitle`, `homePageDescription`) |
| Racers: name, colour, acceleration, top speed, weight, handling | `ROSTER` in `game/Race.ts` |
| Lap count, grid size, base top speed, surface grip | `LAP_COUNT`, `RACER_COUNT`, `BASE_TOP_SPEED`, `SURFACE_PROPS` in `types.ts` |
| Track shape, width, banking, kerbs | `world/TrackLayout.ts` |
| Scenery, props, foliage, water | `world/Scenery.ts`, `world/Props.ts`, `world/Foliage.ts`, `world/Water.ts` |
| Items and their odds by race position | `WEIGHTS` in `game/Items.ts`; projectiles in `game/Projectiles.ts` |
| AI drivers | `game/AI.ts` |
| Keyboard and gamepad bindings | `core/Input.ts` |
| Touch controls and the Controls screen | `core/TouchControls.ts`, `ui/ControlsMenu.ts` |
| Graphics quality presets | `PRESETS` in `core/Settings.ts` |
| Sound effects and music | `audio/Audio.ts`, `audio/Synth.ts`, `audio/Music.ts` |
| Title, racer select, pause, and results screens | `ui/Menus.ts` (the title logo is `LOGO_SVG`) |
| HUD and minimap | `ui/HUD.ts`, `ui/Minimap.ts` |
| UI colours, type, and sizes | CSS variables on `.kr` at the top of `ui/ui.css` |
| Logo and favicons | `public/logo.svg`, `public/logo.png`, and the icons beside them |

### Changing a racer

Each entry in `ROSTER` is one racer. Their kart livery comes from `color`, and
the four stat multipliers sit around `1.0`. Keep them between `0.74` and `1.24`,
the range the select screen's stat bars cover (`STAT_RANGE` in `ui/Menus.ts`).
The grid uses the first `RACER_COUNT` entries, and kart 0 is the default pick on
the select screen. The select screen is laid out for eight cards, so changing an
existing racer is simpler than adding a ninth.

### Changing the copy

On-screen text lives where it's drawn. The title screen's track name, start
prompt, and key hints are in `buildTitle` and `syncTouchCopy` in `ui/Menus.ts`.
The loading screen's wordmark is in `src/routes/index.tsx`, and its progress
labels are `SYSTEM_LABELS` in `src/game-engine/main.ts`.

### URL options for testing

- `?ui=title`, `?ui=select`, `?ui=pause`, or `?ui=results` forces a menu screen.
- `?quality=low`, `medium`, `high`, or `ultra` overrides the automatic quality
  choice, and `?scale=0.5` lowers the render resolution.

## Commands

```bash
pnpm dev          # start the dev server
pnpm check-types  # type-check
pnpm build        # type-check and build for Cloudflare Workers
```

The project still contains the Layerwise starter's sign-in pages (`/sign-in`,
`/sign-up`, `/dashboard`) and their D1 database. The game doesn't link to them
or store anything on the server. It saves only control preferences, in the
browser's `localStorage` (`core/ControlPrefs.ts`).
