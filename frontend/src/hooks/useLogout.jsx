import { SetUser } from '@/redux/AuthSlice';
import { api } from '@/services/api';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const useLogout = () => {
    const router = useRouter()
     const dispatch = useDispatch()

     const handleLogout = async()=>{
        try {
            const response = await api.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/logout`)
            if(response){
                localStorage.removeItem("token")
                dispatch(SetUser(null))
                toast.success(response?.message)
                router.replace("/auth/login")
            }
        } catch (error) {
            console.error("failed to logout",error)
            return toast.error(error?.response?.data?.message || "Internal server error")
        }
     }
  return {handleLogout}
}

export default useLogout;
