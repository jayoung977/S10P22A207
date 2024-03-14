import Image from "next/image";
import chart from "../../../../../public/src/assets/images/chart-sample-image.png";
export default function SingleChart() {
  return (
    <div className="flex justify-center items-center col-span-6 m-4 bg-white rounded-md shadow-lg hover:-translate-y-1 transition ease-in-out duration-500">
      <Image src={chart} alt=""></Image>
    </div>
  );
}
