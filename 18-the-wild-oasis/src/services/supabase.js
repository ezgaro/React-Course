import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://olbrdbmqzolzsaryikci.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9sYnJkYm1xem9senNhcnlpa2NpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY0Njk2NjEsImV4cCI6MjA0MjA0NTY2MX0.uJ5nkb1ntbTVrjnDUIf9Do41qmdvILnyxd578D6sP6s";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
