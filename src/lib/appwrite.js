import { Client, Account, ID } from "react-native-appwrite";

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

export const createUser = () => {
  account.create(ID.unique(), "me@example.com", "password", "Jane Doe").then(
    function (response) {
      console.log(response);
    },
    function (error) {
      console.log(error);
    }
  );
};
