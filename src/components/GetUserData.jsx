import Supabase from "./Supabase";

const database = Supabase.database;

const getUserData = async () => {
  let data;
  let user;
  let logInPic;
  const toggleLogOut = (loginBtn) => {
    if (loginBtn === "") {
      loginBtn = (
        <a
          className="pr-2 pl-2 pb-1 md:pb-0 md:pl-0 font-semibold"
          href="/logout"
        >
          Logout
        </a>
      );
    } else {
      loginBtn = "";
    }
  };
  await database.auth.getUser().then((value) => {
    if (value.data?.user) {
      user = value.data.user;
    } else {
      return user;
    }
  });
  return { user };
};

export default getUserData;
