import conf from '../conf/conf.js';
import { Client,Account,ID } from 'appwrite';

export class AuthService{
    client = new Client()
    account;
    constructor(){
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
        //optimised as client and account are initialised only when the class is instantiated     
    }
    async createAccount({email, password, name}){
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if(userAccount) {
                //we call another method to directly login the user after creating the account
                return this.login({email, password});
            }
            else {
                return userAccount;
                //will handle error where createAccount is called but no user is created
            }
        } catch (error) {
            console.error('Error creating account:', error);
            throw error;
        }
    }
    async login({email, password}){
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.error('Error logging in:', error);
            throw error;
        }
    }
    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            // Only log unexpected errors, not the guest "missing scope" error
            if ( !error.message?.includes('missing scope') && !error.message?.includes('Unauthorized')){
                console.error('Error getting current user:', error);
            }
        }
        return null;
        //will return null if user is not logged in or error occurs
    }
    async logout(){
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.error('Error logging out:', error);
            throw error;
        }
    }
    //if in future we moved on from appwrite, we can just change function in the class and not in other files
}
const authService = new AuthService();
export default authService;