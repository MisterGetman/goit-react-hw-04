import axios from "axios";

axios.defaults.baseURL = "https://api.unsplash.com/search/photos";
axios.defaults.headers.common["Authorization"] =
  "Client-ID 6wt2Jw_rLmADQKKGfnTbYCI50cWC8I-rzHp0Urb2F9s";
axios.defaults.params = {
  per_page: 20,
  orientation: "landscape",
};

export const getImages = async (query, page) => {
  const { data } = await axios.get(`?query=${query}&page=${page}`);

  return data;
};
