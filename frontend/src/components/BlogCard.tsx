import { Link } from "react-router-dom";

interface BlogCardProps {
    authorName : string,
    title : string, 
    content : string,
    publishedDate : string,
    id: string
}



export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate
}: BlogCardProps
)=>{
    return <Link to = {`/blog/${id}`}>
        <div className=" p-5 font-mono bg-gray-300 text-gray-500 pl-5 border-b-2 border-t-2 border-gray-600 cursor-pointer hover:bg-gray-400 hover:text-gray-900 transition-all duration-300">
        <div className="p-2">
           <Avatar name = {authorName} /> {authorName}. {publishedDate}
        </div>

        <div className="p-2 text-xl font-bold text-black">
            {title}
        </div>

        <div className=" p-2 text-md text-gray-600 font-thin">
            {content.slice(0,100) + "..."}
        </div>

        <div className="text-xs text-gray-500 mt-2">
            {`${Math.ceil(content.length /100)} minutes read`}
        </div>
    </div>
    </Link>
}


export function Avatar({name } : {name : string}){
    return  <div className="relative inline-flex items-center justify-center
     w-7 h-7 overflow-hidden bg-gray-100 
     rounded-full dark:bg-gray-600">
    <span className="font-xs text-gray-600 dark:text-gray-300">{name[0]}</span>
</div>
}