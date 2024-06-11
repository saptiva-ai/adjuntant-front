import axios from 'axios';
import { useEffect } from 'react';

type AiResponse = {
  response: string;
};

interface FetcherParams {
  url: string;
  userEmail: string;
  userMessage: string;
  modelName: string;
  sysPrompt: string;
  newTokens: number;
}

const fetcherWithArgs = async ({
  url,
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
    userEmail,
    userMessage,    
  });
  return response.data;
};

export default function useAiResponse({
  modelName,
  newTokens,
  shouldFetch,
  userEmail,
  userMessage,  
  onFetchedSuccess,
  onFetchError,
}: {
  modelName: string;
  newTokens: number;
  shouldFetch: boolean;
  userEmail: string;
  userMessage: string;
  
  onFetchedSuccess: (response: string) => void;
  onFetchError: (error: unknown) => void;
}): void {
  useEffect(() => {
    const fetchData = async () => {
      if (shouldFetch && userEmail && userMessage) {
        try {
          const data = await fetcherWithArgs({
            modelName,
            newTokens,
            sysPrompt: "System prompt text here",
            url: 'http://44.211.22.3:8000/api/chat',
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
  }, [shouldFetch, userMessage, userEmail, modelName, newTokens, onFetchedSuccess, onFetchError]);
}
