'use client'

import Button from "@/app/(components)/button"
import Input from "@/app/(components)/input"
import Modal from "@/app/(components)/modal"
import { IContact } from "@/app/types/contacts"
import { useState } from "react"
import ContactForm, { IContactFormSubmit } from "./contactForm"
import { deleteContact, putContact } from "@/app/service/contacts"
import { toast } from "react-toastify"

interface GroupContactsTableProps {
    contacts: IContact[];
    reload?: () => void;
    groupId: string;
}

export default function GroupContactsTable({ contacts, reload, groupId }: GroupContactsTableProps) {
    const [showEditContact, setShowEditContact] = useState(false)
    const [contactToEdit, setContactToEdit] = useState<null | IContact>(null)
    
    const [showDeleteContact, setShowDeleteContact] = useState(false)
    const [contactodeDelete, setContactodeDelete] = useState<null | string>(null)



    function showEdit(contact: IContact) {
        setContactToEdit(contact)
        setShowEditContact(true)
    }

    function closeEdit() {
        setContactToEdit(null)
        setShowEditContact(false)
    }

    function showDelete(id: string) {
        setShowDeleteContact(true)
        setContactodeDelete(id)
    }
    
    function closeDelete() {
        setShowDeleteContact(false)
        setContactodeDelete(null)
    }

    async function editContactSubmit({form, initialContact}: IContactFormSubmit) {
        try {
            if(!form.name || !form.number){
                toast.error('Necessário preencher todos os campos!')
                return
            }
    
            await putContact({
                name: form.name,
                number: form.number,
                groupId: groupId,
                id: (initialContact as IContact).id
            })
    
            closeEdit()
            reload && reload()
            toast.success('Contato atualizado!')
        } catch (error) {
            toast.error('Ocorreu um erro inesperado!')
        }
    }
    
    async function deleteContactSubmit() {
        try {
            await deleteContact(contactodeDelete!)

            closeDelete()
            reload && reload()
            toast.success('Contato excluído!')
        } catch (error) {
            toast.error('Ocorreu um erro inesperado!')
        }
    }

    return <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <small>Contatos</small>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        Nome
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Número
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Ação
                    </th>
                </tr>
            </thead>
            <tbody>
                {contacts.map(contact => <ContactRow key={contact.id} contact={contact} showEdit={showEdit} showDelete={showDelete} />)}
            </tbody>
        </table>
        <Modal 
            visible={showEditContact} 
            close={closeEdit}
            title="Editar Contato"
        >
            <ContactForm
                initialContact={contactToEdit}
                onSubmit={editContactSubmit}
            />
        </Modal>
        <Modal 
            visible={showDeleteContact} 
            close={closeDelete}
            title="Confirmar exclusão"
        >
            <div className="flex justify-end">
                <Button
                    label="cancelar"
                    typeStyle="alternative"
                    onClick={closeDelete}
                />
                <Button
                    label="excluir"
                    typeStyle="red"
                    onClick={deleteContactSubmit}
                />
            </div>
        </Modal>
    </div>
    
}

function ContactRow({ contact, showEdit, showDelete }: { 
    showEdit: (contact: IContact) => void, 
    showDelete: (contactId: string) => void, 
    contact: IContact
}) {
    return <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {contact.name}
    </th>
    <td className="px-6 py-4">
        {contact.number}
    </td>
    <td className="px-6 py-4 flex gap-2">
        <Button 
            onClick={() => showEdit(contact)}
            label="Editar"
            typeStyle="purple"
        />
        <Button 
            onClick={() => showDelete(contact.id)}
            label="Excluir"
            typeStyle="red"
        />
    </td>
</tr>
}