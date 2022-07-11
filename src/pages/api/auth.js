import { authorize } from "@liveblocks/node";

const secret = import.meta.env.VITE_API_KEY;

export default async function auth(req, res) {
  /**
   * Implement your own security here.
   *
   * It's your responsibility to ensure that the caller of this endpoint
   * is a valid user by validating the cookies or authentication headers
   * and that it has access to the requested room.
   */
  const room = req.body.room;
  const result = await authorize({
    room,
    secret,
    userId: "123", // Optional
    userInfo: {
      // Optional
      name: "Ada Lovelace",
    },
  });
  return res.status(result.status).end(result.body);
}
