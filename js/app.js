(function(){
    //Get all elements
    const infoBox = $('#display > .info');
    const outputBox = $('#display > .output');
    const dividerInput = $('#extract-form input#seperator');
    const noteInput = $('#extract-form textarea[name="note"');
    const btnFilter = $('#extract-form  .btn-filter');

    //functions
    const displayMsg = function(msg, error = true){
        if(error === true){
            infoBox.html(`
                <div class='alert alert-danger'>
                <strong>Error: </strong> ${msg}
                </div>
            `)
        }else{
        infoBox.html(`
            <div class='alert alert-success'>
               <strong>Done!: </strong> ${msg}
            </div>
        `)
       }
        
        window.scrollTo(0,0)
    }

    const showOutput = function(data){
        infoBox.html(`
            <div class='bg-dark text-white p-3 mb-3'>
                <p><strong>Scanned: ${data.scanned}</p>
                <p><strong>Found: ${data.found}</p>
                <p><strong>Filtered: ${data.filtered}</p>
            </div>
            <h4>Phone Numbers</h4>
            <p class='my-3 p-2 text-justify'>${data.outputFilter}</p>
            <h4>Normal Numbers</h4>
            <p class='my-3 p-2 text-justify'>${data.outputNoFilter}</p>
        `);
        window.scrollTo(0,0)
    }

    const print = function(data){
        infoBox.html(data)
        window.scrollTo(0,0)
    }



    btnFilter.on('click', function(e){
        e.preventDefault()
        let note, divider, allNumbers, phoneNumbers;
        let data = {}

        note = noteInput.val()
        divider = dividerInput.val()

        if(note.length < 1){
            displayMsg('Content Field Cannot be empty. Please enter something'); 
            return; 
        }

        let allNumbersArray = note.match(/\++234([0-9]*)|([0-9]{2,11})/gi)

        //Check if any phone number format was mached
        if(!allNumbersArray){
            displayMsg('Sorry! Number not found in the provided data. Please try another'); 
            return;
        } 

        //remove all numbers that are not valid phone numbers
        phoneNumbers = allNumbersArray.filter(value => value.length >= 11)
        otherNumbers = allNumbersArray.filter(value => value.length < 11)

        data.scanned = note.length // total characters submitted by user
        data.found = allNumbersArray.length //numbers found
        data.filtered = phoneNumbers.length //toatl filtered numbers

        data.outputFilter = phoneNumbers.join(divider + ' ')
        data.outputNoFilter = otherNumbers.join(divider + ' ')
        print(`
            <div class='display-2 text-info text-center'>
                Working on it...
            </div>
        `)

        setTimeout(() => {
            displayMsg('Sucessfully Scanned', true);
            showOutput(data)
            window.scrollTo(0,0) 
        }, 5000);
        
    })


})()



 
