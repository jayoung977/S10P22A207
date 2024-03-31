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
import ProfileFriendRequest from "./ProfileFriendRequest";
import ProfileSentFriendRequest from "./ProfileSentFriendRequest";
import ProfileBoardDetail from "./ProfileBoardDetail";
const queryClient = new QueryClient();

export default function page() {
  useFetchUserInfo();
  const { isBoardOpen, setIsBoardOpen } = profileStore();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="grid grid-rows-12 h-screen">
        <PeacefulBgm></PeacefulBgm>
        <Navbar></Navbar>
        {isBoardOpen && (
          <ProfileBoardDetail
            isBoardOpen={isBoardOpen}
            setIsBoardOpen={setIsBoardOpen}
          ></ProfileBoardDetail>
        )}
        <ProfileSentFriendRequest></ProfileSentFriendRequest>
        <ProfileFriendRequest></ProfileFriendRequest>
        <UserInfo></UserInfo>
      </div>
    </QueryClientProvider>
  );
}
