import axios from "axios";
import { useEffect } from "react";

type AiResponse = {
  response: string;
};

interface FetcherParams {
  url: string;
  text: string;
  userEmail: string;
  userMessage: string;
  modelName: string;
  sysPrompt: string;
  newTokens: number;
}

const fetcherWithArgs = async ({
  url,
  text,
  userEmail,
  userMessage,
  modelName,
  sysPrompt,
  newTokens,
}: FetcherParams): Promise<any> => {
  const response = await axios.post(url, {
    modelName,
    newTokens,
    sysPrompt,
    text,
    userEmail,
    userMessage,
  });
  return response.data;
};

export default function useAiResponse({
  text,
  userEmail,
  userMessage,
  modelName,
  sysPrompt,
  newTokens,
  shouldFetch,
  onFetchedSuccess,
  onFetchError,
}: {
  text: string;
  userEmail: string;
  userMessage: string;
  modelName: string;
  sysPrompt: string;
  newTokens: number;
  shouldFetch: boolean;
  onFetchedSuccess: (response: string) => void;
  onFetchError: (error: unknown) => void;
}): void {
  useEffect(() => {
    const fetchData = async () => {
      if (shouldFetch && userMessage) {
        try {
          const data = await fetcherWithArgs({
            modelName,
            newTokens,
            sysPrompt,
            text,
            url: "http://44.211.22.3:8000/api/chat",
            userEmail,
            userMessage,
          });
          onFetchedSuccess(data.response);
        } catch (error) {
          onFetchError(error);
        }
      }
    };

    fetchData();
  }, [
    shouldFetch,
    text,
    userEmail,
    userMessage,
    modelName,
    sysPrompt,
    newTokens,
    onFetchedSuccess,
    onFetchError,
  ]);
}
