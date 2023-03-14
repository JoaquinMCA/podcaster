import { Link, useParams } from "react-router-dom";

function PodcastDetails() {
  const params = useParams();

  return (
    <div>
      <Link to={`.`}>Podcast-details: {params.podcastId}</Link>
    </div>
  );
}

export default PodcastDetails;
