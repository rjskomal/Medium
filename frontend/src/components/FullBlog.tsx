import type { Blog } from "../hooks";

export const FullBlog = ({ blog }: { blog: Blog }) => {
  return (
    <div className="bg-gray-200 min-h-screen p-5 font-mono text-gray-700">
      <div className="max-w-4xl mx-auto bg-gray-100 p-8 rounded-md shadow-md border border-gray-400">
        
        <h1 className="text-4xl font-extrabold text-black mb-2">
          {blog.title}
        </h1>

        <p className="text-sm text-gray-500 mb-6">Posted on August 24, 2023</p>

        <p className="text-md leading-7 text-gray-700 mb-10 whitespace-pre-line">
          {blog.content}
        </p>

        {/* Author Section */}
        <div className="flex gap-3 items-start">
          <Avatar name={blog.author?.name ?? "?"} />
          <div>
            <p className="text-lg font-bold text-black">
              {blog.author.name ?? "Anonymous"}
            </p>
            <p className="text-sm text-gray-500 max-w-sm">
              Master of mirth, purveyor of puns, and the funniest person in the kingdom.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export function Avatar({ name }: { name: string }) {
  return (
    <div
      className="relative inline-flex items-center justify-center
     w-8 h-8 overflow-hidden bg-gray-300 
     rounded-full"
    >
      <span className="font-xs text-gray-700">
        {name?.[0]?.toUpperCase() ?? "?"}
      </span>
    </div>
  );
}
