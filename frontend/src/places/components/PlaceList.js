import React from "react";
import Card from "../../shared/components/UIElements/Card";
import './PlaceList.css';
import PlaceItem from './PlaceItem';
import Button from "../../shared/components/FormElements/Button";
/*props are provided from UserPlaces file*/
const PlaceList = props=>{
    if(props.items.length===0){
        return (<div className="place-list center">
            <Card>
                <h2>
                    No places found, Maybe create one?
                </h2>
                <Button to="/places/new">Share Place</Button>
            </Card>
        </div>)
    }
    return (
        <ul className="place-list">
            {props.items.map(elem => <PlaceItem key={elem.id} 
            /*this is place id*/  
            id={elem.id} 
            image={elem.image}
             title={elem.title}
             description = {elem.description}
              address={elem.address}
               creatorId={elem.creator}
                coordinates={elem.location}
                // /***onDelete ={placeDeleteHandler(id)}****/
                onDelete={elem.onDeletePlace} /> )}

        </ul>
    )
};
export default PlaceList;