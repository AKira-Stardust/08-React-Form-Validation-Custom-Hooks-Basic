import React from "react";
import useInput2 from "../hooks/use-input2";


const BasicForm = (props) => {

  //CUSTOM HOOK CALL - FOR fName
  const {
    value: fName,
    isInputValid: isFNameValid,
    inputHasError: fNameHasError,
    inputChangeHandler: fNameChangeHandler,
    inputBlurHandler: fNameBlurHandler,
    reset: fNameReset
  } = useInput2( value => value.trim() !== "");

  //CUSTOM HOOK CALL - FOR lName
  const {
    value: lName,
    isInputValid: islNameValid,
    inputHasError: lNameHasError,
    inputChangeHandler: lNameChangeHandler,
    inputBlurHandler: lNameBlurHandler,
    reset: lNameReset
  } = useInput2( value => value.trim() !== "");

  //CUSTOM HOOK CALL - FOR email
  const {
    value: email,
    isInputValid: isEmailValid,
    inputHasError: emailHasError,
    inputChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: emailReset
  } = useInput2( value => value.includes("@") );


  //FORM VALIDITY CHECK
  let formIsValid = false;                                  
  if (isFNameValid && islNameValid && isEmailValid) { formIsValid = true;}                


  //FORM SUBMIT HANDLER
  function formSubmitHandler(event){
    event.preventDefault();

    if (!formIsValid){
      console.log("Error!"); 
      return;
    }

    fNameReset();
    lNameReset();
    emailReset();
  }


  //DYNAMICALLY SETUP STYLE CLASSES
  const fNameStyleClass = fNameHasError? 'form-control invalid' : 'form-control'
  const lNameStyleClass = lNameHasError? 'form-control invalid' : 'form-control'
  const emailStyleClass = emailHasError? 'form-control invalid' : 'form-control'


  //RETURN JSX CODE
  return (
    <form onSubmit={formSubmitHandler}>

      <div className='control-group'>

        <div className={fNameStyleClass}>
          <label htmlFor='name'>First Name</label>
          <input 
            type='text'  
            id='fname'
            value={fName}
            onChange={fNameChangeHandler}
            onBlur={fNameBlurHandler} 
          />
          { fNameHasError && <p className="error-text">Please enter your First Name.</p>}
        </div>

        <div className={lNameStyleClass}>
          <label htmlFor='name'>Last Name</label>
          <input 
            type='text' 
            id='lname'
            value={lName}
            onChange={lNameChangeHandler}
            onBlur={lNameBlurHandler} 
          />
          { lNameHasError && <p className="error-text">Please enter your Last Name.</p>}
        </div>

      </div>
      
      <div className={emailStyleClass}>
        <label htmlFor='name'>E-Mail Address</label>
        <input 
          type='email' 
          id='email' 
          value={email}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler} 
        />
        { emailHasError && <p className="error-text">Please check your email.</p>}
      </div>

      <div className='form-actions'>
        <button disabled={!formIsValid}>Submit</button>
      </div>

    </form>
  );
};

export default BasicForm;
