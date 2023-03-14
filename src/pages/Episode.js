import { useParams } from "react-router-dom";

function Episode() {
  const params = useParams();

  return <div>Episode: {params.episodeId}</div>;
}

export default Episode;
