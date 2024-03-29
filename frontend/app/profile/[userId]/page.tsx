"use client";
import Image from "next/image";
import styles from "./page.module.css";
import UserInfo from "./ProfileInfo";
import Navbar from "@/app/Navbar";
import PeacefulBgm from "@/public/src/components/bgm/PeacefulBgm";
import profileStore from "@/public/src/stores/profile/profileStore";
import { useQuery, QueryClient, QueryClientProvider } from "react-query";
import userStore from "@/public/src/stores/user/userStore";
import useFetchUserInfo from "@/public/src/hooks/useFetchUserInfo";
const queryClient = new QueryClient();

export default function page() {
  useFetchUserInfo();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="grid grid-rows-12 h-screen">
        <PeacefulBgm></PeacefulBgm>
        <Navbar></Navbar>
        <UserInfo></UserInfo>
      </div>
    </QueryClientProvider>
  );
}
