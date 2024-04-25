import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://hgcytgchoxzdxuvwpoym.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhnY3l0Z2Nob3h6ZHh1dndwb3ltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMyNTE4NzMsImV4cCI6MjAyODgyNzg3M30.iAOJpOxv35mey1UYUD_CAKROMyPJnnheOeNQgK2gA_4";
const database = createClient(supabaseUrl, supabaseKey);

export default { database };
