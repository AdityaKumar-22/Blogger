import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8 mb-20">
            <Container>
                <div className="w-full flex justify-center mb-10 relative rounded-xl p-2 ">
                    <img
                        src={appwriteService.getFileView(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl h-120"
                    />                    
                </div>
                <div className="w-full px-2 mb-6 flex justify-between items-center">
                    <h1 className="text-6xl font-bold">{post.title}</h1>
                    {isAuthor && (
                        <div className=" flex gap-3">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="none" className="w-15 h-15 flex items-center justify-center rounded-full hover:bg-green-500/40 cursor-pointer  ">
                                    <span className="material-symbols-outlined">draw</span>
                                </Button>
                            </Link>
                            <Button bgColor="none" className="w-15 h-15 flex items-center justify-center rounded-full hover:bg-red-500/40 cursor-pointer " onClick={deletePost}>
                                <span className="material-symbols-outlined">delete_forever</span>
                            </Button>
                        </div>
                    )}
                </div>
                <div className="browser-css text-3xl">
                    {parse(post.content)}
                    </div>
            </Container>
        </div>
    ) : null;
}