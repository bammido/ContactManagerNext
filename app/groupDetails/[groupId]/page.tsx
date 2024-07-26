'use client'

import { IGroupDetails } from "@/app/types/group"
import GroupContactsTable from "./groupContactsTable"
import Button from "@/app/(components)/button"
import { useEffect, useRef, useState } from "react"
import sendFile from "@/app/service/sendFile"
import Modal from "@/app/(components)/modal"
import { getGroupDetails } from "@/app/service/groups"
import GroupDetailsPageLoading from "./loading"
import ContactForm, { IContactFormSubmit } from "./contactForm"
import { postContact } from "@/app/service/contacts"

import { toast } from 'react-toastify';

interface GroupDetailsProps {
    params: { groupId: string }
}

export default async function GroupDetailsPage({ params } : GroupDetailsProps) {
    const [showNewContact, setShowNewContact] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [groupDetails, setGroupDetails] = useState<null | IGroupDetails>(null)
    const [key, setKey] = useState(0)

    async function loadInfos(){
        setIsLoading(true)
        const detailsRes = await getGroupDetails({ groupId: params.groupId })
        setGroupDetails(detailsRes.data)
        setIsLoading(false)
    }

    useEffect(() => {
        loadInfos()
    }, [key])

    const fileRef = useRef<null | HTMLInputElement>(null);

    function reload() {
        setKey(prev => prev + 1)
    }

    async function handleChangeFile(event: React.ChangeEvent<HTMLInputElement>) {
        if(!event.target.files){
            return
        }

        const selectedFile = event.target.files[0];

        if(!selectedFile) {
            return
        }

        await sendFile({file: selectedFile, groupId: params.groupId})
        reload()
    }

    async function addNewContact({form}: IContactFormSubmit) {
        try {
            if(!form.name || !form.number){
                toast.error('Necessário preencher todos os campos!')
                return
            }

            await postContact({
                name: form.name,
                number: form.number,
                groupId: params.groupId
            })
    
            setShowNewContact(false)
            reload()
            toast.success('Contato adicionado!')
        } catch (error) {
            toast.error('Ocorreu um erro inesperado!')
        }
    }

    return <>
        {isLoading && <GroupDetailsPageLoading />}
        {!isLoading && groupDetails && <div className="flex flex-col gap-6">
            <h1>{ groupDetails.groupName }</h1>
            <GroupContactsTable 
                contacts={groupDetails.contacts} 
                reload={reload} 
                groupId={params.groupId}
            />
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
                    key={key}
                />
            </div>
            <Modal 
                visible={showNewContact} 
                close={() => setShowNewContact(false)}
                title="Adicionar Contato"
                >
                <ContactForm 
                    onSubmit={addNewContact}
                />
            </Modal>
        </div>}
    </>
}