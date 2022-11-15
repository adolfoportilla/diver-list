import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// NOTE: Changing this will create breaking changes in the Database
export const NUM_OF_DIVES = {
  BEGINNER: 1,
  INTERMEDIATE: 2,
  ADVANCED: 3,
};
export const DEEPEST_DIVE = {
  SHALLOW: 1,
  MEDIUM: 2,
  DEEP: 3,
};
export const LAST_DIVE = {
  LONG_TIME_AGO: 1,
  NOT_SO_RECENT: 2,
  RECENT: 3,
};

export const DEEPEST_TO_TEXT_MAPPING = {
  [NUM_OF_DIVES.BEGINNER]: "Shallow (<30ft)",
  [NUM_OF_DIVES.INTERMEDIATE]: "Medium (30-69ft)",
  [NUM_OF_DIVES.ADVANCED]: "Deep (+70ft)",
};
export const NUM_OF_DIVES_TO_TEXT_MAPPING = {
  [NUM_OF_DIVES.BEGINNER]: "Beginner (0-10)",
  [NUM_OF_DIVES.INTERMEDIATE]: "Intermediate (10-50)",
  [NUM_OF_DIVES.ADVANCED]: "Advanced (+50)",
};

export const LAST_DIVES_TO_TEXT_MAPPING = {
  [LAST_DIVE.LONG_TIME_AGO]: "O-1 months ago",
  [LAST_DIVE.NOT_SO_RECENT]: "1-6 months ago",
  [LAST_DIVE.RECENT]: "6+ months ago",
};

export default supabase;
