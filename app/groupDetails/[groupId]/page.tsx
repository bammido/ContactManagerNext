'use client'

import { IGroupDetails } from "@/app/types/group"
import GroupContactsTable from "./groupContactsTable"
import Button from "@/app/(components)/button"
import { useEffect, useRef, useState } from "react"
import sendFile from "@/app/service/sendFile"
import Modal from "@/app/(components)/modal"
import Input from "@/app/(components)/input"
import { getGroupDetails } from "@/app/service/groups"
import GroupDetailsPageLoading from "./loading"

interface GroupDetailsProps {
    params: { groupId: string }
}

export default async function GroupDetailsPage({ params } : GroupDetailsProps) {
    const [showNewContact, setShowNewContact] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [groupDetails, setGroupDetails] = useState<null | IGroupDetails>(null)
    

    const details: IGroupDetails = {
        id: params.groupId,
        groupName: params.groupId,
        contacts: [
            { id: '1', name: 'teste 1', number: '84996495206'},
            { id: '2', name: 'teste 2', number: '84996495206'},
            { id: '3', name: 'teste 3', number: '84996495206'},
        ]
    }

    async function loadInfos(){
        setIsLoading(true)
        const detailsRes = await getGroupDetails({ groupId: params.groupId })
        setGroupDetails(detailsRes.data)
        setIsLoading(false)
    }

    useEffect(() => {
        loadInfos()
    }, [])

    const fileRef = useRef<null | HTMLInputElement>(null);

    async function handleChangeFile(event: React.ChangeEvent<HTMLInputElement>) {
        if(!event.target.files){
            return
        }

        const selectedFile = event.target.files[0];

        if(!selectedFile) {
            return
        }

        await sendFile({file: selectedFile, groupId: params.groupId})

        if(!fileRef.current) {
            return
        }

        fileRef.current.files = null
    }

    return <>
        {isLoading && <GroupDetailsPageLoading />}
        {!isLoading && groupDetails && <div className="flex flex-col gap-6">
            <h1>{ groupDetails.groupName }</h1>
            <GroupContactsTable contacts={groupDetails.contacts} />
            <div className="flex justify-end">
                <Button 
                    label="adicionar contato"
                    onClick={() => setShowNewContact(true)}
                    />
                <Button
                    onClick={() => fileRef?.current?.click()}
                    typeStyle="purple"
                    label="subir arquivo de contatos"
                    />
                <input 
                    type="file" 
                    accept=".xlsx,.txt,.csv" 
                    className="hidden"
                    onChange={handleChangeFile}
                    ref={fileRef}
                    placeholder="subir arquivo de contatos"
                    />
            </div>
            <Modal 
                visible={showNewContact} 
                close={() => setShowNewContact(false)}
                title="Adicionar Contato"
                >
                <form className="flex flex-col gap-4">
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome</label>
                        <Input name="email" id="email" typeStyle="alternative" placeholder="fulano de tal" required />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Número</label>
                        <Input name="password" id="password" placeholder="99999999999" typeStyle="alternative" required />
                    </div>
                    <Button 
                        type="submit" 
                        label="enviar"
                        />
                </form>
            </Modal>
        </div>}
    </>
}