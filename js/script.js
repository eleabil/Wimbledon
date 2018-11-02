// admin page validation.
  //news title and text validation
function validate()
      {
      
         if( document.newsForm.title.value == "" )
         {
            alert( "Please add title!" );
            document.newsForm.title.focus() ;
            document.newsForm.title.style.border = "1px solid red";
            return false;
         }
         if (document.newsForm.text.value == "")
         {
         	alert('You have not added the text!')
         	document.newsForm.text.focus() ;
         	document.newsForm.text.style.border = "1px solid red";
            return false;
         } 
         
         alert('Your news is added!')
         return( true );
      }

  // image validation
function validateImage()
      {
      
         if( document.imageForm.file.value == "" )
         {
            alert( "Please add image!" );
            document.imageForm.file.focus() ;
            
            return false;
         }
         
         
         alert('Your image is added!');
         return( true );
      }      



// Fan page

function validateFans () 
		{
			txt = document.getElementById('fans').value; 
			if (txt = "")
			{

				alert ("You have not added the text!");
				document.getElementById('fans').style.border = "1px solid red";
				return false;

			} else {

			alert('Added!');
			return true;
	                 }
		}

/*

<p>Enter a number and click OK:</p>

<input id="id1" type="number" max="100">
<button onclick="myFunction()">OK</button>

<p>If the number is greater than 100 (the input's max attribute), an error message will be displayed.</p>

<p id="demo"></p>

function myFunction() {
    var txt = "";
    if (document.getElementById("id1").validity.rangeOverflow) {
        txt = "Value too large";
    } else {
        txt = "Input OK";
    } 
    document.getElementById("demo").innerHTML = txt;
}