import Image from "next/image"
import Profile from '@/public/src/assets/images/profile-image.png'

export default function ProfileImage(){
  return(
    <div className="col-span-4">
      <Image
        src={Profile}
        alt="profile-image"
        className="w-24 h-24 mb-3 rounded-full shadow-lg"
        />
      <h5 className="mb-1 text-sm font-medium text-gray-900 dark:text-white">개미는 차갑다</h5>
    </div>
  )
}