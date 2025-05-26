import { Link } from "react-router-dom"
import service from "../appwrite/config"

function Postcard({$id,title,featuredImage}) {
  return (
      <Link to={`/post/${$id}`} /*className="block w-full h-64 bg-gray-200 rounded-lg overflow-hidden relative group"*/>
        <div className='h-115 flex flex-col items-center w-full hover:bg-[#85847e] hover:shadow-2xl rounded-xl p-4 transition-colors duration-200'>
            <div className=' flex justify-center items-center align-middle mb-4 '>
                <img src={service.getFileView(featuredImage)} alt={title} className='rounded-xl h-70' />
            </div>
            <h2 className='text-4xl font-bold text-ellipsis line-clamp-2 w-full'>{title}</h2>
        </div>
      </Link>
    )
}

export default Postcard
