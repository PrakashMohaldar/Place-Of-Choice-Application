import React,{useContext} from "react";
import { useHistory } from "react-router-dom";
import Input from "../../shared/components/FormElements/Input";
import { VALIDATOR_REQUIRE } from "../../shared/util/validators";
import './NewPlace.css';
import { VALIDATOR_MINLENGTH } from './../../shared/util/validators';
import Button from "../../shared/components/FormElements/Button";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ImageUpload from './../../shared/components/FormElements/ImageUpload';


const NewPlace = ()=>{
    const auth = useContext(AuthContext)
    const{isLoading, error, sendRequest, clearError} = useHttpClient();
    /*input handler calls dispatch in form-hook to check if inputs given are right*/ 
  const [formState, inputHandler ] = useForm({
        title:{
            value:'',
            isValid:false
        },
        description:{
            value:'',
            isValid:false
        },
        address:{
            value:'',
            isValid:false
        },
        image:{
            value:null,
            isValid:false
        }
    }, false);
 

   
    const history =  useHistory()

    const placeSubmitHandler = async event =>{
        event.preventDefault();
        try{
            const formdata = new FormData();
            formdata.append('title', formState.inputs.title.value)
            formdata.append('description', formState.inputs.description.value)
            formdata.append('address', formState.inputs.address.value)
            formdata.append('creator', auth.userId)
            formdata.append('image', formState.inputs.image.value)
            await sendRequest(
                'http://localhost:5000/api/places',
                'POST',
                // /*converting to json*/ 
                // JSON.stringify({
                //   title: formState.inputs.title.value,
                //   description: formState.inputs.description.value,
                //   address: formState.inputs.address.value,
                //   creator: auth.userId
                // }),
                // {'Content-Type':'application/json'}
                formdata
            );
                /*redirecting after adding new place*/ 
                history.push('/');

        }catch(err){

        }
    }
    return (
    <>
        <ErrorModal error={error} onClear={clearError}/>
        <form className="place-form" onSubmit={placeSubmitHandler} >
            {/* validators checks whether the input field is provided with correct value */}
            {isLoading && <LoadingSpinner asOverlay/>}
            <Input 
            id="title"
            element="input"
             type="text" 
             label="Title"
              validators={[VALIDATOR_REQUIRE()]}
               errorText="Please enter a valid title"
               onInput={inputHandler}
                />
            <Input
            id="description"
             element="input"
             type="textarea" 
             label="Description"
              validators={[VALIDATOR_MINLENGTH(5)]}
               errorText="Please enter a valid decription(atleast 5 characters)"
               onInput={inputHandler}
                />
            <Input
            id="address"
             element="input"
             type="textarea" 
             label="Address"
              validators={[VALIDATOR_REQUIRE()]}
               errorText="Please enter a valid address"
               onInput={inputHandler}
                />
            <ImageUpload id="image" onInput={inputHandler} errorText="Please provide an image"/>
            <Button type="submit" disabled={!formState.isValid}>ADD PLACE</Button>
        </form>
    </>
        
    )
};

export default NewPlace