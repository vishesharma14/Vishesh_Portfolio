/**
 * Master switch for the AI chatbot entry points. Off until the chat panel and /api/chat exist
 * (roadmap Step 21), so nothing on the site looks clickable without working. Typed as boolean
 * so the code behind the switch stays type-checked while it's off.
 */
export const CHATBOT_ENABLED = false as boolean
