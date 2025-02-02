import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  query, 
  where, 
  orderBy, 
  limit, 
  onSnapshot,
  serverTimestamp,
  getDocs 
} from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import Constants from "expo-constants";

const firebaseConfig = {
  apiKey: Constants.expoConfig?.extra?.firebaseApiKey,
  authDomain: Constants.expoConfig?.extra?.firebaseAuthDomain,
  projectId: Constants.expoConfig?.extra?.firebaseProjectId,
  storageBucket: Constants.expoConfig?.extra?.firebaseStorageBucket,
  messagingSenderId: Constants.expoConfig?.extra?.firebaseMessagingSenderId,
  appId: Constants.expoConfig?.extra?.firebaseAppId,
  measurementId: Constants.expoConfig?.extra?.firebaseMeasurementId
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);

// 聊天相關功能
export async function sendMessage(userId: string, text: string, isAI: boolean = false) {
  try {
    if (!userId) throw new Error("用戶未登入");
    
    const messagesRef = collection(db, "messages");
    const messageData = {
      userId,
      text,
      timestamp: serverTimestamp(),
      isAI: isAI,
      createdAt: new Date().toISOString(),
    };

    const docRef = await addDoc(messagesRef, messageData);
    return docRef.id;
  } catch (error) {
    console.error("發送訊息失敗:", error);
    throw error;
  }
}

export function subscribeToMessages(userId: string, callback: (messages: any[]) => void) {
  if (!userId) return () => {};

  const messagesRef = collection(db, "messages");
  
  try {
    // 嘗試使用主要查詢
    const q = query(
      messagesRef,
      where("userId", "==", userId),
      orderBy("timestamp", "desc"),
      limit(50)
    );

    return onSnapshot(
      q, 
      (snapshot) => {
        const messages = snapshot.docs
          .map(doc => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter(message => message.timestamp);
        callback(messages);
      },
      async (error) => {
        console.error("訂閱消息失敗:", error);
        
        // 如果主要查詢失敗，使用備用查詢
        if (error.code === 'failed-precondition') {
          console.log("使用備用查詢...");
          // 使用簡單查詢
          const simpleQuery = query(
            messagesRef,
            where("userId", "==", userId),
            limit(50)
          );

          return onSnapshot(simpleQuery, (snapshot) => {
            const messages = snapshot.docs
              .map(doc => ({
                id: doc.id,
                ...doc.data(),
              }))
              .sort((a, b) => {
                // 使用 createdAt 進行排序
                const timeA = new Date(a.createdAt).getTime();
                const timeB = new Date(b.createdAt).getTime();
                return timeB - timeA;
              });
            callback(messages);
          });
        }
      }
    );
  } catch (error) {
    console.error("設置訂閱失敗:", error);
    return () => {};
  }
}

// 新增：檢查用戶是否有權限
export async function checkUserPermissions(userId: string) {
  if (!userId) return false;
  
  try {
    const messagesRef = collection(db, "messages");
    const q = query(messagesRef, where("userId", "==", userId), limit(1));
    await getDocs(q);
    return true;
  } catch (error) {
    console.error("檢查權限失敗:", error);
    return false;
  }
} 