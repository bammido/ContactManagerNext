'use client'

import Button from "@/app/(components)/button";
import Input from "@/app/(components)/input";
import { IContact } from "@/app/types/contacts";
import { ChangeEvent, useState } from "react";

interface IContactForm {
    name: string,
    number: string
}

export interface IContactFormSubmit {
    initialContact?: IContact | null;
    form: IContactForm;
}

interface ContactFormProps {
    initialContact?: IContact | null;
    onSubmit: (args: IContactFormSubmit) => void;
}

export default function ContactForm({ initialContact, onSubmit }: ContactFormProps){
    const [form, setForm] = useState({
        name: initialContact?.name?? '',
        number: initialContact?.number?? ''
    })

    function handleChange(e: ChangeEvent<HTMLInputElement>){
        const {value, name} = e.target

        let newValue = value

        if(name === 'number') {
            newValue = newValue.replace(/\D/g, '')
        }

        setForm(prev => ({...prev, [name]: newValue}))
    }


    return <div className="flex flex-col gap-4">
    <div>
        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome</label>
        <Input 
            name="name" 
            id="name" 
            typeStyle="alternative" 
            placeholder="fulano de tal" 
            value={form.name}
            onChange={handleChange}
        />
    </div>
    <div>
        <label htmlFor="number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Número</label>
        <Input 
            name="number" 
            id="number" 
            placeholder="5599999999999" 
            typeStyle="alternative" 
            value={form.number}
            onChange={handleChange}
        />
    </div>
    <Button 
        type="submit" 
        label="enviar"
        onClick={() => onSubmit({initialContact, form})}
    />
</div>
}