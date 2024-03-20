"use client";
import IsSignUpInfo from "./IsSignUpInfo";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function page() {
  return (
    <QueryClientProvider client={queryClient}>
      <IsSignUpInfo></IsSignUpInfo>
    </QueryClientProvider>
  );
}
