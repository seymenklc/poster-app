type Props = {
    pageNums: number[];
    paginate: (num: number) => void;
};

export default function Pagination({ pageNums, paginate }: Props) {
    return (
        <ul className="inline-flex -space-x-px">
            {pageNums.map(num => (
                <li
                    key={num}
                    onClick={() => paginate(num)}
                    className="btn px-3 py-2 leading-tight bg-[#12b488] 
                    rounded-sm text-white cursor-pointer border border-slate-200"
                >
                    {num}
                </li>
            ))}
        </ul>
    );
}