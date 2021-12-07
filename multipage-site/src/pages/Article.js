import { useEffect } from "react";
import { useParams, useHistory } from "react-router"
import { useFetch } from "../hooks/useFetch"

export default function Article() {
  const { id } = useParams()

  const url = 'http://localhost:3000/articles/' + id

  const { data: article, isPending, error } = useFetch(url)

  
  const history = useHistory()

  // redirect user if error is returned when fetching data
  useEffect(() => {
    if (error) {
      // after waiting 2 seconds, redirect the user home
      setTimeout(() => {
        history.push('/')
      }, 2000)
    }
  }, [error, history])  // outside variable or object used in an
                        // UseEffect function is a dependency 

  return (
    <div>
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {article && (
        <div>
          <h2>{article.title}</h2>
          <p>by {article.author}</p>
          <p>{article.body}</p>
        </div>
      )}
    </div>
  )
}
