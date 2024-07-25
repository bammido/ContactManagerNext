import { contactManagerNest } from "../apis/contactManagerNest"

export default async function sendFile({file, groupId}: {file: File, groupId: string}){
    try {

        const formData = new FormData();
        formData.append('file', file);
        formData.append('groupId', groupId);

        // const arrayBuffer= await file.arrayBuffer()

        console.log(formData.getAll('file'), file)

        await contactManagerNest.post('/sendFile', formData, {
            headers: {
                "Content-Type": 'multipart/form-data',
                'Access-Control-Allow-Origin': '*',
            }
        })
    } catch (error: any) {
        const errorCause = error.response ?? error
        throw new Error(error.message, { cause: errorCause })
    }
}