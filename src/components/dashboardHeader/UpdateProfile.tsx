import type { TAuthUser } from "@/types/authType";


const UpdateProfile = ({updateData}: {updateData: TAuthUser}) => {
    console.log(updateData);
  return (
    <div>UpdateProfile</div>
  )
}

export default UpdateProfile;