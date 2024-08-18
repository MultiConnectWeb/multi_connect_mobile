import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";
import UseUserStore from "../lib/userStore";
import UseChatStore from "../lib/chatStore";
import { View, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";

const App = () => {
    const route = useRouter();
    const { currentUser, isLoading, fetchUserInfo } = UseUserStore();
    const { chatId } = UseChatStore();

    useEffect(() => {
        const unSub = onAuthStateChanged(auth, (user) => {
            fetchUserInfo(user?.uid);
        });

        return () => {
            unSub();
        };
    }, [fetchUserInfo]);

    useEffect(() => {
        if (!isLoading) {
            if (currentUser) {
                chatId ? route.push('chat/chat') : route.push('chat/login');
            } else {
                route.push('chat/login');
            }
        }
    }, [isLoading, currentUser, chatId]);

    if (isLoading) return <View><ActivityIndicator size="large" color="#0000ff" /></View>;

    return <View />;
};

export default App;
