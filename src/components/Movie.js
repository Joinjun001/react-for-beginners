import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "../css/Movie.module.css";

function Movie({ id, coverImg, title }) {
  return (
    <div className={styles.cover_img}>
      <Link to={`/movie/${id}`}>
        <img src={coverImg} alt={title} />
      </Link>
      <h3 className={styles.title}>{title}</h3>
    </div>
  );
}

Movie.propTypes = {
  id: PropTypes.number.isRequired,
  coverImg: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Movie;
