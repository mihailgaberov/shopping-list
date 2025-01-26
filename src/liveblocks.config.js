import { createClient } from "@liveblocks/client";

const API_KEY = import.meta.env.VITE_API_KEY;

const client = createClient({
  publicApiKey: API_KEY,
});
