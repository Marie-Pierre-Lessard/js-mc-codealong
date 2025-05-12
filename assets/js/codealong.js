/* -------------------------------------------------------------------------------------------------------------------
This is how to define sections in a JavaScript file and provide documentation to colleagues (an explanation about how
this section of the code works/what it does). 
---------------------------------------------------------------------------------------------------------------------- */

/* MODALSKODE ----------------------------------------------------------------------------------------------- */

// Open button
const myModalButton = document.getElementById('modalButton');

/* Use a named function when you need to use a function more than once (DRY). 
Bo likes the convention of capitalising the first letter of function names because this is what is done in other programming languages. */
myModalButton.addEventListener('click', ShowHideModal);

// Close button
const myModalCloseButton = document.getElementById('kryds');
myModalCloseButton.addEventListener('click', ShowHideModal);


function ShowHideModal() {
    console.log('Modal opened/closed');
    
    const myModalContainer=document.getElementById('modal');
    /* The console.log always has to be after the declaration that defines the value in the console log, otherwise the script bugs! (It affects functionality.) */
    console.log(myModalContainer.classList);
    myModalContainer.classList.toggle('hidden');
};

/* FORMVALIDERINGSKODE ----------------------------------------------------------------------------------------------- */

/* Option 1 
(if <button id="submitButton" onclick="SubmitFormCallBack()">Indsend</button> is used in the markup)
Student's note: the alert is a popup message.

function SubmitFormCallBack() {
    console.log("Form submitted successfully!"); 
    alert("Form submitted successfully!");
}
*/

/* Option 2: there is no onclick attribute on the button with this option */
const mySubmitButton = document.getElementById("submitButton");
/* Til fejlfinding */
console.log(mySubmitButton);

/* An event listener needs two parameters:
1. an event: click, load, input, ...
2. a funtion to indicate what happens when the event happens. 
A scope is within curly brackets, unless it is a global scope (the whole file). */
mySubmitButton.addEventListener("click", (eventData)=> {
    console.log(eventData);
    // console.log("Button clicked!"); 
    // alert("Button clicked!");
    /* preventDefault is to stop the page from being refreshed. eventData is a parameter. It is also a data object. 
    TO DO: Teacher says that my formvalidering assignment should not work because I used different names for the parameter before preventDefault, i.e. they don't match. */
    eventData.preventDefault();

    /* value er en property på et HTML-element */
    const myName = document.getElementById("name").value;
    const myEmail = document.getElementById("email").value;
    // console.log(myName);
    // console.log(myEmail);

    /* DO NOT use innerHTML (hackers love it), it's a huge security issue! <h1>bo</h1> gets read as code, not as text. 
    Use textContent or innerText instead. E.g.: 

    let myError = document.getElementById("errorMessage");
    myError.innerText = myName;
    */

    /* Vurder navn */

    /* This has to be set to false... It becomes true if the condition below is upheld. */
    let myNameTest = false;
    let myEmailTest = false;

    /* If there is more than 1 character (at least 2), the name is validated. */
    /* A boolean expression can be true or false.
    Comparison operators (boolean expression): 
    < > (lower/higher than) 
    == (equal values)
    === (strict comparison: value and data type have to match)
    Logic operators: 
    && means and (both conditions have to be true)
    || means or 
    
    Regex for email validation that closely complies to the RFC 5322 standard: ^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$ 
    Source (found when I did the form-validering exercise): https://www.mailercheck.com/articles/email-validation-javascript 
    (The teacher shared it with the class.)
    * means required in a regular expression
    */
    if (myName.length > 1 && myName.length < 15) {
        myNameTest=true;
        console.log("Navn er OK");
    } else  {
        console.log("Navnet er for kort. Den skal være mere end 1 tegn.");
    }
    
    /* Method test returns true or false. It applies to regular expressions (regex). 
    You don't need to add asterisk in front of @, the + is sufficient. */
    /* This is not the regular expression that I found earlier (see above). 
    Source: */
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(myEmail)) {
        myEmailTest=true;
        console.log("Email er OK");
    } else  {
        console.log("Email er forkert. Den indeholder ikke de nødvendige tegn for at være en mailadresse.");
    }

    /* One could also write (myEmailTest==true && myNameTest==true) because the 2 ampersands imply that both have to be true for this condition to be met. */
    if (myEmailTest && myNameTest) {
    //    alert("alt er godt"); 
        document.getElementById('successMessage').innerText="Tak for info!";
        document.getElementById('errorMessage').innerText=""; //This clears any previous success message (from prior attempts).
        alert('Tak for din tilmelding!');
        // ShowHideModal();
    } 
    
    if (!myEmailTest) {
        console.log("Email er ikke OK.");
        document.getElementById('errorMessage').innerText="E-mail er forkert.";
        document.getElementById('successMessage').innerText=""; //This clears any previous success message (from prior attempts).
    } 
    
    if (!myNameTest) {
        console.log("Navn er ikke OK.");
        // In order to add the text to text that is already in the div, add a + sign like this. Otherwise, in this example, the text "Navn er forkert." will replace "E-mail er forkert." 
        document.getElementById('errorMessage').innerText +=" Navn er forkert.";
        document.getElementById('successMessage').innerText="";
    }
});


