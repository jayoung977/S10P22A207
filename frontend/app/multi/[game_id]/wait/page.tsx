import MultiWait from "./multigame"


export async function generateStaticParams(){
  return [{game_id: '1'}]
}


export default async function Page(params: {game_id: string}){
  const { game_id } = params
  return <MultiWait/>
}