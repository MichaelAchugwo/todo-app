import Supabase from "./Supabase";

let userData;

export async function fetchData() {
  try {
    const { data: todoList, error } = await Supabase.database
      .from("todo_table")
      .select("*")
      .eq("email", user.email)
      .order("date");
    if (error) {
      throw error;
    }
    userData = todoList;
  } catch (error) {
    alert("ERROR! Check your internet connection");
    console.error("Error fetching data:", error.message);
  }
  return { userData };
}