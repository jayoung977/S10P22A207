"use client";
import Navbar from "@/app/Navbar";
import BoardList from "./BoardList";
import PeacefulBgm from "@/public/src/components/bgm/PeacefulBgm";
import { useQuery, QueryClient, QueryClientProvider } from "react-query";
import WaitingBgm from "@/public/src/components/bgm/WaitingBgm";

const queryClient = new QueryClient();

export default function page() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="grid grid-rows-12 h-screen">
        <WaitingBgm></WaitingBgm>
        <Navbar />
        <BoardList />
      </div>
    </QueryClientProvider>
  );
}
