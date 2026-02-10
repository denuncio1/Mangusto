// This file suppresses known non-breaking warnings from third-party libraries in development.
// Place this import at the top of your main entry (main.tsx).

if (import.meta.env.DEV) {
  const suppressed = [
    /Warning: React does not recognize the `wrapperStyle` prop on a DOM element/,
  ];
  const origWarn = console.warn;
  console.warn = function (...args) {
    if (typeof args[0] === "string" && suppressed.some((r) => r.test(args[0]))) {
      return;
    }
    origWarn.apply(console, args);
  };
}
