import { formatDistanceToNowStrict } from "date-fns";

export const formatTimeAgo = (date) => {
  const result = formatDistanceToNowStrict(new Date(date));
  return result
    .replace(" seconds", "s")
    .replace(" second", "s")
    .replace(" minutes", "m")
    .replace(" minute", "m")
    .replace(" hours", "h")
    .replace(" hour", "h")
    .replace(" days", "d")
    .replace(" day", "d")
    .replace(" months", "mo")
    .replace(" month", "mo")
    .replace(" years", "y")
    .replace(" year", "y") + " ago";
};

export const getGreeting = () => {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) {
    return {
      text: "Good Morning",
      emoji: "☀️",
    };
  }

  if (hour >= 12 && hour < 17) {
    return {
      text: "Good Afternoon",
      emoji: "🌤️",
    };
  }

  if (hour >= 17 && hour < 21) {
    return {
      text: "Good Evening",
      emoji: "🌇",
    };
  }

  return {
    text: "Good Night",
    emoji: "🌙",
  };
};

export const isValidConnection = (source, target) => {
   // Trigger cannot come after another node
   if (
      target.type === "manual" ||
      target.type === "webhook"
   )
      return false;

   // Response cannot connect to anything
   if (source.type === "response")
      return false;

   return true;
};
