import Image from "next/image"
import Profile from '@/public/src/assets/images/penguin.png'

export default function ProfileImage(){
  return(
    <div className="flex justify-around">
      <Image
        src={Profile}
        alt="profile-image"
        width={20}
        height={20}
        className="rounded-full"
        />
      <h5 className="mb-1 text-sm font-medium text-gray-900 dark:text-white">개미는 차갑다</h5>
    </div>
  )
}