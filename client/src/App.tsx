import { useEffect, useState } from "react";
import Header from "./components/Header";
import LoginForm from "./components/LoginForm";
import { useAuth } from "./contexts/useAuth";
import RegisterForm from "./components/RegisterForm";
import CreatePost from "./components/CreatePost";
import { PostsAll } from "./components/PostsFeed";

export default function App() {
  const {user} = useAuth();
  const [form, setForm] = useState<"login" | "register">("login");

  useEffect(() => {
    document.documentElement.dataset.theme = user?.race.toLocaleLowerCase() || "general";
  }, [user]);

  return (
    <>
      {user
        ? (<>
            <Header />
            <main>
              <PostsAll />
              <CreatePost />
            </main>
          </>)
        : form === "login"
        ? <LoginForm onShowRegister={() => setForm("register")} />
        : <RegisterForm onShowLogin={() => setForm("login")} />}
    </>
  )
}
