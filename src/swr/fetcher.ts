export default function fetcher(...args: unknown[]) {
  // @ts-ignore
  return fetch(...args).then(res => res.json())
}
