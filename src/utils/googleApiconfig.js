import { useState, useEffect } from 'react';
import { message } from 'antd';


const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const API_KEY = process.env.REACT_APP_API_KEY;
const SCOPE = process.env.REACT_APP_SCOPE;

const useGoogleApi = () => {
  const [gapiInited, setGapiInited] = useState(false);
  const [gisInited, setGisInited] = useState(false);
  const [tokenClient, setTokenClient] = useState(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://apis.google.com/js/api.js";
    script.onload = gapiLoaded;
    document.body.appendChild(script);

    const gisScript = document.createElement('script');
    gisScript.src = "https://accounts.google.com/gsi/client";
    gisScript.onload = gisLoaded;
    document.body.appendChild(gisScript);
  }, []);

  function gapiLoaded() {
    window.gapi.load('client', initializeGapiClient);
    window.gapi.load('picker'); // Load the Picker API
  }

  async function initializeGapiClient() {
    try {
      await window.gapi.client.init({
        apiKey: API_KEY,
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
      });
      setGapiInited(true);
    } catch (err) {
      message.error('Failed to initialize Google API.');
    }
  }

  function gisLoaded() {
    const newTokenClient = window.google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPE,
      callback: '', // defined later
    });
    setTokenClient(newTokenClient);
    setGisInited(true);
  }

  return { gapiInited, gisInited, tokenClient };
};

export { useGoogleApi, CLIENT_ID, API_KEY, SCOPE };