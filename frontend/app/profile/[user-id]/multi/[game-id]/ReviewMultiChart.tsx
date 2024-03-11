import chart from "../../../../../public/src/assets/images/chart-sample-image.png";
import Image from "next/image";

export default function MultiChart() {
  return (
    <div className="col-start-6 col-end-12">
      <Image src={chart} alt=""></Image>
    </div>
  );
}
