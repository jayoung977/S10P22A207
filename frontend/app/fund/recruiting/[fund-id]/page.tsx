'use client'

import Navbar from "@/app/Navbar";
import { QueryClient, QueryClientProvider } from "react-query";
import RecruitingFundDetail from "./RecruitingFundDetail";
import PeacefulBgm from "@/public/src/components/bgm/PeacefulBgm";

const queryClient = new QueryClient();

export default function Page(){
  return(
    <QueryClientProvider client={queryClient}>
      <div className='relative bg-background-1'>
        <div className="grid grid-rows-12 h-screen border-separate" >
          <PeacefulBgm></PeacefulBgm>
          <Navbar/>
          <RecruitingFundDetail/>
        </div>
      </div>
    </QueryClientProvider>
  )
}