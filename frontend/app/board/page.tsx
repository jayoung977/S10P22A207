"use client";
import Navbar from "@/app/Navbar";
import BoardList from "./BoardList";
import PeacefulBgm from "@/public/src/components/PeacefulBgm";
import { useQuery, QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function page() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="grid grid-rows-12 h-screen">
        <PeacefulBgm></PeacefulBgm>
        <Navbar />
        <BoardList />
      </div>
    </QueryClientProvider>
  );
}
