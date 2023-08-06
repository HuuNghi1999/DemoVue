import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";
import VueRouter from "unplugin-vue-router/vite";

export default defineConfig({
	plugins: [VueRouter(), vue()],
	resolve: {
		alias: [
			{
				find: "@",
				replacement: fileURLToPath(new URL("./src", import.meta.url)),
			},
			{
				find: "@assets",
				replacement: fileURLToPath(new URL("./src/assets", import.meta.url)),
			},
			{
				find: "@config",
				replacement: fileURLToPath(new URL("./src/config", import.meta.url)),
			},
			{
				find: "@routes",
				replacement: fileURLToPath(new URL("./src/routes", import.meta.url)),
			},
			{
				find: "@views",
				replacement: fileURLToPath(new URL("./src/views", import.meta.url)),
			},
			{
				find: "@service",
				replacement: fileURLToPath(new URL("./src/service", import.meta.url)),
			},
			{
				find: "@components",
				replacement: fileURLToPath(
					new URL("./src/components", import.meta.url)
				),
			},
			{
				find: "@store",
				replacement: fileURLToPath(new URL("./src/store", import.meta.url)),
			},
			{
				find: "@utils",
				replacement: fileURLToPath(new URL("./src/utils", import.meta.url)),
			},
		],
	},
});
