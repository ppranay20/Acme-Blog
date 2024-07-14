import { Link } from "react-router-dom";

const BlogCard = ({id,authorName,title,content,publishedDate}) => {
    const dateObj = new Date(publishedDate);
    const newDate = dateObj.toDateString().slice(4);

    return <>
        <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer">
            <div className="flex">
            <div className={"relative inline-flex items-center justify-center overflow-hidden bg-gray-600 rounded-full w-6 h-6"}>   
                <span className={"text-xs font-extralight text-gray-600 dark:text-gray-300"}>
                    {authorName[0]}
                </span>
            </div>
                <div className="font-extralight pl-2 text-sm flex justify-center flex-col">{authorName}</div>
                <div className="flex justify-center flex-col pl-2">
                    <div className="h-1 w-1 rounded-full bg-slate-500"></div>
                </div>
                <div className="pl-2 font-thin text-slate-500 text-sm flex justify-center flex-col">
                    {newDate}
                </div>
            </div>
            <div className="text-xl font-semibold pt-2 hover:text-blue-700">
                <Link to={`/blog/${id}`}>{title}</Link>
            </div>
            <div className="text-md font-thin py-2 pr-16">
                {content.slice(0, 150)}...<Link to={`/blog/${id}`}><span className="text-blue-600">read more</span></Link>
            </div>
            <div className="text-slate-500 text-sm font-thin pt-4">
                {`${Math.ceil(content.length / 100)} minute(s) read`}
            </div>
        </div>
    </>
}

export default BlogCard