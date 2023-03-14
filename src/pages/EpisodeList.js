import { Link } from "react-router-dom";

function EpisodeList() {
  const mockEpisodes = [
    { id: 1, name: "Episode-1" },
    { id: 2, name: "Episode-2" },
    { id: 3, name: "Episode-3" },
  ];

  return (
    <>
      <h2>Episodes: {mockEpisodes.length}</h2>
      <ul>
        {mockEpisodes.map((episode) => (
          <li key={episode.id}>
            <Link to={`episode/${episode.id}`}>{episode.name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default EpisodeList;
