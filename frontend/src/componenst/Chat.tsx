import { useEffect, useRef, useState } from 'react'
import { InputWithLabel } from './ui/LabelInput'
import { Button } from './ui/Button'
import { Message } from './ui/Message'
import { useGetmessage, useUserDetail } from '../hooks/user';
import  socket from '../utils/socket'
import { getRoomId } from '../utils/roomId';
import { useAuth } from '../hooks/useAuth';

type ChatProps = {
  query: string;
  username: string;
};

function Chat({ query, username }: ChatProps) {
  const { token } =useAuth();
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [ currentMessage,setCurrentMessage ] = useState("");
  const { data : messages ,isLoading  } =useGetmessage(token,query)
  const { data : userDetail  } = useUserDetail(token);
  // const { mutate : ForwardMessage } = useSendMessage()
  const [socketMessages, setSocketMessages] = useState<any[]>([]);


  const senderId =userDetail?.[0]?._id;
  const roomId = getRoomId(senderId,query);

  useEffect(()=>{
    
    socket.on("connect", () => {
     console.log(" Connected to server:", socket.id);
     });

    socket.on("connect_error", (err) => {
     console.log(" Connection Error:", err.message);
    });

    socket.emit('join',roomId);
    console.log("User Joined Room",roomId);
    
  },[roomId])


  useEffect(() => {
  socket.on("receive_message", (data) => {
    console.log("Recieved data",data);
    setSocketMessages((prev) => [...prev, data]);
  });

  return () => {
    socket.off("receive_message"); 
  };
}, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages,socketMessages]);

  const handleSubmit = ()=>{
    if(!currentMessage.trim()) return;


  socket.emit("send_message", {
    roomId,  
    message :currentMessage,
    senderId,
    receiverId: query,
    _id: Date.now().toString(),
  });
  
    // ForwardMessage(
    //   { receiverId :query ,token , message :currentMessage},
    //   {
    //     onSuccess : ()=>{
    //       setCurrentMessage("");
    //     },
    //       onError: (error) => {
    //       console.error("Send failed:", error);
    //     }
    //   }
    // )
  }

  return (
    <div className="">
      <div className="flex items-center bg-white  border-b px-4 border-gray-600 shadow-md  h-20">
        <div className="bg-gray-300 h-12 w-12 flex justify-center items-center rounded-full">
         <h1 className="text-lg font-bold">{username.charAt(0).toUpperCase()}</h1>
        </div>
        <h1 className='px-4'>{username} </h1>
      </div>
      <div
        className="h-[560px] bg-gray-200 overflow-y-auto"
        ref={scrollRef}
      >
        {isLoading ? (
            <h1>message Loading....</h1>
        ):(
            messages.map((message : any)=>(

        <div key={message._id} className={`${message.userId === query ? "flex justify-start" : "flex justify-end"}`}>
          <Message text={message.message} size="sm"  variant={message.userId === query ? 'secondary' : 'primary'} />
        </div>
            ))
        )}

        { socketMessages.map((Webmessage)=>(
           <div key={Webmessage._id} className={`${Webmessage.senderId === query ? "flex justify-start " : "flex justify-end "}`} >
             <Message text={Webmessage.message} size="sm"  variant={Webmessage.senderId === query ? 'secondary' : 'primary'} />
           </div>
           
        ))  }

      
      </div>
      <div className="bg-gray-100 h-22 flex items-center px-2 py-1">
        <div className="w-full">
          <InputWithLabel 
          placeholder="Enter the Message...."
          type='text'
          value={currentMessage}
          onChange={(e)=>setCurrentMessage(e.target.value)}
          
           />
        </div>
        <div className="flex ">
          <Button onclick={handleSubmit} size="md" text="Send" variant="primary" />
        </div>
      </div>
    </div>
  );
}

export default Chat;
