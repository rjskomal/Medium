import { Link } from "react-router-dom"

export const Appbar = () => {
    return <div className="border-b flex justify-between px-10 bg-gray-900 text-gray-300 p-5 text-bold text-xl font-mono">
        <Link to={'/blogs'}>
        <div>
            {`Run time terror`} <br  />
            {`⬅`} 
        </div>
        </Link>
        <div>
        <Link to={'/publish'}>
        <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Write a Blog</button>
        </Link>
        </div>

    </div>
}