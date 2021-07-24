import React from "react";
import useInput from "../hooks/use-input";

const SimpleInput = (props) => {
  
  //Username validation variables and setup.
  const {
    value: inputName, 
    isValid: nameIsEntered,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: nameInputReset
  } = useInput( (value) => value.trim() !== "");

  //Email validation variables and setup.
  const {
    value: inputEmail, 
    isValid: emailIsEntered,
    hasError: emailIsNotValid,
    valueChangeHandler: inputEmailChangeHandler,
    inputBlurHandler: inputEmailBlurHandler,
    reset: emailInputReset
  } = useInput( (value) => value.includes("@"));
  
  //Form validation variables and setup.
  let formIsValid = false;
  if(nameIsEntered && emailIsEntered){
    formIsValid = true;
  } 
  
  //Form Submit Handler
  //onSubmit
  function formSubmitHandler(event){
    event.preventDefault();

    if (!formIsValid){ return; }
      
    nameInputReset();
    emailInputReset();
  }

  //Username styling setup
  const nameInputClass = nameInputHasError? 'form-control invalid' : 'form-control';

  //Email styling setup
  const emailInputClass = emailIsNotValid? 'form-control invalid' : 'form-control';

  return (
    <form onSubmit={formSubmitHandler}>

      <div className={nameInputClass}>
        <label htmlFor='name'>Your Name</label>
        <input 
          type='text' 
          id='name' 
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          value={inputName}
        />
        {nameInputHasError && <p className="error-text">Name cannot be empty!</p>}
      </div>

      <div className={emailInputClass}>
        <label htmlFor='email'>Email</label>
        <input 
          type='email' 
          id='email' 
          onChange={inputEmailChangeHandler}
          onBlur={inputEmailBlurHandler}
          value={inputEmail}
        />
        {emailIsNotValid && <p className="error-text">Check you email!</p>}
      </div>

      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>

    </form>
  );
};

export default SimpleInput;
