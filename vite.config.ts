import { sites } from "@openai/sites-vite-plugin";
import { nitro } from "nitro/vite";
import vinext from "vinext";
import { defineConfig } from "vite";

const isVercel = Boolean(process.env.VERCEL);

export default defineConfig({
  plugins: [vinext(), ...(isVercel ? [nitro()] : [sites()])],
});
