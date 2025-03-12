import { Client, Databases, ID, Query, Storage } from "appwrite";
import config from "../config/config";

class Services {
  client;
  database;
  storage;

  constructor() {
    this.client = new Client()
      .setEndpoint(config.appwrite_url)
      .setProject(config.appwrite_megablog);

    this.database = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  //   database services

  //   data is an object
  async createPost(data) {
    try {
      return await this.database.createDocument(
        config.appwrite_database,
        config.appwrite_collection,
        ID.unique(),
        data
      );
    } catch (error) {
      console.log("Appwrite :: Create Post :: Error :: ", error);
    }
  }

  // id of the post
  async getPost(id) {
    try {
      return await this.database.getDocument(
        config.appwrite_database,
        config.appwrite_collection,
        id
      );
    } catch (error) {
      console.log("Appwrite :: Get Post :: Error :: ", error);
    }
  }

  async getPosts(queries = []) {
    try {
      return await this.database.listDocuments(
        config.appwrite_database,
        config.appwrite_collection,
        queries
      );
    } catch (error) {
      console.log("Appwrite :: Get Posts :: Error :: ", error);
    }
  }

  // async allPosts () {
  //   try {
  //     return await this.database.listDocuments
  //   } catch (error) {
  //     console.log("Appwrite: All Posts : Error : ", error);

  //   }
  // }

  async updatePost(id,data) {
    try {
      return await this.database.updateDocument(
        config.appwrite_database,
        config.appwrite_collection,
        id,
        data
      );
    } catch (error) {
      console.log("Appwrite :: Update Post :: Error :: ", error);
    }
  }

  async deletePost(id) {
    try {
      return await this.database.deleteDocument(
        config.appwrite_database,
        config.appwrite_collection,
        id
      );
    } catch (error) {
      console.log("Appwrite :: delete Post :: Error :: ", error);
    }
  }

  //  storage services

  async uploadFile(file) {
    try {
      return await this.storage.createFile(
        config.appwrite_bucket,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite :: Upload File :: Error :: ", error);
    }
  }

  //   here featuredImage stands for id of file

  async getFile(fileId) {
    return await this.storage.getFilePreview(config.appwrite_bucket, fileId);
  }

  async updateFile(featuredImage) {
    try {
      return await this.storage.updateFile(
        config.appwrite_bucket,
        featuredImage
      );
    } catch (error) {
      console.log("Appwrite :: Update File :: Error :: ", error);
    }
  }

  async deleteFile(featuredImage) {
    try {
      return await this.storage.deleteFile(
        config.appwrite_bucket,
        featuredImage
      );
    } catch (error) {
      console.log("Appwrite :: Delete File :: Error :: ", error);
    }
  }
}

const appwrite = new Services();

export default appwrite;
