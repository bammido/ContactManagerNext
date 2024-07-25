import GroupCard from "./groupCard";

export default function HomeLoading() {
    const loadingCarsNumber = 4
    const defaultValue = 'loading'; // Valor predefinido

    const array = new Array(loadingCarsNumber).fill(defaultValue);

    return <section className="w-full flex flex-col gap-10">
    <h1>Grupos</h1>
    <div className="w-full flex gap-6 flex-wrap">
        {array.map((_, i) => <GroupCard key={i} loading={true} />)}
    </div>
</section>
}