import { IGroupDetails } from "@/app/types/group";
import { contactManagerNest } from "../apis/contactManagerNest";

export async function getGroups() {
    try {
        const response = await contactManagerNest.get<IGroupDetails[]>('/groups')

        return {
            data: response.data,
            response
        }
    } catch (error: any) {
        const errorCause = error.response ?? error
        throw new Error(error.message, { cause: errorCause })
    }
}

export async function getGroupDetails({ groupId }: { groupId: string }) {
    try {
        const response = await contactManagerNest.get<IGroupDetails>(`/groups/${groupId}`)
        return {
            data: response.data,
            response
        }
    } catch (error: any) {
        const errorCause = error.response ?? error
        throw new Error(error.message, { cause: errorCause })
    }
}