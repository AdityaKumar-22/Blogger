import {useEffect, useState} from 'react'
import appwriteService from "../appwrite/config";
import {Container, PostCard} from '../components'
import { useSelector } from "react-redux";
import login from '../assests/Login-amico.svg';
import createPost from '../assests/createPost.svg';

function Home() {
    const [posts, setPosts] = useState([])
    const Authstatus = useSelector((state) => state.auth.status);
    const userData = useSelector((state) => state.auth.userData);
    useEffect(() => {
        //let posts empty for guests
        if(Authstatus){
            appwriteService.getPosts().then((posts) => {
                if (posts) {
                    console.log(posts)
                    //filter posts to only show users posts
                    const userPosts = posts.documents.filter((post) => post.userId === userData.$id);
                    setPosts(userPosts);
                }
            })
        }
        else{
            setPosts([])    
        }
    }, [Authstatus,userData])

    if(Authstatus && posts.length === 0){ //if user is logged in but has no posts
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-3xl font-bold">
                                <img src={createPost} alt="CreatePost illustration" className="w-1/3 mx-auto mb-4" />
                                Add your blog !!!
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    else if (posts.length === 0) { //if user is not logged in
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-3xl font-bold">
                                <img src={login} alt="Login illustration" className="w-1/3 mx-auto mb-4" />
                                Login to read posts !!!
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return ( 
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
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

export default Home