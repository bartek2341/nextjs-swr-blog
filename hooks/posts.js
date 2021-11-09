import useSWR from "swr";
import { fetcher } from "lib/index";
import useSWRInfinite from "swr/infinite";
import { PAGE_SIZE } from "@/data/index";

export function useInfinitePosts(initPosts) {
  const getKey = (pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.length) return null;
    return `/api/posts?limit=${PAGE_SIZE}&page=${pageIndex + 1}`;
  };

  const { data, error, mutate, size, setSize } = useSWRInfinite(
    (...args) => getKey(...args),
    fetcher,
    { fallbackData: initPosts, revalidateOnFocus: false, revalidateAll: true }
  );
  return { data, error, mutate, size, setSize };
}

export function useInfiniteDatePosts(initPosts, date) {
  const getKey = (pageIndex, previousPageData, date) => {
    if (previousPageData && !previousPageData.length) return null;
    return `/api/posts?date=${date}&limit=${PAGE_SIZE}&page=${pageIndex + 1}`;
  };

  const { data, error, mutate, size, setSize } = useSWRInfinite(
    (...args) => getKey(...args, date),
    fetcher,
    { revalidateOnFocus: false, fallbackData: initPosts, revalidateAll: true }
  );
  return { data, error, mutate, size, setSize };
}

export function useInfiniteTopPosts(initPosts) {
  const getKey = (pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.length) return null;
    return `/api/posts/top100?limit=${PAGE_SIZE}&page=${pageIndex + 1}`;
  };

  const { data, error, mutate, size, setSize } = useSWRInfinite(
    (...args) => getKey(...args),
    fetcher,
    { fallbackData: initPosts, revalidateOnFocus: false, revalidateAll: true }
  );
  return { data, error, mutate, size, setSize };
}

export function usePost(initPost) {
  const { data, mutate } = useSWR(`/api/posts/${initPost._id}`, fetcher, {
    fallbackData: initPost,
    revalidateOnFocus: false,
  });
  return [data, { mutate }];
}
