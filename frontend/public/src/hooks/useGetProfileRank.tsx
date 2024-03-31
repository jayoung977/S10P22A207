import bronze from "@/public/src/assets/images/Tier/bronze.png";
import silver from "@/public/src/assets/images/Tier/silver.png";
import gold from "@/public/src/assets/images/Tier/gold.png";
import platinum from "@/public/src/assets/images/Tier/platinum.png";
import diamond from "@/public/src/assets/images/Tier/diamond.png";
import master from "@/public/src/assets/images/Tier/master.png";
import challenger from "@/public/src/assets/images/Tier/challenger.png";

export default function useGetProfileRank(rankPoint: any) {
  if (rankPoint < 100) {
    return bronze;
  } else if (rankPoint < 200) {
    return silver;
  } else if (rankPoint < 300) {
    return gold;
  } else if (rankPoint < 400) {
    return platinum;
  } else if (rankPoint < 500) {
    return diamond;
  } else if (rankPoint < 600) {
    return master;
  } else return challenger;
}
