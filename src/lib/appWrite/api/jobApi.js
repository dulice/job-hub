import { ID, Query } from "appwrite";
import { appwriteConfig, database } from "../config";

const { databaseId, jobCollectionId } = appwriteConfig;

export async function getJobs({pageParam = 0, limit = 10}) {
    try {
      const jobs = await database.listDocuments(databaseId, jobCollectionId, [Query.limit(limit), Query.offset(pageParam)]);
      return {
        jobs: jobs.documents,
        nextPage: jobs.documents.length < limit ? null : pageParam + limit
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  export async function searchJobs(title, location) {
    try {
      const jobs = await database.listDocuments(databaseId, jobCollectionId, [
        Query.or([
          Query.search("title", title),
          Query.search("location", location),
        ]),
      ]);
      return jobs.documents;
    } catch (error) {
      console.log(error);
    }
  }
  
  export async function getJob(id) {
    try {
      const job = await database.getDocument(databaseId, jobCollectionId, id);
      return job;
    } catch (error) {
      console.log(error);
    }
  }
  
  export async function addJob(data) {
    const job = await database.createDocument(
      databaseId,
      jobCollectionId,
      ID.unique(),
      data
    );
    return job;
  }
  
  export async function putJob(id, data) {
    const jobs = await database.updateDocument(
      databaseId,
      jobCollectionId,
      id,
      data
    );
    return jobs;
  }
  
  export async function deleteJob(id) {
    try {
      const jobs = await database.deleteDocument(databaseId, jobCollectionId, id);
      return jobs;
    } catch (error) {
      console.log(error);
    }
  }