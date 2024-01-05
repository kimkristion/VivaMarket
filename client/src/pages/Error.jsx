import { useRouteError } from "react-router-dom";
import { Link } from 'react-router-dom';

export default function Error() {
    const error = useRouteError();
    console.error(error);

  return (
    <div className="errorPage">
      <h1>Oops! Something went wrong.</h1>
      <p>We apologize for the inconvenience.</p>
      <Link to="/">Homepage</Link>
    </div>
  );
};

