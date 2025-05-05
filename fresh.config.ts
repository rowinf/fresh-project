
import { defineConfig } from "$fresh/server.ts";
import tailwind from "@pakornv/fresh-plugin-tailwindcss";
import htmx from "./htmx-plugin.ts";
import fontFace from "./font-plugin.ts";

 export default defineConfig({
  plugins: [tailwind(), htmx(), fontFace()],
 });