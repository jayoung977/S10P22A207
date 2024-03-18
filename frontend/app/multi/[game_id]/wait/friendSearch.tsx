import SearchBar from '../../searchBar'
import Friend from './friend'

export default function FriendSearch() {
  return (
    <div className="row-span-3 border-e grid grid-rows-6">
      <div className='row-span-1 flex justify-center border-b gap-2 items-center'>
        <div>친구초대</div>
        <SearchBar/>
      </div>
      <div className='overflow-auto row-span-5' style={{height: 'calc(35vh)'}}>
        <Friend/>
        <Friend/>
        <Friend/>
        <Friend/>
        <Friend/>
      </div>
    </div>
  )
}
