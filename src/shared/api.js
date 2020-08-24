import fetch from 'isomorphic-fetch';
export function fetchPopularRepos (language = 'all') {
  const params = [
    `q=start:>1+language:${language}`,
    "sort=stars",
    "order=desc",
    "type=Repositories"
  ];
  const url = `https://api.github.com/search/repositories?${ params.join('&') }`;
  const encodedURI = encodeURI(url);

  return fetch(encodedURI)
    .then((data) => data.json())
    .then((repos) => repos.items)
    .catch((error) => {
      console.warn(error);
      return null;
    });
}