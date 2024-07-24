import GroupCard from "./groupCard"
import { IGroup } from "./types/group"


export default function Groups(){
    const groups: IGroup[] = [
        {groupName: 'design', id: 'design'}, 
        {groupName: 'marketing', id: 'marketing'}, 
        {groupName: 'vendas', id: 'vendas'}
    ]
    
    return <section className="w-full flex flex-col gap-10">
        <h1>Grupos</h1>
        <div className="w-full flex gap-6">
            {groups.map(group => <GroupCard key={group.groupName} group={group} />)}
        </div>
    </section>
}