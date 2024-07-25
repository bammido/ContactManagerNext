import Skeleton from "@/app/(components)/skeleton";

export default function GroupDetailsPageLoading(){
    return <div className="flex flex-col gap-6 animate-pulse w-full">
        <Skeleton width="w-full" />
        <Skeleton width="w-full" height="h-96" />
        <div className="flex justify-end gap-4">
            <Skeleton width="w-40" height="h-16" />
            <Skeleton width="w-40" height="h-16" />
        </div>
    </div>
}