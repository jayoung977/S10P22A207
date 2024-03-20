"use client";
import { QueryClient, QueryClientProvider } from "react-query";
import SignUp from "./SignUp";

const queryClient = new QueryClient();

export default function page() {
  return (
    <QueryClientProvider client={queryClient}>
      <SignUp></SignUp>
    </QueryClientProvider>
  );
}
