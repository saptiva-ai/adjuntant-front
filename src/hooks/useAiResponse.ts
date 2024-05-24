import fetcher from "@/swr/fetcher"
import { useEffect } from "react"
import useSWR from "swr"

type AiResponse = {
  response: string
}

/**
 * @summary Syncs ai response when the ui
 * @param query
 * @param shouldFetch If the fetch should execute
 * @param onFetchedSuccess A handler to call when the fetch is succesful
 * @param
 * @returns
 */
export default function useAiResponse(
  query: string,
  shouldFetch: boolean,
  onFetchedSuccess: (response: string) => void,
  onFetchError: (error: unknown) => void,
) {
  const { data, error } = useSWR<AiResponse>(
    shouldFetch ? `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/query/1` : null,
    fetcher,
  )

  useEffect(() => {
    if (shouldFetch && !error && data) {
      onFetchedSuccess(data.response)
    }

    if (shouldFetch && error) {
      onFetchError(error)
    }
  }, [shouldFetch, onFetchedSuccess, onFetchError, error, data])
}
