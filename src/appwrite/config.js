import conf from "../conf/conf";
import { Client, Databases, Storage, Query, ID } from "appwrite";

export class Service{
    client = new Client()
    databases;
    bucket;

    constructor(){
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
        //optimised as client and account are initialised only when the class is instantiated     
    }

    async createPost({title,slug,content,featuredImage,status,userId}){
        try{
            return await this.databases.createDocument(
                conf.appwriteDatabaseId, conf.appwriteCollectionId, slug,
                {
                    title,content,featuredImage,status,userId
                }
            )
        }
        catch(error){
            console.error('Error creating post:', error);
            throw error;
        }
    }
    async updatePost(slug,{title,content,featuredImage,status}){
        try{
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId, conf.appwriteCollectionId, slug,
                {
                    title,content,featuredImage,status
                }
            )
        }
        catch(error){
            console.error('Error updating post:', error);
            throw error;
        }
    }
    async deletePost(slug){
        try{
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId, conf.appwriteCollectionId, slug
            )
            return true;
        }
        catch(error){
            console.error('Error deleting post:', error);
            return false;
        }
    }
    async getPost(slug){
        try{
            return await this.databases.getDocument(
                conf.appwriteDatabaseId, conf.appwriteCollectionId, slug
            )
        }
        catch(error){
            console.error('Error getting post:', error);
            return false;
        }
    }
    async getPosts(query=[Query.equal('status', 'active')]){ //we have added indexes in collection in appwrite, so we can use Query
        try{
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId, conf.appwriteCollectionId, query
            )
        }
        catch(error){
            console.error('Error getting posts:', error);
            return false;
        }

    }

    //file (image) upload services
    async uploadFile(file){
        try{
            return await this.bucket.createFile(conf.appwriteBucketId, ID.unique(), file);
        }
        catch(error){
            console.error('Error uploading file:', error);
            return false;
        }
    }
    async deleteFile(fileId){
        try{
            await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
            return true;
        }
        catch(error){
            console.error('Error deleting file:', error);
            return false;
        }
    }
    getFileView(fileId){
        return this.bucket.getFileView(conf.appwriteBucketId, fileId
                //0, // width (optional)
                //0, // height (optional)
                //ImageGravity.Center, // gravity (optional)
               // 0, // quality (optional)
               // 0, // borderWidth (optional)
                //'', // borderColor (optional)
                //0, // borderRadius (optional)
                //0, // opacity (optional)
               // -360, // rotation (optional)
               // '', // background (optional)
        );
    }
}
const service= new Service();
export default service;