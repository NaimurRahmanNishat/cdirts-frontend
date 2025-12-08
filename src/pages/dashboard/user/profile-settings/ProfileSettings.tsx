import UpdateProfile from "@/components/dashboardHeader/UpdateProfile";
import Loading from "@/components/shared/Loading";
import { useGetCurrentUserQuery } from "@/redux/features/auth/authApi";
import { motion } from "framer-motion";



const ProfileSettings = () => {
  const {data, isLoading} = useGetCurrentUserQuery();

  if (isLoading) {
    return <Loading />;
  }

  if(!data?.data) {
    return <div>No user data found.</div>;
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      <UpdateProfile updateData={data?.data} />
    </motion.div>
  )
}

export default ProfileSettings;




// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useDispatch } from 'react-redux';
// import { User, Mail, Phone, CreditCard, MapPin, Briefcase, Shield, Camera, X } from 'lucide-react';
// import { useMemo, useState } from 'react';
// import { useEditProfileByIdMutation, useGetCurrentUserQuery } from '@/redux/features/auth/authApi';
// import { toast } from 'react-toastify';
// import { setUser } from '@/redux/features/auth/authSlice';
// import type { DivisionType, ImageType } from '@/types/authType';


// export interface IFormData {
//   name: string;
//   email: string;
//   phone: string;
//   zipCode: string;
//   profession: string;
//   division: DivisionType;
//   nidPic?: ImageType[];
//   avatar?: ImageType;
// }

// const ProfileSettings = () => {
//   const dispatch = useDispatch();
//   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
//   const [editProfile, { isLoading }] = useEditProfileByIdMutation();

//   const { data: currentUser } = useGetCurrentUserQuery();
// const user = currentUser?.data;
// console.log(user)
  
//   // NID image preview states
//   const [nidFrontPreview, setNidFrontPreview] = useState<string>("");
//   const [nidBackPreview, setNidBackPreview] = useState<string>("");
  
//   // Avatar preview state
//   const [avatarPreview, setAvatarPreview] = useState<string>("");

//   const initialFormData = useMemo<IFormData>(() => ({
//     name: user?.name || "",
//     email: user?.email || "",
//     phone: user?.phone || "",
//     zipCode: user?.zipCode || "",
//     profession: user?.profession || "",
//     division: user?.division || ("" as DivisionType),
//     nidPic: user?.nidPic || [],
//   }), [user]);

//   const [formData, setFormData] = useState<IFormData>(initialFormData);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   // Handle NID front side image upload
//   const handleNidFrontChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         const base64String = reader.result as string;
//         setNidFrontPreview(base64String);
        
//         // Update formData with front side image
//         const currentNidPic = formData.nidPic || [];
//         const newNidPic = [...currentNidPic];
//         newNidPic[0] = {
//           public_id: `nid_front_${Date.now()}`,
//           url: base64String
//         };
        
//         setFormData({
//           ...formData,
//           nidPic: newNidPic
//         });
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   // Handle NID back side image upload
//   const handleNidBackChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         const base64String = reader.result as string;
//         setNidBackPreview(base64String);
        
//         // Update formData with back side image
//         const currentNidPic = formData.nidPic || [];
//         const newNidPic = [...currentNidPic];
//         newNidPic[1] = {
//           public_id: `nid_back_${Date.now()}`,
//           url: base64String
//         };
        
//         setFormData({
//           ...formData,
//           nidPic: newNidPic
//         });
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   // Handle avatar image upload
//   const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       // File size validation (max 5MB)
//       if (file.size > 5 * 1024 * 1024) {
//         toast.error("Avatar size should be less than 5MB");
//         return;
//       }

//       const reader = new FileReader();
//       reader.onloadend = () => {
//         const base64String = reader.result as string;
//         setAvatarPreview(base64String);
        
//         // Update formData with avatar
//         setFormData({
//           ...formData,
//           avatar: {
//             public_id: `avatar_${Date.now()}`,
//             url: base64String
//           }
//         });
//       };
//       reader.readAsDataURL(file);
//     }
//   };


//   const handleOpenModal = () => {
//     setFormData({
//       name: user?.name || "",
//       email: user?.email || "",
//       phone: user?.phone || "",
//       zipCode: user?.zipCode || "",
//       profession: user?.profession || "",
//       division: user?.division || ("" as DivisionType),
//       nidPic: user?.nidPic || [],
//       avatar: user?.avatar,
//     });
//     setNidFrontPreview("");
//     setNidBackPreview("");
//     setAvatarPreview("");
//     setIsModalOpen(true);
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     const updateUser: any = {
//       name: formData.name,
//       email: formData.email,
//       phone: formData.phone,
//       zipCode: formData.zipCode,
//       profession: formData.profession,
//       division: formData.division,
//     };

//     // Only include nidPic if it has been updated
//     if (formData.nidPic && formData.nidPic.length > 0) {
//       updateUser.nidPic = formData.nidPic;
//     }

//     // Only include avatar if it has been updated
//     if (formData.avatar) {
//       updateUser.avatar = formData.avatar;
//     }

//     try {
//       const response = await editProfile({
//         id: user?._id || "",
//         ...updateUser
//       }).unwrap();
      
//       // Manually dispatch to ensure Redux state updates
//       dispatch(setUser(response?.data));
      
//       // Also update localStorage as backup
//       localStorage.setItem("user", JSON.stringify(response?.data));
      
//       toast.success("Profile updated successfully!");
//       setIsModalOpen(false);
      
//       // Force a small delay to ensure state is synced
//       setTimeout(() => {
//         window.dispatchEvent(new Event('storage'));
//       }, 100);
//     } catch (error: any) {
//       console.error(error);
//       toast.error(error?.data?.message || "Failed to update profile");
//     }
//   };

//   if(isLoading) return (
//     <div className="flex items-center justify-center h-screen">
//       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//     </div>
//   );

//   return (
//     <div className="py-12">
//       <div className="">
//         <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//           <div className="relative h-48 bg-linear-to-r from-blue-500 via-blue-600 to-cyan-500">
//             <div className="absolute inset-0 bg-black/10"></div>
//             <div className="absolute -bottom-16 left-8 sm:left-12">
//               <div className="relative">
//                 <div className="w-32 h-32 rounded-full border-4 border-white shadow-2xl overflow-hidden bg-white">
//                   {user?.avatar?.url ? (
//                     <img src={user.avatar.url} alt="avatar" className="w-full h-full object-cover" />
//                   ) : (
//                     <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-blue-500 to-cyan-500">
//                       <User className="w-16 h-16 text-white" />
//                     </div>
//                   )}
//                 </div>
//                 <button className="absolute bottom-0 right-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-blue-700 transition-all duration-200 transform hover:scale-110">
//                   <Camera className="w-5 h-5" />
//                 </button>
//               </div>
//             </div>
//           </div>

//           <div className="pt-20 px-8 sm:px-12 pb-8">
//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
//               <div>
//                 <h1 className="text-3xl font-bold text-slate-800 mb-2">{user?.name}</h1>
//                 <div className="flex items-center space-x-2">
//                   <Shield className="w-4 h-4 text-blue-600" />
//                   <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">{user?.role}</span>
//                 </div>
//               </div>
//               <button 
//                 type="button" 
//                 onClick={handleOpenModal}
//                 className="mt-4 cursor-pointer sm:mt-0 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-500 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
//               >
//                 Edit Profile
//               </button>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="group bg-linear-to-br from-slate-50 to-white p-6 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all duration-300">
//                 <div className="flex items-start space-x-4">
//                   <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center shrink-0 group-hover:bg-blue-200 transition-colors duration-300">
//                     <User className="w-6 h-6 text-blue-600" />
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <p className="text-sm font-medium text-slate-500 mb-1">Full Name</p>
//                     <p className="text-lg font-semibold text-slate-800 truncate">{user?.name || "N/A"}</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="group bg-linear-to-br from-slate-50 to-white p-6 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all duration-300">
//                 <div className="flex items-start space-x-4">
//                   <div className="w-12 h-12 rounded-lg bg-cyan-100 flex items-center justify-center shrink-0 group-hover:bg-cyan-200 transition-colors duration-300">
//                     <Mail className="w-6 h-6 text-cyan-600" />
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <p className="text-sm font-medium text-slate-500 mb-1">Email Address</p>
//                     <p className="text-lg font-semibold text-slate-800 truncate">{user?.email || "N/A"}</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="group bg-linear-to-br from-slate-50 to-white p-6 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all duration-300">
//                 <div className="flex items-start space-x-4">
//                   <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center shrink-0 group-hover:bg-green-200 transition-colors duration-300">
//                     <Phone className="w-6 h-6 text-green-600" />
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <p className="text-sm font-medium text-slate-500 mb-1">Phone Number</p>
//                     <p className="text-lg font-semibold text-slate-800">{user?.phone || "N/A"}</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="group bg-linear-to-br from-slate-50 to-white p-6 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all duration-300">
//                 <div className="flex items-start space-x-4">
//                   <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center shrink-0 group-hover:bg-orange-200 transition-colors duration-300">
//                     <MapPin className="w-6 h-6 text-orange-600" />
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <p className="text-sm font-medium text-slate-500 mb-1">Zip Code</p>
//                     <p className="text-lg font-semibold text-slate-800">{user?.zipCode || "N/A"}</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="group bg-linear-to-br from-slate-50 to-white p-6 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all duration-300">
//                 <div className="flex items-start space-x-4">
//                   <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center shrink-0 group-hover:bg-purple-200 transition-colors duration-300">
//                     <Briefcase className="w-6 h-6 text-purple-600" />
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <p className="text-sm font-medium text-slate-500 mb-1">Profession</p>
//                     <p className="text-lg font-semibold text-slate-800">{user?.profession || "N/A"}</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="group bg-linear-to-br from-slate-50 to-white p-6 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all duration-300">
//                 <div className="flex items-start space-x-4">
//                   <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center shrink-0 group-hover:bg-indigo-200 transition-colors duration-300">
//                     <MapPin className="w-6 h-6 text-indigo-600" />
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <p className="text-sm font-medium text-slate-500 mb-1">Division</p>
//                     <p className="text-lg font-semibold text-slate-800">{user?.division || "N/A"}</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="group bg-linear-to-br from-slate-50 to-white p-6 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all duration-300 md:col-span-2">
//                 <div className="flex items-start space-x-4">
//                   <div className="w-12 h-12 rounded-lg bg-rose-100 flex items-center justify-center shrink-0 group-hover:bg-rose-200 transition-colors duration-300">
//                     <CreditCard className="w-6 h-6 text-rose-600" />
//                   </div>
//                   <div className="flex-1">
//                     <p className="text-sm font-medium text-slate-500 mb-3">National ID Cards</p>
//                     {user?.nidPic && user.nidPic.length > 0 ? (
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         {user.nidPic.map((nid, index) => (
//                           <div key={index} className="relative rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
//                             <img
//                               src={nid.url}
//                               alt={`NID ${index === 0 ? 'Front' : 'Back'} Side`}
//                               className="w-full h-64 object-cover"
//                             />
//                             <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/60 to-transparent p-3">
//                               <p className="text-white text-sm font-medium">
//                                 {index === 0 ? 'Front Side' : 'Back Side'}
//                               </p>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     ) : (
//                       <p className="text-slate-600">No NID uploaded</p>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="mt-8 pt-8 border-t border-slate-200">
//               <div className="flex flex-col sm:flex-row gap-4">
//                 <button className="flex-1 px-6 py-3 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-all duration-200 font-medium">
//                   Change Password
//                 </button>
//                 <button className="flex-1 px-6 py-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all duration-200 font-medium">
//                   Delete Account
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="mt-6 text-center text-sm text-slate-500">
//           <p>Copyright © {new Date().getFullYear()}: {new Date().toLocaleDateString()}</p>
//         </div>

//         {/* Edit Profile Modal */}
//         {isModalOpen && (
//           <div className='fixed top-0 left-0 w-full h-full py-16 bg-black/80 flex z-50 overflow-y-auto'>
//             <div className='bg-white p-8 rounded-lg max-w-4xl w-full mx-auto my-auto relative'>
//               <div className='flex items-center justify-between mb-6'>
//                 <h2 className="text-2xl font-bold text-slate-800">Update Profile</h2>
//                 <button 
//                   onClick={() => setIsModalOpen(false)} 
//                   className='text-slate-400 hover:text-slate-600 transition-colors'
//                 >
//                   <X className="w-6 h-6" />
//                 </button>
//               </div>
              
//               <form onSubmit={handleSubmit}>
//                 {/* Avatar Upload Section - Added at the top */}
//                 <div className='mb-6 border-b pb-6'>
//                   <h3 className='text-lg font-semibold text-slate-800 mb-4'>Profile Picture</h3>
//                   <div className='flex items-center gap-6'>
//                     <div className="relative">
//                       <div className="w-24 h-24 rounded-full border-2 border-gray-300 overflow-hidden bg-white">
//                         {(avatarPreview || user?.avatar?.url) ? (
//                           <img 
//                             src={avatarPreview || user?.avatar?.url} 
//                             alt="Avatar Preview" 
//                             className="w-full h-full object-cover"
//                           />
//                         ) : (
//                           <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-blue-500 to-cyan-500">
//                             <User className="w-12 h-12 text-white" />
//                           </div>
//                         )}
//                       </div>
//                       <input
//                         type="file"
//                         id="avatarModalInput"
//                         accept="image/*"
//                         onChange={handleAvatarChange}
//                         className="hidden"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => document.getElementById('avatarModalInput')?.click()}
//                         className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-blue-700 transition-all duration-200"
//                       >
//                         <Camera className="w-4 h-4" />
//                       </button>
//                     </div>
//                     <div className='flex-1'>
//                       <button
//                         type="button"
//                         onClick={() => document.getElementById('avatarModalInput')?.click()}
//                         className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium text-sm'
//                       >
//                         Choose Photo
//                       </button>
//                       <p className='text-xs text-gray-500 mt-2'>
//                         Recommended: Square image, at least 400x400px (Max 5MB)
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6'>
//                   <div>
//                     <label htmlFor="name" className='block text-sm font-medium text-gray-700 mb-2'>Full Name</label>
//                     <input 
//                       type="text" 
//                       name="name" 
//                       id="name" 
//                       value={formData.name} 
//                       onChange={handleChange} 
//                       required 
//                       className='py-3 px-4 border border-gray-300 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all'
//                     />
//                   </div>
                  
//                   <div>
//                     <label htmlFor="email" className='block text-sm font-medium text-gray-700 mb-2'>Email Address</label>
//                     <input 
//                       type="email" 
//                       name="email" 
//                       id="email" 
//                       value={formData.email} 
//                       onChange={handleChange} 
//                       required 
//                       className='py-3 px-4 border border-gray-300 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all'
//                     />
//                   </div>
                  
//                   <div>
//                     <label htmlFor="phone" className='block text-sm font-medium text-gray-700 mb-2'>Phone Number</label>
//                     <input 
//                       type="text" 
//                       name="phone" 
//                       id="phone" 
//                       value={formData.phone} 
//                       onChange={handleChange} 
//                       placeholder="01712345678"
//                       className='py-3 px-4 border border-gray-300 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all'
//                     />
//                   </div>
                  
//                   <div>
//                     <label htmlFor="zipCode" className='block text-sm font-medium text-gray-700 mb-2'>Zip Code</label>
//                     <input 
//                       type="text" 
//                       name="zipCode" 
//                       id="zipCode" 
//                       value={formData.zipCode} 
//                       onChange={handleChange} 
//                       className='py-3 px-4 border border-gray-300 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all'
//                     />
//                   </div>
                  
//                   <div>
//                     <label htmlFor="profession" className='block text-sm font-medium text-gray-700 mb-2'>Profession</label>
//                     <input 
//                       type="text" 
//                       name="profession" 
//                       id="profession" 
//                       value={formData.profession} 
//                       onChange={handleChange} 
//                       className='py-3 px-4 border border-gray-300 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all'
//                     />
//                   </div>
                  
//                   <div>
//                     <label htmlFor="division" className='block text-sm font-medium text-gray-700 mb-2'>Division</label>
//                     <select 
//                       name="division" 
//                       id="division" 
//                       value={formData.division} 
//                       onChange={handleChange} 
//                       required
//                       className='py-3 px-4 border border-gray-300 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all'
//                     >
//                       <option value="">Select Division</option>
//                       <option value="Dhaka">Dhaka</option>
//                       <option value="Chattogram">Chattogram</option>
//                       <option value="Rajshahi">Rajshahi</option>
//                       <option value="Khulna">Khulna</option>
//                       <option value="Barishal">Barishal</option>
//                       <option value="Sylhet">Sylhet</option>
//                       <option value="Rangpur">Rangpur</option>
//                       <option value="Mymensingh">Mymensingh</option>
//                     </select>
//                   </div>
//                 </div>

//                 {/* NID Upload Section */}
//                 <div className='border-t pt-6 mb-6'>
//                   <h3 className='text-lg font-semibold text-slate-800 mb-4'>Upload National ID Card</h3>
//                   <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
//                     {/* Front Side */}
//                     <div>
//                       <label htmlFor="nidFront" className='block text-sm font-medium text-gray-700 mb-2'>
//                         NID Front Side
//                       </label>
//                       <input 
//                         type="file" 
//                         name="nidFront" 
//                         id="nidFront"
//                         accept="image/*"
//                         onChange={handleNidFrontChange}
//                         className='py-3 px-4 border border-gray-300 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all'
//                       />
//                       {(nidFrontPreview || user?.nidPic?.[0]?.url) && (
//                         <div className='mt-4 rounded-lg overflow-hidden border border-gray-200'>
//                           <img 
//                             src={nidFrontPreview || user?.nidPic?.[0]?.url} 
//                             alt="NID Front Preview" 
//                             className='w-full h-48 object-cover'
//                           />
//                         </div>
//                       )}
//                     </div>

//                     {/* Back Side */}
//                     <div>
//                       <label htmlFor="nidBack" className='block text-sm font-medium text-gray-700 mb-2'>
//                         NID Back Side
//                       </label>
//                       <input 
//                         type="file" 
//                         name="nidBack" 
//                         id="nidBack"
//                         accept="image/*"
//                         onChange={handleNidBackChange}
//                         className='py-3 px-4 border border-gray-300 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all'
//                       />
//                       {(nidBackPreview || user?.nidPic?.[1]?.url) && (
//                         <div className='mt-4 rounded-lg overflow-hidden border border-gray-200'>
//                           <img 
//                             src={nidBackPreview || user?.nidPic?.[1]?.url} 
//                             alt="NID Back Preview" 
//                             className='w-full h-48 object-cover'
//                           />
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 <div className='flex gap-4 justify-end'>
//                   <button 
//                     type="button"
//                     onClick={() => setIsModalOpen(false)}
//                     className='px-6 py-3 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-all duration-200 font-medium'
//                   >
//                     Cancel
//                   </button>
//                   <button 
//                     type="submit"
//                     disabled={isLoading}
//                     className='px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed'
//                   >
//                     {isLoading ? 'Updating...' : 'Update Profile'}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProfileSettings;