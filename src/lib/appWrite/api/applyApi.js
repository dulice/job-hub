import { ID, Query } from "appwrite"
import { appwriteConfig, database, storage } from "../config"
const { applyCollectionId, bucketId, databaseId } = appwriteConfig;

export const postApply = async (data) => {
    const apply = await database.createDocument(databaseId, applyCollectionId, ID.unique(), data);
    return apply;
}

export const getJobByUser = async (id) => {
    const applied = await database.listDocuments(databaseId, applyCollectionId, [Query.equal("user", id)])
    return applied.documents;
}

export const postResume = async (file) => {
    try {
        const image = await storage.createFile(bucketId, ID.unique(), file);
        if(!image) throw Error;
        const result = storage.getFileView(bucketId, image.$id);
        return result
    } catch (error) {
        console.log(error)
    }
}