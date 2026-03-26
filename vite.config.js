import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function envDefine(mode, env) {
  const nodeEnv =
    mode === "production"
      ? "production"
      : mode === "testing"
        ? "testing"
        : "development";
  const pick = (k, fallback = "") => JSON.stringify(env[k] ?? fallback);
  return {
    "process.env.NODE_ENV": JSON.stringify(nodeEnv),
    "process.env.VUE_APP_LIFF_ID": pick("VITE_APP_LIFF_ID"),
    "process.env.PLATFORM_ID": pick("VITE_PLATFORM_ID"),
    "process.env.ENDPOINT_URL": pick("VITE_ENDPOINT_URL"),
    "process.env.PARTNER_ID": pick("VITE_PARTNER_ID"),
    "process.env.BIZ_TYPE": pick("VITE_BIZ_TYPE"),
    "process.env.BIZ_SUB_TYPE": pick("VITE_BIZ_SUB_TYPE"),
    "process.env.TAX_CLASS": pick("VITE_TAX_CLASS"),
    "process.env.SB_PAYMENT_URL": pick("VITE_SB_PAYMENT_URL"),
    "process.env.SB_SUCCESS_URL": pick("VITE_SB_SUCCESS_URL"),
    "process.env.SB_ERROR_URL": pick("VITE_SB_ERROR_URL"),
    "process.env.SB_CANCEL_URL": pick("VITE_SB_CANCEL_URL"),
    "process.env.SB_PAGECON_URL": pick("VITE_SB_PAGECON_URL"),
    "process.env.SB_HASH_KEY": pick("VITE_SB_HASH_KEY"),
    "process.env.SB_MERCHANT_ID": pick("VITE_SB_MERCHANT_ID"),
    "process.env.SB_SERVICE_ID": pick("VITE_SB_SERVICE_ID"),
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    define: envDefine(mode, env),
    plugins: [
      vue({
        template: {
          compilerOptions: {
            compatConfig: { MODE: 2 },
          },
        },
      }),
    ],
    resolve: {
      alias: {
        vue: "@vue/compat",
        "@": path.resolve(__dirname, "src"),
      },
    },
    server: {
      host: "localhost",
      port: 8180,
      strictPort: false,
    },
    build: {
      outDir: "dist",
      assetsDir: "static",
      sourcemap: true,
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler",
        },
      },
    },
  };
});
