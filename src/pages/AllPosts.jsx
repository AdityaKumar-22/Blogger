import { useState,useEffect } from "react"
import appwriteService from "../appwrite/config"
import { Container, PostCard } from "../components"
function AllPosts() {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
        if (posts) {
            setPosts(posts.documents)
        }
    })
    }, [])
    
  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap space-y-15 items-start align justify-start'>
                {posts.map((post) => (
                    <div key={post.$id} className='p-2 w-1/3'>
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
        </Container>
    </div>
  )
}

export default AllPosts