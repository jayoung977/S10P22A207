import dynamic from "next/dynamic";

const MultiPlay = dynamic(import('./MultiPlay'))
// import MultiPlay from "./MultiPlay";


export async function generateStaticParams(){
  return [{ game_id: "1" }].map((param) => param.game_id);
}

export default function Page({ params }: { params: { game_id: string } }) {
  const { game_id } = params
  return <MultiPlay/>;
}