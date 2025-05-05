import { Plugin } from "$fresh/server.ts";


export default function fontFace(): Plugin {
  return {
    name: "font-face",
    render(ctx) {
      ctx.render();
      return {
        styles: [
          {
            href: "https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;700&display=swap",
            rel: "stylesheet",
            cssText: `
              @font-face {
                font-family: InstrumentSans;
                src: url('/fonts/InstrumentSans-VariableFont_wdth,wght.ttf') format('truetype');
              }
              @font-face {
                font-family: InstrumentSans;
                src: url('/fonts/InstrumentSans-Bold.woff2') format('truetype');
              }`,
          },
        ],

      };
    },
  };
}