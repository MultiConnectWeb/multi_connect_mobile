import { create } from 'zustand';
import UseUserStore from './userStore';

const UseChatStore = create((set) => ({
    chatId: null,
    user: null,
    isCurrentUserblocked: false,
    isRecieverBlocked: false,
    isLoading: true,
    changeChat: (chatId, user) =>{
        const currentUser = UseUserStore.getState().currentUser;

        // check if current user is blocked
        if(user.blocked.includes(currentUser.id)){
            return set({
                chatId: chatId,
                user: null,
                isCurrentUserblocked: true,
                isRecieverBlocked: false,
            });
        }
        // check if reciever is blocked
        else if(currentUser.blocked.includes(currentUser.id)){
            return set({
                chatId: chatId,
                user: user,
                isCurrentUserblocked: false,
                isRecieverBlocked: true,
            });
        }
        else{
            return  set({
                chatId: chatId,
                user: user,
                isCurrentUserblocked: false,
                isRecieverBlocked: false,
            });
        }

    },
    changeBlock: ()=>{
        set(state =>({
            ...state,isRecieverBlocked: !state.isRecieverBlocked
        }))
    }
}))

export default UseChatStore;