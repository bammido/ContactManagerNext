import { redirect } from "next/navigation"
import GroupCard from "./groupCard"
import { getGroups } from "./service/groups"


export default async function Groups(){

    const res = await (async () => {
        try {
            return await getGroups()
        } catch (error: any) {
            redirect('/login')
        }
    })()
    
    return <section className="w-full flex flex-col gap-10">
        <h1>Grupos</h1>
        <div className="w-full flex gap-6 flex-wrap">
            {res?.data.map(group => <GroupCard key={group.groupName} group={group} />)}
        </div>
    </section>
}