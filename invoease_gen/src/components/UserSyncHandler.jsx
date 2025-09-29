import { useAuth, useUser } from "@clerk/clerk-react";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { UserRoundIcon } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

const UserSyncHandler = () => {
    const [synched, setSynched] = useState(false);
    const {isLoaded, isSignedIn, getToken} = useAuth();
    const {user} = useUser();
    const {baseURL} = useContext(AppContext);
    
    useEffect(() => {
        const saveUser = async() => {
            if(!isLoaded || !isSignedIn || synched){
                return;
            }

            try{
                const token = await getToken();
                const userData = {
                    clerkId: user.id,
                    email: user.primaryEmailAddress.emailAddress,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    photoUrl: user.imageUrl
                }

                await axios.post(baseURL + "/users", userData, {headers: {Authorization: `Bearer ${token}`}});

                setSynched(true);
            }
            catch(error){
                toast.error(error.message);
            }
        }
        saveUser();
    }, [isLoaded, isSignedIn, getToken, user, synched]);
    
    return null;
}

export default UserSyncHandler;