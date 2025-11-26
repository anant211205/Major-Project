"use client";

import { useState } from "react";
import { toast } from "sonner";

type AsyncCallback<T> = (...args: any[]) => Promise<T>;

function useFetch<T>(cb: AsyncCallback<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const fn = async (...args: any[]) => {
    setLoading(true);
    setError(null);

    try {
      const response = await cb(...args);
      setData(response);
      return response;
    } catch (err: any) {
      setError(err);
      toast.error(err?.message || "Something went wrong");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fn, setData };
}

export default useFetch;
