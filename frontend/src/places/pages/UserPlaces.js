// fetches places of a particularuser from backend and shows it
import React,{useEffect,useState} from 'react'
import { useParams } from 'react-router-dom';
import PlaceList from '../components/PlaceList';
import { useHttpClient } from '../../shared/hooks/http-hook';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

const UserPlaces = (props)=>{
    const {isLoading, error, sendRequest,clearError} = useHttpClient();
    const [loadedPlaces, setloadedPlaces] = useState()

    /*dyamic parameter in url, we get userId from the url we input*/ 
    /*check app.js */ 
    const userId = useParams().userId;
    useEffect(()=>{
        /*getPlacesByuserId*/ 
        const fetchPlaces = async () =>{
            try{
              const responseData =  await sendRequest(
                    `http://localhost:5000/api/places/user/${userId}`
                );
       
                setloadedPlaces(responseData.places)
  
            }catch(err){
                
            }
           
        }
        fetchPlaces();
    },[sendRequest,userId])

    const placeDeleteHandler = (deletedPlaceId) =>{
        setloadedPlaces(prevPlaces => prevPlaces.filter(
            elem => elem.id !== deletedPlaceId
        ));
    }

    return(
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError}/>
            {isLoading && (
                <div className='center'>
                    <LoadingSpinner/>
                </div>
            ) }
            {!isLoading && loadedPlaces && (<PlaceList items={loadedPlaces} onDeletePlace={placeDeleteHandler}/>) }
            
        </React.Fragment>
    )
};

export default UserPlaces;