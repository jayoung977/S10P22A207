import Image from "next/image";
import chart from "../../../../../public/src/assets/images/chart-sample-image.png";
export default function SingleChart() {
  return (
    <div className="flex justify-center items-center col-span-6 m-4 bg-white rounded-md">
      <Image src={chart} alt=""></Image>
    </div>
  );
}
