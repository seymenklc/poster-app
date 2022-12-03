import moment from 'moment';
import { PostType } from "@/types";
import { MdFavoriteBorder, MdOutlineModeComment, MdOutlineMore } from "react-icons/md";

export default function Post({ item }: { item: PostType; }) {

    return (
        <div className="bg-neutral-50 flex flex-col w-full h-52 p-3 rounded-md shadow-sm">
            <div className='p-1 flex justify-between items-center border-b border-slate-300'>
                <span className='font-semibold text-[#12b488]'>
                    {item.username}
                </span>
                <small className='text-gray-400'>
                    {moment(item.createdAt).fromNow()}
                </small>
            </div>
            <p className='p-1 mt-1 flex-1 text-justify text-sm'>{item.content}</p>
            <div className='flex justify-between items-center p-1'>
                <div className='flex items-center gap-4'>
                    <span className='post-icon hover:text-rose-500'>
                        <MdFavoriteBorder />
                    </span>
                    <span className='post-icon hover:text-sky-500'>
                        <MdOutlineModeComment />
                    </span>
                </div>
                <span className='post-icon hover:text-[#12b488]'>
                    <MdOutlineMore />
                </span>
            </div>
        </div>
    );
}