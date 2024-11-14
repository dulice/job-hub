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
  try {
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
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getNotifications = async (userId) => {
  try {
    const messages = await database.listDocuments(
      databaseId,
      messageCollectionId,
      [
        Query.and([
          Query.equal("receivedId", userId),
          Query.equal("isRead", false),
        ]),
      ]
    );
    const messageCount = messages.documents?.reduce((acc, msg) => {
      const conv = msg.conversationId;
      if (!acc[conv]) {
        acc[conv] = [];
      }
      acc[conv].push(msg);
      return acc;
    }, {});
    return { messageCount, totalCount: messages.total };
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const readMessages = async (conversationId, senderId) => {
  const messages = await database.listDocuments(
    databaseId,
    messageCollectionId,
    [
      Query.and([
        Query.equal("senderId", senderId),
        Query.equal("conversationId", conversationId),
        Query.equal("isRead", false),
      ]),
    ]
  );
  const updateMessages = messages.documents.map(
    async (msg) =>
      await database.updateDocument(databaseId, messageCollectionId, msg.$id, {
        isRead: true,
      })
  );
  return updateMessages;
};
