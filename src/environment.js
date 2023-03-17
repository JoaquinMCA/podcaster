const dev = {
  corsUrl: "",
  podcastListUrl: "list/toppodcasts/limit=100/genre=1310/json",
  podcastEpisodesBaseUrl: "details/lookup?id=",
  podcastEpisodesParams: "&media=podcast&entity=podcastEpisode&limit=2000",
  parseFn: (data) => {
    return data;
  },
  responsesContentType: "application/json",
  production: false
};

const prod = {
  corsUrl: "https://api.allorigins.win/get?&url=",
  podcastListUrl:
    "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json",
  podcastEpisodesBaseUrl:
    "https://itunes.apple.com/lookup?id=",
  podcastEpisodesParams: "&media=podcast&entity=podcastEpisode&limit=2000",
  parseFn: (data) => {
    return JSON.parse(data.contents.trim());
  },
  responsesContentType: "text/plain",
  production: true
};

const environment = process.env.REACT_APP_STAGE === "prod" ? prod : dev;

export default {
  ...environment,
};
