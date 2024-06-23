import { useState, useEffect } from "react";
import { apiKeyItem } from "./storageItems";

export const Popup = () => {
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    apiKeyItem.getValue().then(setApiKey)
  }, [])

  const applyApiKeyChange = async () => {
    await apiKeyItem.setValue(apiKey)
  }

  return (
    <input value={apiKey} onChange={e => setApiKey(e.target.value)} onBlur={applyApiKeyChange} placeholder='GOOGLE_GENERATIVE_AI_API_KEY' />
  );
}
