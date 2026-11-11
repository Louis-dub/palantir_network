import Header from "./components/Header";
import PostsFeed from "./components/PostsFeed";

export default function App() {
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-5xl px-4 pb-12">
        <PostsFeed />
      </main>
    </>
  )
}
