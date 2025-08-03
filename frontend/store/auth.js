import axios from 'axios'
import { create } from 'zustand'

export const useAuthStore = create((set) => ({
  token : null,
  isAuthenticated: false,

  verify: async() => {
    try{
        const res = await axios.get("https://nessfi-assignment.onrender.com/api/auth/authenticate/",{
            withCredentials: true
        });
        console.log(res.data.success)
        if(res.data.success){
           set({ isAuthenticated: true })
        }
    }catch(error){
        console.log(error)
           set({ isAuthenticated: false })
    }    
  },
}))
