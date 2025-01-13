import SignIn from "@/app/(auth)/sign-in";
import {
  Client,
  Account,
  Storage,
  Avatars,
  Databases,
  ID,
  Query,
} from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.zyk.aira",
  projectId: "677d89340002df1ea402",
  databaseId: "677d8e9c000fdd94a3e0",
  userCollectionId: "677d8f58000726ca43bb",
  videoCollectionId: "677e460300129dfe4824",
  storageId: "677e4a1a0018c34f8e29",
};

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

const account = new Account(client);
const storage = new Storage(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// Register user
export async function createUser(email:string, password:string, username:string) {
  try {
    const newAccount = await account.create(ID.unique(), email, password, username);

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        username: username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    throw new Error(error);
  }
}

// const retryWithBackoff = async (fn, retries = 3, delay = 1000) => {
//   try {
//     return await fn();
//   } catch (error) {
//     if (retries > 0 && error.message.includes("limit endpoint exceeded")) {
//       console.log(`Retrying... (${retries} left)`);
//       await new Promise((resolve) => setTimeout(resolve, delay));
//       return retryWithBackoff(fn, retries - 1, delay * 2);
//     }
//     throw error;
//   };
// };

// await retryWithBackoff(() => createUser(email, password, username));

export async function signIn(email, password) {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    throw new Error(error);
  }
}



// Get Account
export async function getAccount() {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error) {
    throw new Error(error);
  }
}

// Get Current User
export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

// Sign Out
export async function signOut() {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (error) {
    throw new Error(error);
  }
}

//Get All post
export async function getAllPosts() {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}


// Get latest created video posts
export async function getLatestPosts() {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(5)]
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}