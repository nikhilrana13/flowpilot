import { SetUser } from '@/redux/AuthSlice';
import { api } from '@/services/api';
import { resetAllApiCaches } from '@/utils/resetApiCache';
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
                toast.success(response?.message)
                localStorage.removeItem("token")
                dispatch(SetUser(null))
                dispatch(resetAllApiCaches())
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
