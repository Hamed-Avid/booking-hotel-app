import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function useFetch(url, query = "") {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () =>
      await axios
        .get(`${url}?${query}`, { signal: controller.signal })
        .then(({ data }) => setData(data))
        .catch(
          (err) => err.code !== "ERR_CANCELED" && toast.error(err?.message)
        )
        .finally(() => setIsLoading(false));

    fetchData();

    return () => controller.abort();
  }, [query, url]);

  return { isLoading, data };
}
