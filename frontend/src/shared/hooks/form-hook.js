import {useCallback,useReducer} from 'react';


const formReducer = (state,action) =>{
    switch (action.type){
        case 'INPUT_CHANGE':
            let formIsValid = true;
            for(const elem in state.inputs){
                if(!state.inputs[elem]){
                    continue;
                }

                /*action input is given in dispatch*/ 
                if(elem === action.inputId){
                    formIsValid = (formIsValid && action.isValid);
                }else{
                    /*if we have one false validity anywhere whole thing will turn false*/ 
                    formIsValid = (formIsValid && state.inputs[elem].isValid);
                }
            }
        return{
            ...state,
            inputs:{
                ...state.inputs,
                [action.inputId]:{value:action.value, isValid:action.isValid}
            },
            isValid: formIsValid
        };
        case 'SET_DATA':
            return{
                inputs: action.inputs,
                isValid: action.formIsValid
            }
        default:
            return state;
    }
}



/*taking parameters as initial states of input fields and isValid */ 
export const useForm = (initialInputs, initialFormValidity) =>{

    const [formState,dispatch] = useReducer(formReducer,{
        /*this state is for individual input fields*/ 
        inputs: initialInputs,
        /*this state is for all input field all together*/ 
        isValid: initialFormValidity
    });

    const inputHandler = useCallback((id,value,isValid)=>{
        dispatch({
        type:'INPUT_CHANGE',
         value: value,
          isValid:isValid,
           inputId:id})
    },[]);

    const setFormData = useCallback((inputData, formValidity)=>{
        dispatch({
            type:'SET_DATA',
            inputs: inputData,
            formIsValid: formValidity
        });
    },[]);
    return [formState, inputHandler,setFormData];
};