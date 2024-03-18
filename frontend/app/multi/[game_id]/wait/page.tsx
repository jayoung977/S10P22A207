import MultiWait from "./MultiWait";

export async function generateStaticParams() {
  // 반환 값을 객체 대신 문자열 배열로 변경
  return [{ game_id: "1" }].map((param) => param.game_id);
}

export default function Page({ params }: { params: { game_id: string } }) {
  const { game_id } = params;
  return <MultiWait />;
}