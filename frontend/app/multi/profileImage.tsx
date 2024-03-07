import Image from "next/image"
import Profile from '@/public/src/assets/images/profile-image.png'

export default function ProfileImage(){
  return(
    <div className="bg-blue-400 col-span-3">
      <Image
        src={Profile}
        alt="profile-image"
        />
      <div>개미는차갑다</div>
    </div>
  )
}