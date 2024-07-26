import { useCookies } from "next-client-cookies";
import { useRouter } from "next/navigation";
import { contactManagerNest } from "../service/apis/contactManagerNest";

export default function useIsAthenticated() {
    const cookies = useCookies();

    const router = useRouter()

    const token = cookies.get('token')

    if(token) {
        contactManagerNest.defaults.headers['token'] = token
    }

    return token ?? router.push('/login')
}