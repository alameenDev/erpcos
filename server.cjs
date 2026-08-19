// Explicit CommonJS entry point for Hostinger/LiteSpeed lsnode.js.
// Dynamic import safely loads the ESM application and its dependencies.
import("./src/server.js").catch((error) => {
  console.error("Failed to load application:", error);
  process.exit(1);
});
