'use client'

import { useRef, useState } from "react";
import Button from "../(components)/button";
import Input from "../(components)/input";
import LetterXSvg from "../(components)/letterXSvg";
import { postGroup } from "../service/groups";
import { toast } from "react-toastify";

export default function NewGroup() {
    const [file, setFile] = useState<null | File>(null)
    const [groupName, setGroupName] = useState('')

    const fileRef = useRef<null | HTMLInputElement>(null);

    async function handleChangeFile(event: React.ChangeEvent<HTMLInputElement>) {
        if(!event.target.files){
            return
        }

        const selectedFile = event.target.files[0];

        if(!selectedFile) {
            return
        }

        setFile(selectedFile)
    }

    async function handleSubmit(){
        try {
            if(!groupName){
                toast.error('Necessário preencher o nome do grupo!')
                return
            }
    
            await postGroup({
                groupName,
                file
            })

            toast.success('Grupo criado!')
        } catch (error) {
            toast.error('Ocorreu um erro inesperado!')
        }
    }

    return <div className="flex flex-col">
        <div className="flex flex-col">
            <label htmlFor="nomeDoGrupo" >Nome do grupo</label>
            <Input 
                placeholder="infra"
                id="nomeDoGrupo"
                value={groupName}
                onChange={e => setGroupName(e.target.value)}
            />
        </div>
        <div className="flex flex-col gap-2">
            {file?.name && <div className="flex gap-6 items-center">
                <span>Arquivo: <b>{file?.name}</b></span>
                <Button 
                    onClick={() => {
                        setFile(null);
                        if(fileRef.current?.files?.length){
                            fileRef.current.files = null
                        }
                    }}
                    typeStyle="alternative"
                >
                    <LetterXSvg />
                </Button>
            </div>}

            <small className="text-danger font-bold">Extensões aceitas: .xlsx, .csv e .txt</small>

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
                key={file?.name}
                placeholder="subir arquivo de contatos"
            />

            <div className="self-end">
                <Button
                    typeStyle="green"
                    label="salvar"
                    onClick={handleSubmit}
                />
            </div>
        </div>
    </div>
    
}