import sleep from "./(helpers)/sleep"
import GroupCard from "./groupCard"
import { getGroups } from "./service/groups"
import { IGroup } from "./types/group"


export default async function Groups(){
    const groups: IGroup[] = [
        {groupName: 'design', id: 'design'}, 
        {groupName: 'marketing', id: 'marketing'}, 
        {groupName: 'vendas', id: 'vendas'}
    ]

    const res = await (async () => {
        return await getGroups()
    })()
    
    return <section className="w-full flex flex-col gap-10">
        <h1>Grupos</h1>
        <div className="w-full flex gap-6 flex-wrap">
            {res?.data.map(group => <GroupCard key={group.groupName} group={group} />)}
        </div>
    </section>
}