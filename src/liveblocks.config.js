import { createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";

const API_KEY = import.meta.env.VITE_API_KEY;

const client = createClient({
  publicApiKey: API_KEY,
});

export const {
  RoomProvider,
  useOthers,
  useUpdateMyPresence,
  useList,
  useSelf,
  useCanRedo,
  useCanUndo,
  useHistory,
} = createRoomContext(client);
