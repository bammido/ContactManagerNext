'use client'

import Button from "@/app/(components)/button"
import Input from "@/app/(components)/input"
import Modal from "@/app/(components)/modal"
import { IContact } from "@/app/types/contacts"
import { useState } from "react"

interface GroupContactsTableProps {
    contacts: IContact[]
}

export default function GroupContactsTable({ contacts }: GroupContactsTableProps) {
    const [showEditContact, setShowEditContact] = useState(false)
    const [contactToEdit, setContactToEdit] = useState<null | IContact>(null)
    
    const [showDeleteContact, setShowDeleteContact] = useState(false)
    const [contactIdeDelete, setContactIdeDelete] = useState<null | string>(null)



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
        setContactIdeDelete(id)
    }
    
    function closeDelete() {
        setShowDeleteContact(false)
        setContactIdeDelete(null)
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
            <form className="flex flex-col gap-4">
                <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome</label>
                    <Input value={contactToEdit?.name} name="email" id="email" typeStyle="alternative" placeholder="fulano de tal" required />
                </div>
                <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Número</label>
                    <Input value={contactToEdit?.number} name="password" id="password" placeholder="99999999999" typeStyle="alternative" required />
                </div>
                <Button
                    type="submit" 
                    label="enviar"
                />
            </form>
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