import { Plugin } from "$fresh/server.ts";

const sources = [
  "https://raw.githubusercontent.com/bigskysoftware/htmx/dev/src/htmx.js"
]

export default function htmx(): Plugin {
  const main = `data:application/javascript,${sources.map(s => `import "${s}";`).join('')} export default () => {}`
  return {
    name: "htmx",
    entrypoints: { "main": main },
    render(ctx) {
      ctx.render();
      return {
        scripts: [{ entrypoint: "main", state: [] }],
      };
    },
  };
}