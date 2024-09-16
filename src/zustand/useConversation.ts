import {create} from "zustand"

const useconversation = create((set)=>({
 selectedConversation:null,
 setSelectedConversation:(selectedConversation:any) => set({selectedConversation}),
 messages:[],
 setMessages:(messages:any) => set({messages})
}))

export default useconversation