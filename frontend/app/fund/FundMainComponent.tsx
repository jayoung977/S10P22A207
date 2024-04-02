"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import MakeFundModal from "./makeFundModal";
import { QueryClient, QueryClientProvider } from "react-query";
import useClickSound from "@/public/src/components/clickSound/DefaultClick";
import { Boxes } from "@/public/src/components/ui/background-boxes";
import { cn } from "@/public/src/utils/cn";
const queryClient = new QueryClient();

export default function FundMainComponent() {
  const playClickSound = useClickSound();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <QueryClientProvider client={queryClient}>
      <div className="row-span-4 grid grid-cols-12 border">
        <div className="col-span-8 relative w-full overflow-hidden bg-small-1 flex flex-col items-center justify-center rounded-lg ">
          <div className="absolute inset-0 w-full bg-small-1 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
          <Boxes />
          <h1 className={cn("md:text-4xl text-xl text-white relative z-20")}>
            함께할 때 우리는 더 강해진다.
          </h1>
          <p className="text-center mt-2 text-white relative z-20">
            Expanding Investment Capabilities with Fund.
          </p>
        </div>
        <div className="col-span-4 grid grid-rows-4 border text-center p-2">
          <div className="row-start-2 row-span-3">
            <div>"안정적인 미래를 위해 펀드를 개설하세요"</div>
            <button
              onClick={() => {
                playClickSound();
                setIsOpen(true);
              }}
              className="bg-button-1 text-textColor-2 m-2 p-2 rounded-md font-bold"
            >
              펀드 개설
            </button>
          </div>
        </div>
        <MakeFundModal
          isOpen={isOpen}
          onClose={() => {
            setIsOpen(false);
          }}
        />
      </div>
    </QueryClientProvider>
  );
}
