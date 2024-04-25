import Supabase from "./Supabase";

const database = Supabase.database;

const getUserData = async () => {
  let user;
  let userData;
  await database.auth.getUser().then((value) => {
    if (value.data?.user) {
      user = value.data.user;
    } else {
      return user;
    }
  });
  const { data: todoList, error } = await Supabase.database
    .from("todo_table")
    .select("*")
    .eq("email", user.email)
    .order("date");
  if (error) {
    throw error;
  }
  userData = todoList;
  return { user, userData };
};

export default getUserData;
