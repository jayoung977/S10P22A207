import Image from "next/image";
import chart from "../../../../../public/src/assets/images/chart-sample-image.png";
export default function SingleChart() {
  return (
    <div className="shadow flex justify-center items-center col-span-6">
      <Image src={chart} alt=""></Image>
    </div>
  );
}
