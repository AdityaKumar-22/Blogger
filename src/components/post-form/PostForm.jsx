import { useForm, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useCallback } from "react";
import { Input, Button, Select, RTE } from '../index'
import appwriteService from "../../appwrite/config";
import { ImageUpload } from "../index"

export default function PostForm({post}){
    const {register,handleSubmit, watch, setValue,control, getValues} = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
            image: null
        }
    });
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    // const submit = async (data) => {
    //     if (post) {
    //         const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

    //         if (file) {
    //             appwriteService.deleteFile(post.featuredImage);
    //         }

    //         const dbPost = await appwriteService.updatePost(post.$id, {
    //             ...data,
    //             featuredImage: file ? file.$id : undefined,
    //         });

    //         if (dbPost) {
    //             navigate(`/post/${dbPost.$id}`);
    //         }
    //     } else {
    //         const file = await appwriteService.uploadFile(data.image[0]);

    //         if (file) {
    //             const fileId = file.$id;
    //             data.featuredImage = fileId;
    //             const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });

    //             if (dbPost) {
    //                 navigate(`/post/${dbPost.$id}`);
    //             }
    //         }
    //     }
    // };
    const submit = async (data) => {
        let file = null;

        if (data.image instanceof File) {
            file = await appwriteService.uploadFile(data.image);
            if (post) {
            appwriteService.deleteFile(post.featuredImage);
            }
        }

        const payload = {
            ...data,
            featuredImage: file ? file.$id : post?.featuredImage, // keep existing if not changed
        };

        const dbPost = post
            ? await appwriteService.updatePost(post.$id, payload)
            : await appwriteService.createPost({ ...payload, userId: userData.$id });

        if (dbPost) {
            navigate(`/post/${dbPost.$id}`);
        }
    };
    
    const slugTransform=useCallback((value)=>{
        if(!value) return "";
        return value.trim().toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "");
    },[])

    useEffect(() => {
        const subscription = watch((value,{name})=>{
            if(name === 'title') setValue('slug',slugTransform(value.title), {shouldValidate:true}); 
        })
        return ()=>{
            subscription.unsubscribe();
        }
    }, [watch, setValue, slugTransform]);
    

    return (
         <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-1/2 px-2">
                <Input label='Title: ' placeholder='Click to add title' className='mb-4 text-xl' {...register('title',{required:true})} />
                <Input label='Slug: ' placeholder='Slug' className='mb-4 text-xl' {...register('slug',{required:true})} 
                    onInput={(e)=>{setValue('slug',slugTransform(e.currentTarget.value), {shouldValidate:true})
                    }} //user can also manually change slug
                />
                {/* <ImageUpload label='Image: ' name='image' setValue={setValue} {...register('image',{required:!post})} /> */}
                <Controller
  name="image"
  control={control}
  rules={{ required: !post }}
  render={({ field }) => (
    <ImageUpload
      label="Image: "
      value={field.value || (post ? appwriteService.getFileView(post.featuredImage) : null)}
      onChange={field.onChange}
    />
  )}
/>
                {/* <Input label='Image: ' type='file' className='mb-4'
                accept='image/png, image/jpg, image/jpeg, image/gif' {...register('image', {required:!post})} /> */}              
                {post && (
                    <div className="w-full mb-4">
                        <img src={appwriteService.getFileView(post.featuredImage)} alt={post.title} className=" mb-4" />
                    </div>
                )}
                <Select options={["active","inactive"]} label='Status' className="mb-4 bg-[#1e1f0a]" {...register('status',{required:true})} />
                <Button type="submit" bgColor="#1e1f0a">{post ? "Update" : "Add"}</Button>
                {/*<Button type="button" className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => navigate(-1)}>Cancel</Button>*/}
            </div>
            <div className="w-1/2 px-2">
                <RTE label='Content: ' name='content' control={control} defaultValue={getValues('content')} />
            </div>
         </form>
    )
}