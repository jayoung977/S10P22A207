'use client'

import Navbar from "@/app/Navbar";
import { QueryClient, QueryClientProvider } from "react-query";
import InprogressFundDetail from "./InprogressFundDetail";

const queryClient = new QueryClient();

export default function Page(){
  return(
    <QueryClientProvider client={queryClient}>
    <div className='relative bg-background-1'>
      <div className="grid grid-rows-12 h-screen border-separate" >
        <Navbar/>
        <InprogressFundDetail/>
      </div>
    </div>
    </QueryClientProvider>
  )
}