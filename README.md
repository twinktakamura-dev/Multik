# Папа, научи подкатывать! — Remotion project

A 4-minute, 1920×1080, 24fps animated 2D cartoon project. The scenes, character vector art, camera-style motion, dialogue timing, and Russian on-screen dialogue are implemented in React/Remotion.

## Run

1. Install Node.js 20+.
2. In this folder run `npm install`.
3. Preview: `npm start`.
4. Render MP4: `npm run render`.

Output: `out/papa-nauchi-podkatyvat.mp4`.

## Audio / voice acting

This project currently includes timed dialogue captions and animated acting, but no recorded voice tracks. To add Russian voice acting, record separate tracks for `ПАПА`, `СЫН`, and `ДЕВУШКА`, place them in `public/audio/`, then add Remotion `<Audio>` elements in `src/video.tsx` at the matching scene/line timestamps. Add licensed music and sound effects the same way. The project does not pretend to include synthesized voices that have not been rendered.
