(function(){
    //Get all elements
    const infoBox = $('#display > .info');
    const outputBox = $('#display > .output');
    const dividerInput = $('#extract-form input#seperator');
    const noteInput = $('#extract-form textarea[name="note"');
    const btnFilter = $('#extract-form  .btn-filter');
    const newLineCheck = document.querySelector('#new-line')

    //functions
    const displayMsg = function(msg = false, error = true){
        if(msg == false){
            outputBox.html('')
            return
        }

        if(error == true){
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
        `)}

        window.scrollTo(0,0)
    }

    const showOutput = function(data = false){
        if(data == false){
            outputBox.html('')
            return
        }

        let output = `
            <div class='alert-info alert text-dark p-3 mb-3'>
                <p><strong class='text-danger'>Scanned Characters:</strong> ${data.scanned}</p>
                <p><strong class='text-danger'>Numbers Found:</strong> ${data.others}</p>
                <p><strong class='text-danger'>Phone Numbers Found:</strong> ${data.filtered}</p>
                <p><strong class='text-danger'>Total Numbers Found:</strong> ${data.totalNumbers}</p>
            </div>
            <h3 class='text-info'>Click to copy</h3>
            `

        if(data.outputFilter.length > 0){
            output += `
            <h4>Phone Numbers</h4>
            <p class='my-3 p-2 bg-success text-white font-weight-bold can-copy'>${data.outputFilter}</p>
            `
        }

        if(data.outputNoFilter.length > 0){
            output += `
            <h4>Normal Numbers</h4>
            <p class='my-3 p-2 bg-warning font-weight-bold can-copy'>${data.outputNoFilter}</p>
            `
        }

        outputBox.html(output)
        window.scrollTo(0,0)
    }

    const print = function(data){
        infoBox.html(data)
        window.scrollTo(0,0)
    }



    btnFilter.on('click', function(e){
        e.preventDefault()
        let note, divider, allNumbers, phoneNumbers, standAlone;
        let data = {}

        note = noteInput.val()
        divider = dividerInput.val()
        standAlone = newLineCheck.checked
        

        //reset all output
        displayMsg()
        showOutput()

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
        allNumbers = allNumbersArray
        phoneNumbers = allNumbersArray.filter(value => value.length >= 11)
        otherNumbers = allNumbersArray.filter(value => value.length < 11)

        data.scanned = note.length // total characters submitted by user
        data.totalNumbers = allNumbers.length // total characters submitted by user
        data.others = otherNumbers.length //none phone numbers found
        data.filtered = phoneNumbers.length //total filtered phone numbers

        if(standAlone){
            divider+='\n<br>'
        }
        

        data.outputFilter = phoneNumbers.join(divider + ' ')
        data.outputNoFilter = otherNumbers.join(divider + ' ')
        print(`
            <div class='display-2 text-info text-center'>
                Working on it...
            </div>
        `)

        setTimeout(() => {
            displayMsg('Sucessfully Scanned', false);
            showOutput(data)
            window.scrollTo(0,0)
            //bind new elements to the click to copy event
            $('.can-copy').on('click',function(){
                var $temp = $("<textarea>");
                $("body").append($temp);
                $temp.html($(this).text()).select();
                document.execCommand("copy");
                $temp.remove();
                alert('copied')
            }) 
        }, 2000);
        
    })

    

})()
