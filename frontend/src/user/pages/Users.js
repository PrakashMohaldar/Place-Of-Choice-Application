// users uses user list
import React,{useEffect,useState} from 'react';
import UsersList from '../components/UsersList';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { useHttpClient } from '../../shared/hooks/http-hook';

const Users = ()=>{
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [loadedUsers, setloadedUsers ] = useState();
    useEffect(()=>{

        const fetchUsers = async () =>{
            try{
            /*fetch by default sets GET method*/
            const responseData = await sendRequest('http://localhost:5000/api/users');
         
            setloadedUsers(responseData.users);

            }catch(err){

            }
        };
        fetchUsers(); 
    },[sendRequest])

    return(
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && <div className='center'> <LoadingSpinner/> </div>}

            {!isLoading && loadedUsers && <UsersList items={loadedUsers}/>}
            
        </React.Fragment>
    ) 
};
export default Users;