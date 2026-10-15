const { spawn } = require("node:child_process");
const path = require("node:path");

const backendDir = path.resolve(__dirname, "..", "backend");

const server = spawn("node", ["app.js"], {
  cwd: backendDir,
  env: {
    ...process.env,
    PORT: process.env.PORT || "5000",
    HOST: "0.0.0.0",
  },
  stdio: "inherit",
});

server.on("error", (error) => {
  console.error("Erro ao iniciar o servidor:", error);
  process.exit(1);
});

server.on("exit", (code) => {
  process.exit(code ?? 1);
});

process.on("SIGTERM", () => server.kill("SIGTERM"));
process.on("SIGINT", () => server.kill("SIGINT"));
