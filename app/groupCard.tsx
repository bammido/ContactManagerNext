import Link from "next/link"
import { IGroup } from "./types/group"
import Skeleton from "./(components)/skeleton";


interface GroupCardProps {
    group?: IGroup;
    loading?: boolean;
}

export default function GroupCard({ group, loading }: GroupCardProps) {
    return <>
        {!loading && <Link href={`/groupDetails/${group?.id}`} className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{group?.groupName}</h5>
        </Link>}
        {loading && <Skeleton />}
    </>
    
}