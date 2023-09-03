import axios from "axios";

const HERE_API_KEY = process.env.REACT_APP_HERE_API_KEY;

const HERE_API_URL = "https://autocomplete.geocoder.ls.hereapi.com/6.2/suggest.json";

const fetchLocationSuggestions = async (query) => {
  try {
    const response = await axios.get(HERE_API_URL, {
      params: {
        apiKey: HERE_API_KEY,
        query: query,
        maxresults: 5, // Adjust the number of suggestions as needed
      },
    });

    // Extract and return the location suggestions from the response
    return response.data.suggestions;
  } catch (error) {
    console.error("Error fetching location suggestions:", error);
    return [];
  }
};

export default fetchLocationSuggestions;
