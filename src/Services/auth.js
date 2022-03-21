import api from "./api";        

    const token =
        async function getToken(credentials, setHook, removeHook){
            await api.get('/validating', {
            headers: {
                Authorization: `Bearer ` +credentials //the token is a variable which holds the token
            }
        })
        .then(data => setHook('token',data.data.user))

        .catch((error) => {
            removeHook('token');
            console.error(error)
        })
        
    } 

export default token;