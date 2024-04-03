"use client";
import React from "react";
import { HeroParallax } from "../public/src/components/ui/hero-parallax";
import community from "@/public/src/assets/images/Landing/community.png";
import fundCreate from "@/public/src/assets/images/Landing/fundCreate.png";
import fundLobby from "@/public/src/assets/images/Landing/fundLobby.png";
import multiIngame from "@/public/src/assets/images/Landing/multiIngame.png";
import multiLobby from "@/public/src/assets/images/Landing/multiLobby.png";
import multiWaiting from "@/public/src/assets/images/Landing/multiWaiting.png";
import profile from "@/public/src/assets/images/Landing/profile.png";
import profileFriend from "@/public/src/assets/images/Landing/profileFriend.png";
import singleIngame from "@/public/src/assets/images/Landing/singleIngame.png";
import singleResult from "@/public/src/assets/images/Landing/singleResult.png";
import quiz from "@/public/src/assets/images/Landing/quiz.png";
import fundDetail from "@/public/src/assets/images/Landing/fundDetail.png";
import chartRsi from "@/public/src/assets/images/Landing/chartRsi.png";
import chartMacd from "@/public/src/assets/images/Landing/chartMacd.png";
import tradeBuy from "@/public/src/assets/images/Landing/tradeBuy.png";
import tradeSell from "@/public/src/assets/images/Landing/tradeSell.png";
import shortBuy from "@/public/src/assets/images/Landing/shortBuy.png";
import shortSell from "@/public/src/assets/images/Landing/shortSell.png";
import chatting from "@/public/src/assets/images/Landing/chatting.png";
import multiProfile from "@/public/src/assets/images/Landing/multiProfile.png";
import boardDetail from "@/public/src/assets/images/Landing/boardDetail.png";
import chartTotal from "@/public/src/assets/images/Landing/chartTotal.png";

export function LandingPage() {
  return <HeroParallax products={products} />;
}
export const products = [
  {
    title: "shortSell",
    link: "https://samsung.com",
    thumbnail: shortSell,
  },
  {
    title: "shortBuy",
    link: "https://samsung.com",
    thumbnail: shortBuy,
  },
  {
    title: "tradeBuy",
    link: "https://samsung.com",
    thumbnail: tradeBuy,
  },
  {
    title: "tradeSell",
    link: "https://samsung.com",
    thumbnail: tradeSell,
  },
  {
    title: "chartTotal",
    link: "https://samsung.com",
    thumbnail: chartTotal,
  },

  {
    title: "fundDetail",
    link: "https://samsung.com",
    thumbnail: fundDetail,
  },
  {
    title: "fundCreate",
    link: "https://samsung.com",
    thumbnail: fundCreate,
  },
  {
    title: "fundLobby",
    link: "https://samsung.com",
    thumbnail: fundLobby,
  },
  {
    title: "chartRsi",
    link: "https://samsung.com",
    thumbnail: chartRsi,
  },
  {
    title: "chartMacd",
    link: "https://samsung.com",
    thumbnail: chartMacd,
  },

  {
    title: "profile",
    link: "https://samsung.com",
    thumbnail: profile,
  },
  {
    title: "profileFriend",
    link: "https://samsung.com",
    thumbnail: profileFriend,
  },
  {
    title: "quiz",
    link: "https://samsung.com",
    thumbnail: quiz,
  },
  {
    title: "community",
    link: "https://samsung.com",
    thumbnail: community,
  },
  {
    title: "boardDetail",
    link: "https://samsung.com",
    thumbnail: boardDetail,
  },
];
