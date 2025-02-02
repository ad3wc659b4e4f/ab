import { getEdgeConfig, setEdgeConfig } from "@vercel/edge-config";

const COUNTER_KEY = "visitCount";

export default async function handler(req, res) {
  try {
    let currentCount = parseInt((await getEdgeConfig(COUNTER_KEY)) || 0);
    currentCount += 1;

    await setEdgeConfig(COUNTER_KEY, currentCount.toString());

    return res.status(200).json({ count: currentCount });
  } catch (error) {
    console.error("Error updating count:", error);
    return res.status(500).json({ error: "Failed to update visit count" });
  }
}
