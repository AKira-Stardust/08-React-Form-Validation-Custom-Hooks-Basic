import {useReducer} from "react";

const initialState = {
    inputValue: "",
    isInputTouched: false
}

function reducerFunction(prevState, action){
    switch (action.task) {
        case "INPUT":
            return{
                inputValue:action.payload, 
                isInputTouched:prevState.isInputTouched};
                    
        case "BLUR":
            return{
                inputValue:prevState.inputValue, 
                isInputTouched:true};
            
        case "RESET":
            return initialState;

        default:
            return prevState;
    }
}

function useInput2(validateValue){

  const [inputState, dispatch] = useReducer(reducerFunction, initialState);

  const isInputValid = validateValue(inputState.inputValue);
  const inputHasError = !isInputValid && inputState.isInputTouched;

  function inputChangeHandler(event){
    dispatch({task:"INPUT", payload: event.target.value});
  }

  function inputBlurHandler(event){
    dispatch({task:"BLUR"});
  }

  function reset(){
    dispatch({task:"RESET"})
  }

  return{
    value: inputState.inputValue,
    isInputValid,
    inputHasError,
    inputChangeHandler,
    inputBlurHandler,
    reset
  };

}

export default useInput2;