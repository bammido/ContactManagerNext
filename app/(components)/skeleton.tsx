export default function Skeleton({ width, height, tailwindStyle }: { width?: string, height?: string, tailwindStyle?: string }) {
    return <div className={`block p-6 ${width?? 'w-36'} ${height?? 'h-20'} bg-gray-200 border border-gray-200 rounded-lg shadow hover:bg-gray-300 animate-pulse ${tailwindStyle?? ''}`}/>
}