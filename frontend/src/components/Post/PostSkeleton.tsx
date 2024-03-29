type Props = {
    count: number;
};

export default function PostSkeleton({ count }: Props) {
    let items: number[] = [];

    for (let i = 0; i < count; i++) {
        items.push(i);
    }

    return (
        <>
            {items.length && items.map((_, idx) => (
                <div
                    key={idx}
                    className="bg-gray-200 w-full h-32 p-3
                    rounded-md flex gap-3 flex-col animate-pulse"
                >
                    <div className="w-[100px] sm:w-[180px] bg-gray-300 h-5 rounded-sm" />
                    <div className="w-[150px] sm:w-[200px] bg-gray-300 h-5 rounded-sm" />
                    <div className="w-[180px] sm:w-[250px] bg-gray-300 h-5 rounded-sm" />
                </div>
            ))}
        </>
    );
}