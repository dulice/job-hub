import { ID, Query } from "appwrite";
import { appwriteConfig, database } from "../config";
const { databaseId, messageCollectionId } = appwriteConfig;

export const sendMessage = async (data) => {
  const newMessage = await database.createDocument(
    databaseId,
    messageCollectionId,
    ID.unique(),
    data
  );
  return newMessage;
};

export const getMessage = async (conversationId) => {
  const message = await database.listDocuments(
    databaseId,
    messageCollectionId,
    [Query.equal("conversationId", conversationId)]
  );
  return message.documents;
};

export const getChats = async (userId) => {
  const message = await database.listDocuments(
    databaseId,
    messageCollectionId,
    [
      Query.or([
        Query.equal("senderId", userId),
        Query.equal("receivedId", userId),
      ]),
    ]
  );
  const distinctItems = [
    ...new Map(
      message.documents.map((item) => [item.conversationId, item])
    ).values(),
  ];
  return distinctItems;
};
