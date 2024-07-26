import { contactManagerNest } from "../apis/contactManagerNest"

export async function getToken(body : { email: string, password: string}) {
    try {
        const response = await contactManagerNest.post('/login', body)

        return {
            data: response.data,
            response
        }
    } catch (error: any) {
        const errorCause = error.response ?? error
        throw new Error(error.message, { cause: errorCause })
    }
}