import { Client, Account, ID } from "appwrite";
import config from "../config/config";

export class Services {
  client;
  account;

  constructor() {
    this.client = new Client()
      .setEndpoint(config.appwrite_url)
      .setProject(config.appwrite_megablog);

    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      return await this.account.create(ID.unique(), email, password);
    } catch (error) {
      console.log("Appwrite: Create Account : error : ", error);
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.log("Appwrite: Login : error : ", error);
    }
  }

  async getAccount() {
    try {
        return await this.account.get();
    } catch (error) {
        console.log("Appwrite: Get Account : error : ", error);
    }
  }

  async logout() {
    try {
      return await this.account.deleteSession('current');
    } catch (error) {
      console.log("Appwrite: Logout : error : ", error);
      
    }
  }
}

const authService = new Services();

export default authService;
