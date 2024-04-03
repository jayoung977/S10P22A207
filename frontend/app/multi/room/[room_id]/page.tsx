"use client";
import ChartImage from "./chartImage";
import Chat from "./chat";
import FriendSearch from "./friendSearch";
import GameRule from "./gameRule";
import Header from "./header";
import GameMembers from "./GameMembers";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function page() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="grid grid-rows-12 h-screen border-separate">
        <Header />
        <div className="row-start-2 row-end-13 grid grid-cols-12 border">
          <aside className="col-span-3 grid grid-rows-6 text-center">
            <FriendSearch />
            <GameRule />
          </aside>
          <main className="col-span-6 grid grid-rows-12">
              <ChartImage />
              <div className="row-span-3">
              <Chat />
              </div>
          </main>
          <GameMembers />
        </div>
      </div>
    </QueryClientProvider>
  );
}
