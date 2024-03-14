import MultiPlay from "./multigame";


export async function generateStaticParams(){
  return [{ game_id: "1" }].map((param) => param.game_id);
}

export default function Page({ params }: { params: { game_id: string } }) {
  const { game_id } = params
  return <MultiPlay/>;
}