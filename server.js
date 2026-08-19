// CommonJS entry point required by Hostinger/LiteSpeed lsnode.js.
// The application itself remains ESM and is loaded asynchronously.
import("./src/server.js").catch((error) => {
  console.error("Failed to load application:", error);
  process.exit(1);
});
