import useFetch from "./useFetch";

export default function usePosts<T>(path: string) {
  return useFetch<T>(["articles"], path);
}
