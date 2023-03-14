import { Link } from "react-router-dom";

function PodcastList() {
  const mockPodcasts = [
    { id: 1, name: "Podcast-1" },
    { id: 2, name: "Podcast-2" },
    { id: 3, name: "Podcast-3" },
  ];
  return (
    <>
      <section>Podcast-list</section>
      <ul>
        {mockPodcasts.map((podcast) => (
          <li key={podcast.id}>
            <Link to={`podcast/${podcast.id}`}>{podcast.name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default PodcastList;
