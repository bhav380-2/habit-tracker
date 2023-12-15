//_________________________shows notifications_______________________
function showNotification(type, message) {
    new Noty({
        theme: 'relax',
        text: message,
        type: type,
        layout: 'topRight',
        timeout: 1500

    }).show();
}

// _____________________________updates habit status throught ajax request__________________________________

function updateHabitStatus(status){

    $(status).on('click',(e)=>{
        e.preventDefault();

        $.ajax({  //sends ajax req
            type: 'put',
            url: $(status).attr('href'),

            success: function (data) {

                let icon = $(status).find('i').get(0)

                // _______toggling habit status icons___________
                if(data.data.status=='completed'){                   
                    icon.classList.remove('fa-minus-circle');
                    icon.classList.add('fa-check-circle');

                }else if(data.data.status=='skipped'){
                    icon.classList.remove('fa-times-circle');
                    icon.classList.add('fa-minus-circle');
                }else{
                    icon.classList.remove('fa-check-circle');
                    icon.classList.add('fa-times-circle');
                }
            },

            error: function (error) {
                console.log(error);
            }
        });
    });
}


// ________iterates on each habit status and calls updateHabitStatus func___________
function handleUpdateHabitStatus() {

    let statuses = $('.toggle-status')
    console.log(statuses);

    for(let status of statuses){
        updateHabitStatus(status);
    }
}

// ______________________________________add to favorites through ajax requests__________________________
function addToFavorite(favBtn){

    $(favBtn).on('click',(e)=>{

        e.preventDefault();

        $.ajax({
            type:'put',
            url: $(favBtn).attr('href'),

            success: function (data) {

                let icon = $(favBtn).find('i').get(0);

                if(!data.data.isAdded){
                    icon.classList.remove('fas');
                    icon.classList.add('far');
                }else{
                    icon.classList.remove('far');
                    icon.classList.add('fas');
                }

                showNotification("success",data.message);
            },

            error: function (error) {
                console.log(error);
            }
        })
    })
}

// ______iterates on each add to favorites button and calls addToFavorite function_______
function handleAddToFavorites(){

    let favButtons = $('.favorite');

    for(let favBtn of favButtons){
        addToFavorite(favBtn);
    }
}

// __________________________function calls__________________________________

handleAddToFavorites();
handleUpdateHabitStatus();