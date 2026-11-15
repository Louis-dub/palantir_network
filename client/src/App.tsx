import { useEffect } from "react";
import Header from "./components/Header";
import LoginForm from "./components/LoginForm";
import PostsFeed from "./components/PostsFeed";
import { useAuth } from "./contexts/AuthContext";

export default function App() {
  const {user} = useAuth();

  useEffect(() => {
    document.documentElement.dataset.theme = user?.race.toLocaleLowerCase() || "general";
  }, [user]);

  return (
    <>
      {user
        ? (<>
            <Header />
            <main>
              <PostsFeed />
            </main>
          </>)
        : <LoginForm />}
    </>
  )
}
