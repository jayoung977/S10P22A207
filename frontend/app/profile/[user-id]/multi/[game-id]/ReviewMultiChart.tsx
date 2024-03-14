import chart from "../../../../../public/src/assets/images/chart-sample-image.png";
import Image from "next/image";

export default function MultiChart() {
  return (
    <div className="flex justify-center items-center col-start-6 col-end-11 grid-rows-12">
      <div className="bg-white p-4 shadow-lg hover:-translate-y-1 transition ease-in-out duration-500 row-span-8">
        <Image src={chart} alt=""></Image>
      </div>
    </div>
  );
}
