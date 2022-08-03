import React,{useState,useContext} from "react";
import { useHistory } from 'react-router-dom';
import Card from "../../shared/components/UIElements/Card";
import './PlaceItem.css';
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import Map from "../../shared/components/UIElements/Map";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
/*props data is provided in Place list*/ 
const PlaceItem = props=>{
    const {isLoading,error,sendRequest,clearError} = useHttpClient()
    const auth = useContext(AuthContext)
    const [showMap, setshowMap] = useState(false);
    const [showConfirmModal, setshowConfirmModal] = useState(false);


    const openMapHandler = () => {
        setshowMap(true);
    }
    const closeMapHandler = () => {
        setshowMap(false);
    }
    const showDeleteWarningHandler = () =>{
        setshowConfirmModal(true);
    }
    const cancelDeleteHandler = () =>{
        setshowConfirmModal(false);
    };
    const history = useHistory();
    const confirmDeleteHandler = async () =>{
        setshowConfirmModal(false);
        try{
            await sendRequest(`http://localhost:5000/api/places/${props.id}`,'DELETE');

            props.onDelete(props.id)
            console.log('Deleting...')

        }catch(err){}
        history.push('/');
    }
    return(
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError}/>
            {/* opening maps on clicking view map */}
            <Modal show={showMap}
            onCancel = {closeMapHandler}
             header={props.address}
              contentClass="place-item__modal-content"
               footerClass="place-item__modal-actions"
               footer={
                    <Button onClick={closeMapHandler}>CLOSE</Button> 
               } >

                <div className="map-container">
                    <Map center={props.coordinates} zoom={16}/>
                </div>
            </Modal>
            {/* showing warning when deleting place*/}
            <Modal show={showConfirmModal}
               onCancel = {cancelDeleteHandler}
               header="Are you sure?"
               footerClass="place-item__modal-actions"
               footer={
                <React.Fragment>
                    <Button inverse onClick={cancelDeleteHandler}>CANCEL</Button> 
                    <Button inverse onClick={confirmDeleteHandler}>DELETE</Button> 
                </React.Fragment>
               }>
              <p>              
              Do you want to proceed and delete this place? Please note that it
          can't be undone thereafter.
                </p> 

            </Modal>

        <li className="place-item">
            <Card className="place-item__content">
                {isLoading && <LoadingSpinner asOverlay/>}
                <div className="place-item__image">
                    <img src={`http://localhost:5000/${props.image}`} alt={props.title}/>
                </div>
                <div className="place-item__info">
                    <h2>{props.title}</h2>
                    <h3>{props.address}</h3>
                    <p>{props.description}</p>
                </div>
                <div className="place-item__actions">
                    <Button inverse onClick={openMapHandler}>VIEW ON MAP</Button>
                    {/* edit button is avalialble only for the user who unploaded it */}
                    {auth.userId === props.creatorId && 
                        (<Button to={`/places/${props.id}`}>EDIT</Button>)
                    }
                    {auth.userId === props.creatorId && 
                         (<Button danger onClick={showDeleteWarningHandler}>DELETE</Button>)     
                    }
                </div>
            </Card>
           
        </li>
        </React.Fragment>

     
    )
};
export default PlaceItem;