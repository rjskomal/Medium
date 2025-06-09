import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { useBlogs } from "../hooks"

export const Blogs = () => {
    const {loading, blogs} = useBlogs();

    if(loading){
        return <div>
            loading....
        </div>
    }
    return <div className="bg-gray-300">
        <Appbar />
        <div className="flex justify-center">
        <div className="max-w-xl w-full">
            {blogs.map(blog=>  <BlogCard 
            id={blog.id}
            authorName={blog.author.name || "Anonymous"}
            title={blog.title}
            content={blog.content}
            publishedDate="2023-10-01"
            />)}
           
        </div>
     </div>
        
    </div> 
}