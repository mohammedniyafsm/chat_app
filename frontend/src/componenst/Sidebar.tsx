import { GrAction } from "react-icons/gr";
import { InputWithLabel } from "./ui/LabelInput";
import { useGetAllUsers } from "../hooks/user";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";

type SidebarProps = {
  onSelectedUser: (user: { id: string; username: string }) => void;
};

function Sidebar( {onSelectedUser} : SidebarProps) {
  const { token } = useAuth();
  const [query ,setQuery ] = useState("");
  const { data : allUsers,isLoading } = useGetAllUsers(token,query);
  const [ currentUser,setCurrentUser ] = useState('');

const handleCurrent = (_id: string, username: string) => {
  setCurrentUser(_id);
  onSelectedUser({ id: _id, username });
};

  return (
    <div className="bg-white w-96 h-screen shadow-md border border-r-gray-200 flex flex-col">

      <div className="flex justify-between px-4 py-4">
        <h1 className="font-bold font-inter text-2xl">Messages</h1>
        <GrAction />
      </div>

      
      <div className="px-4">
        <InputWithLabel 
        placeholder="Search Users...."
        value={query}
        onChange={(e)=>setQuery(e.target.value)}
         />
      </div>

      
      <div className="flex-1  overflow-y-auto px-4 mt-4 space-y-3 pb-4">
        {isLoading ? (
          <p>Loading users...</p>
        ):(
        allUsers?.map((user:any)=>(
          <div key={user._id} onClick={() => handleCurrent(user._id, user.username)} className={`${user._id === currentUser ? "bg-gray-200 hover:bg-gray-200" : " "} hover:bg-gray-100 cursor-pointer flex justify-between py-4 rounded-md px-4`}>
            <div>
              <h1 className="font-medium font-inter text-md">
                {user.username}
              </h1>
            </div>
          </div>
        ))
        )}
        
       
      </div>
    </div>
  );
}

export default Sidebar;
