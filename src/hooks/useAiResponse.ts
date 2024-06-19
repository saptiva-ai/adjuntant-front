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
  file?: File;
}

const fetcherWithArgs = async ({
  url,
  userEmail,
  userMessage,
  modelName,
  sysPrompt,
  newTokens,
  file,
}: FetcherParams): Promise<any> => {
  const formData = new FormData();
  formData.append('modelName', modelName);
  formData.append('newTokens', newTokens.toString());
  formData.append('sysPrompt', sysPrompt);
  formData.append('userEmail', userEmail);
  formData.append('userMessage', userMessage);
  if (file) {
    formData.append('file', file);
  }

  const response = await axios.post(url, formData, {
    headers: {
      'Content-Type': 'mutipart-form-data',
    },
  });
  return response.data;
};

export default function useAiResponse({
  file,
  modelName,
  newTokens,
  shouldFetch,
  sysPrompt,
  userEmail,
  userMessage,  
  onFetchedSuccess,
  onFetchError,
}: {
  file?: File;
  modelName: string;
  newTokens: number;
  shouldFetch: boolean;
  sysPrompt: string,
  userEmail: string;
  userMessage: string;
  
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
  }, [shouldFetch, userMessage, userEmail, modelName, newTokens, sysPrompt, file, onFetchedSuccess, onFetchError]);
}
