import { appwriteConfig, database } from "./config";
import { ID } from "appwrite";

const { databaseId, jobCollectionId, companyCollectionId} = appwriteConfig;

export async function getJobs() {
    try {
        const jobs = await database.listDocuments(databaseId, jobCollectionId);
        return jobs.documents;
    } catch (error) {
        console.log(error);
    }
}

export async function getJob(id) {
    try {
        const job = await database.getDocument(databaseId, jobCollectionId, id)
        return job
    } catch (error) {
        console.log(error);
    }
}

export async function addJob(data) {
    try {
        const job = await database.createDocument(databaseId, jobCollectionId, ID.unique(), data);
        return job
    } catch (error) {
        console.log(error);
    }
}

export async function putJob(id, data) {
    try {
        const jobs = await database.updateDocument(databaseId, jobCollectionId, id, data);
        return jobs
    } catch (error) {
        console.log(error);
    }
}

export async function deleteJob(id) {
    try {
        const jobs = await database.deleteDocument(databaseId, jobCollectionId, id);
        return jobs
    } catch (error) {
        console.log(error);
    }
}