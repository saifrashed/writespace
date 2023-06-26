// From https://rapidapi.com/dnaber/api/languagetool.
import axios from 'axios';

async function languageTool(language: string, text: string) {
  const encodedParams = new URLSearchParams();
  encodedParams.set('text', text);
  encodedParams.set('language', language);

  const options = {
    method: 'POST',
    url: 'https://dnaber-languagetool.p.rapidapi.com/v2/check',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'X-RapidAPI-Key': '768772c37emshe0f4cdf6e755690p12a27ajsn0607616b9290',
      'X-RapidAPI-Host': 'dnaber-languagetool.p.rapidapi.com'
    },
    data: encodedParams,
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default languageTool;