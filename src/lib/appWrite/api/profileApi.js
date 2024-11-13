import { ID, Query } from "appwrite";
import { account, appwriteConfig, database } from "../config";
const { databaseId, companyCollectionId } = appwriteConfig;

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
    if (!user) throw Error;
    const company = await database.listDocuments(
      databaseId,
      companyCollectionId,
      [Query.equal("userId", user.$id)]
    );
    return company.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function updateUser(id, data) {
  try {
    const company = await database.updateDocument(
      databaseId,
      companyCollectionId,
      id,
      data
    );
    return company;
  } catch (error) {
    console.log(error);
  }
}

export async function saveUnsaveJob(id, savedId) {
  const company = await database.getDocument(
    databaseId,
    companyCollectionId,
    id
  );
  const hasSaved = company.saved.map((save) => save.$id).includes(savedId);
  if (hasSaved) {
    const unsaved = await database.updateDocument(
      databaseId,
      companyCollectionId,
      id,
      {
        saved: company.saved.filter((save) => save.$id !== savedId),
      }
    );
    return unsaved;
  } else {
    const saveJob = await database.updateDocument(
      databaseId,
      companyCollectionId,
      id,
      {
        saved: [savedId, ...company.saved],
      }
    );
    return saveJob;
  }
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
  const result = await account.createEmailPasswordSession(email, password);
  return result;
}

export async function signout() {
  try {
    await account.deleteSession("current");
    console.log("User logged out successfully");
  } catch (error) {
    console.error("Error logging out:", error);
  }
}
