import { useNavigate } from "react-router-dom";
import Sidebar from "../componenst/Sidebar";
import Chat from "../componenst/Chat";

import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";


export const Home = () => {
const [selectedUser, setSelectedUser] = useState<{ id: string; username: string } | null>(null);
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(()=>{
    if (!token) {
      navigate("/signup");
    }
  },[token,navigate])


  return (
    <div className="bg-white flex ">
      <div className="">
        <Sidebar  onSelectedUser={(user) => setSelectedUser(user)} />
      </div>
      <div className="w-full">
        {selectedUser ? (
            <Chat query={selectedUser.id} username={selectedUser.username} />
        ):(
          <div className="">
            
          </div>
          )}
      </div>
      
      </div>
    );
};
