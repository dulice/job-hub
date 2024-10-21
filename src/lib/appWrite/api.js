import { account, appwriteConfig, database } from "./config";
import { ID, Query } from "appwrite";

const { databaseId, jobCollectionId, companyCollectionId } = appwriteConfig;

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

export async function deleteCompany(id) {
  try {
    const company = await database.deleteDocument(
      databaseId,
      companyCollectionId,
      id
    );
    return company;
  } catch (error) {
    console.log(error);
  }
}

export async function getCompany(id) {
  try {
    const company = await database.getDocument(
      databaseId,
      companyCollectionId,
      id
    );
    return company;
  } catch (error) {
    console.log(error);
  }
}

export async function getUser() {
  try {
    const user = await account.get();
    const company = await database.listDocuments(
      databaseId,
      companyCollectionId,
      [Query.equal("userId", user.$id)]
    );
    return company.documents[0];
  } catch (error) {
    console.log(error);
  }
}

export async function updateUser(id, data) {
  const company = await database.updateDocument(
    databaseId,
    companyCollectionId,
    id,
    data
  );
  return company;
}


export async function registerUser(data) {
  const result = await signUp(data);
  const { name, email, $id } = result;
  const company = await database.createDocument(
    databaseId,
    companyCollectionId,
    ID.unique(),
    {
      name,
      email,
      userId: $id,
      isCompany: data.isCompany,
      description: data.description,
      phone: data.phone,
    }
  );
  return company;
}

export async function signUp(data) {
  const { email, password, name } = data;
  try {
    const result = await account.create(ID.unique(), email, password, name);
    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function login(data) {
  const { email, password } = data;
  try {
    const result = await account.createEmailPasswordSession(email, password);
    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function signout() {
  await account.deleteSession("current");
}
