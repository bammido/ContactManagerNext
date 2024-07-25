'use client'

import { useRef, useState } from "react";
import Button from "../(components)/button";
import Input from "../(components)/input";

export default function NewGroup() {
    const [file, setFile] = useState<null | File>(null)

    const fileRef = useRef<null | HTMLInputElement>(null);

    async function handleChangeFile(event: React.ChangeEvent<HTMLInputElement>) {
        if(!event.target.files){
            return
        }

        const selectedFile = event.target.files[0];

        if(!selectedFile) {
            return
        }

        console.log(selectedFile)

        setFile(selectedFile)
    }

    return <div className="flex flex-col">
        <div className="flex flex-col">
            <label htmlFor="nomeDoGrupo" >Nome do grupo</label>
            <Input 
                placeholder="infra"
                id="nomeDoGrupo"
            />
        </div>
        <div className="flex flex-col gap-2">
            <span>Arquivo: <b>{file?.name}</b></span>

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
    </div>
    
}