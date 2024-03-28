// import { useState, useEffect } from "react";
// import axios from "axios";

// export default function ProfileFriendRequest({
//   isOpen,
//   onClose,
//   friendRequests,
// }: any) {
//   //   if (!isOpen) return null;

//   const acceptFriendRequest = async (nickname: string) => {
//     // 친구 요청 수락 처리
//     console.log("수락");
//     await axios({
//       method: "post",
//       url: "https://j10a207.p.ssafy.io/api/friend-ask/accept",
//       headers: {
//         Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
//       },
//       data: { nickname },
//     });
//   };

//   const rejectFriendRequest = async (nickname: string) => {
//     // 친구 요청 거절 처리
//     await axios({
//       method: "delete",
//       url: `https://j10a207.p.ssafy.io/api/friend-ask/reject?nickname=${nickname}`,
//       headers: {
//         Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
//       },
//     });
//   };

//   return (
//     // <div className="modal">
//     //   <div className="modal-content">
//     //     <span className="close" onClick={onClose}>
//     //       &times;
//     //     </span>
//     //     <h2>친구요청 목록</h2>
//     //     <ul>
//     //       {friendRequests?.map((friend: any, index: any) => (
//     //         <li key={index}>
//     //           {friend.nickname} - 자산: {friend.assets} - 로그인 상태:{" "}
//     //           {friend.isLogin ? "온라인" : "오프라인"}
//     //           <button onClick={() => acceptFriendRequest(friend.nickname)}>
//     //             받기
//     //           </button>
//     //           <button onClick={() => rejectFriendRequest(friend.nickname)}>
//     //             안받기
//     //           </button>
//     //         </li>
//     //       ))}
//     //     </ul>
//     //   </div>
//     // </div>
//     <div class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
//       <div class="relative p-4 w-full max-w-2xl max-h-full">
//         <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
//           <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
//             <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
//               Static modal
//             </h3>
//             <button
//               type="button"
//               class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
//               data-modal-hide="static-modal"
//             >
//               <svg
//                 class="w-3 h-3"
//                 aria-hidden="true"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 14 14"
//               >
//                 <path
//                   stroke="currentColor"
//                   stroke-linecap="round"
//                   stroke-linejoin="round"
//                   stroke-width="2"
//                   d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
//                 />
//               </svg>
//               <span class="sr-only">Close modal</span>
//             </button>
//           </div>
//           <div class="p-4 md:p-5 space-y-4">
//             <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
//               With less than a month to go before the European Union enacts new
//               consumer privacy laws for its citizens, companies around the world
//               are updating their terms of service agreements to comply.
//             </p>
//             <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
//               The European Union’s General Data Protection Regulation (G.D.P.R.)
//               goes into effect on May 25 and is meant to ensure a common set of
//               data rights in the European Union. It requires organizations to
//               notify users as soon as possible of high-risk data breaches that
//               could personally affect them.
//             </p>
//           </div>
//           <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
//             <button
//               data-modal-hide="static-modal"
//               type="button"
//               class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//             >
//               I accept
//             </button>
//             <button
//               data-modal-hide="static-modal"
//               type="button"
//               class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
//             >
//               Decline
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
