var $login = $('#login')
var $loginPage = $('#loginPage')
var $tableList = $('#tableList')
var $todoCard = $('#todoCard')
var $addTask = $('#addTask')
var $register = $('#register')
var $registerPage = $('#registerPage')
var $updateTask = $('#updateTask')
var $main_content = $('#main_content')
var $proceedUpdate = $('#proceedUpdate')
var $checkLogin = $('#checkLogin')
var $logout = $('#logout')


const url = 'http://localhost:3000'

function changeStatus(id){
    $.ajax({
        method: 'PATCH',
        url: `${url}/todos/${id}`,
        headers: {
            token: localStorage.token
        }
    })
    .done(response => {
        Swal.fire(
            `${response.title} Status Changed!`,
            `Task marked as ${response.status}`,
            'success'
        )
        getData()
    })
    .fail(err => {
        console.log(err)
    })
}


$loginPage.on('click', function(e){
    e.preventDefault()
    $login.show()
    $register.hide()
})

$logout.on('click', function(e){
    
    localStorage.clear()
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        Swal.fire({
            icon: 'success',
            text: 'Logout Success!'
        })
    });
    checkLogin()
})



$registerPage.on('click', function(e){
    e.preventDefault()
    $login.hide()
    $register.show()
})

$register.on('submit', function(e){
    e.preventDefault()
    var username = $register.find('#usernameRegister').val()
    var email = $register.find('#emailRegister').val()
    var password = $register.find('#passwordRegister').val()

    $.ajax({
        method: 'POST',
        url: `${url}/register`,
        data: {
            username: username,
            email: email,
            password: password
        }
    })
    .done(response => {
        Swal.fire({
            title: `User Registered!`,
            text: 'Good Job!',
            icon: 'success',
            confirmButtonText: `Login`
        })

        $register.hide()
        $login.show()
    })
    .fail(({ responseJSON }) => {
        //<<<<<<<<<<<<<<<<<<
        // console.log(responseJSON.errors.length);
        if ( responseJSON.errors.length > 1  ){
            let reverse =responseJSON.errors.reverse()
            // console.log(responseJSON.errors);
        reverse.forEach(element => {
            Swal.fire({
                icon: "error",
                title: "Validation Error",
                text: element.split(':')[1]
            })
        })
        } 
        else {
            Swal.fire({
                title: 'Error!',
                text: responseJSON.errors,
                icon: 'error',
                confirmButtonText: 'Ok!'
            })
        }
    })
})

$login.on('submit', function(e){
    e.preventDefault()
    var email = $login.find('#email').val()
    var password = $login.find('#password').val()
    console.log(email, password)
    $.ajax({
        method: 'POST',
        url: `${url}/login`,
        data: {
            email: email,
            password: password
        }
    })
    .done(response => {
        ($('#body'))
        var token = response.accessToken
        localStorage.setItem('token', token)
        getData()
        display('main_content')
    })
    .fail(err => {
        console.log(err.responseJSON);
        
        Swal.fire({
            title: 'Error!',
            text: err.responseJSON.errors,
            icon: 'error',
            confirmButtonText: 'Ok!'
        })
    })
})

$addTask.on('submit', function(e){
    e.preventDefault()
    var title = $('#title').val()
    var description = $('#description').val()
    var due_date = $('#due_date').val()
    var status = $('#status').val().toLowerCase()
    
    $.ajax({
        method: 'POST',
        url: `${url}/todos`,
        headers: {
            token: localStorage.token
        },
        data: {
            title: title,
            description: description,
            due_date: due_date,
            status: status
        }
    })
    .done(response => {
        var token = localStorage.token

        let text = ''
        text += `${title} added to Todo list`
        console.log(text)

        getData()
        Swal.fire({
            icon: "success",
            text: text,
        })
        
        $addTask.hide()
    
    })
    .fail(({responseJSON}) => {
        console.log(responseJSON.errors);
        let reverse =responseJSON.errors.reverse()
        reverse.forEach(element => {
            // console.log(element.split(':')[1]);
            Swal.fire({
                icon: "error",
                title: element.split(':')[1],
                text: `Please fill in all fields`
            })
        });
    })
})

function checkLogin(){
    if(localStorage.token){
        $('#body')
        $('#due_date').attr('min', getMinDate())
        getData()
        display('main_content')
    } else {
        $('#body')
        display('login')
    }
}


function getData(){
    $.ajax({
        method: 'GET',
        url: `${url}/todos`,
        headers: {
            token: localStorage.token
        }
    })
    .done(response => {
        if(response.length == 0){
            Swal.fire({
                icon: 'info',
                title: 'Todo Is Empty',
                text: 'Please add new task',
            })
        }
        generateCard(response)
    })
    .fail(err => {
    })
}

function display(page){
    var pages = ['login', 'main_content', 'updateTask']
    for(var i = 0; i < pages.length; i++){
        if (pages[i] !== page){
            $(`#${pages[i]}`).hide()
        } else {
            $(`#${pages[i]}`).show()
        }
    }
}


//  CARD
var templateCard = `
        <div class="card bg-light mb-3" style="min-width: 300px; max-width: 18rem;">
            <div class="text-center">
                <div class="card-header title">Header</div>
                <div class="card-body">
                <p class="card-text description"></p>
                <p class="card-text due_date"></p>
                <p class="card-text expired_date"></p>
                <p class="card-text status"></p>
                <p class="card-text action"></p>
                </div>
            </div>
        </div>
`

function generateCard(list){
    $todoCard.empty()
    for (var i = 0; i < list.length; i++){
        var $item = $(templateCard)
        $item.find('.no').text(i+1)
        $item.find('.title').text(capitalizeFirstLetter(list[i].title))
        $item.find('.description').text(list[i].description)
        $item.find('.due_date').text(changeDateFormat(list[i].due_date))
        $item.find('.status').text(capitalizeFirstLetter(list[i].status))
        $item.find('.action').append(`<button onClick="deleteOnClick(${list[i].id})" class="btn btn-danger">Delete` + "</button> ")
        $item.find('.action').append(`<button onClick="changeStatus(${list[i].id})" class="btn btn-primary">Update` + "</button>")
        $todoCard.append($item)
    }
}


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function changeDateFormat(date){
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    return new Date(date).toLocaleDateString('id', options)
}





function deleteOnClick(id){
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    })
    .then((result) => {
        if (result.value) {
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )
            $.ajax({
                method: 'DELETE',
                url: `${url}/todos/${id}`,
                headers: {
                    token: localStorage.token
                }
            })
            .done(response => {
                var token = localStorage.token
                getData()
            })
            .fail(err => {
                console.log(err)
            })
        }
    })
}

function showAddForm(){
    if($addTask.attr('style') == 'display: none;'){
        $addTask.show()
    } else {
        $addTask.hide()
    }
}

// GOOGLE<<<<<<<<<<<<<<<
function onSignIn(googleUser) {
 
    let id_token = googleUser.getAuthResponse().id_token;

    // console.log(id_token);

    $.ajax({
        method:'post',
        url:`${url}/google/signin`,
        data:{id_token}
    })
    .done(response=>{
        console.log(response);
        ($('#body'))
        var token = response.accessToken
        localStorage.setItem('token', token)
        getData()
        display('main_content')
    })
    .fail(err=>{
        console.log(err);
    })
  }


//   function signOut() {
    
//   }

