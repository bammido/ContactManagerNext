import { IContact } from "@/app/types/contacts"
import { contactManagerNest } from "../apis/contactManagerNest"

export async function postContact(body: { name: string, number: string, groupId: string }) {
    try {
        const response = await contactManagerNest.post<IContact>('/contacts', body)

        return {
            data: response.data,
            response
        }
    } catch (error: any) {
        const errorCause = error.response ?? error
        throw new Error(error.message, { cause: errorCause })
    }
}

export async function putContact(body: { name: string, number: string, groupId: string, id: string }) {
    try {
        const response = await contactManagerNest.put('/contacts', body)

        return {
            data: response.data,
            response
        }
    } catch (error: any) {
        const errorCause = error.response ?? error
        throw new Error(error.message, { cause: errorCause })
    }
}

export async function deleteContact(id: string) {
    try {
        const response = await contactManagerNest.delete(`/contacts/${id}`)

        return {
            data: response.data,
            response
        }
    } catch (error: any) {
        const errorCause = error.response ?? error
        throw new Error(error.message, { cause: errorCause })
    }
}