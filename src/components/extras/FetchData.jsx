import Supabase from "./Supabase";

const database = Supabase.database;

const fetchData = async (user) => {
  const { data: todoList, error } = await database
    .from("todo_table")
    .select("*")
    .eq("email", user.email)
    .order("date")
    .order("time");
  if (error) {
    throw error;
  }
  return todoList;
};

export default fetchData;
