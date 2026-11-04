import usePosts from "./hooks/usePosts"

export default function App() {
  const {data: posts, isLoading, error} = usePosts();

  return (
    <>
      {isLoading 
        ? <div>Loading...</div>
        : error
        ? <p>Error !!</p>
        : posts?.map(post => (
          <article key={post.id}>
            <h2>{post.username}</h2>
            <p>{post.content}</p>
          </article>
        ))
      }
    </>
  )
}
