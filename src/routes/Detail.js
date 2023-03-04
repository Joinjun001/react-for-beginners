import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "../css/Detail.module.css";

function Detail() {
  const { id } = useParams();
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(true);
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    console.log(json.data.movie);
    setMovie(json.data.movie);
    setLoading(false);
  };

  useEffect(() => {
    getMovie();
  }, []);

  return (
    <div>
      {loading ? (
        <h1 className={styles.loading}>Loading...</h1>
      ) : (
        <div>
          <img className={styles.cover} src={movie.large_cover_image}></img>
          <h1 className={styles.title}>{movie.title}</h1>
          <h2 className={styles.description}>{movie.description_full}</h2>
        </div>
      )}
    </div>
  );
}

export default Detail;
