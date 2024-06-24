export default function fetcher(url: string, options: RequestInit) {
  return fetch(url, options).then(res => res.json());
}
