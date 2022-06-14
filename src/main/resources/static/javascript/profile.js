const cookieArr = document.cookie.split('=')
const userId = cookieArr[1]

const submitForm = document.getElementById("url-form")
const postContainer = document.getElementById("post-container")
const headerForm = document.querySelector('#headerForm')
const header = document.getElementById('header')

//modal elements
let postUrl = document.getElementById(`url-entry`)
let postCaption = document.getElementById(`caption-entry`)
// let addPostBtn = document.getElementById('add-button')

const headers = {
    'Content-Type': 'application/json'
}

const baseUrl = "http://localhost:8070/api/v1/posts"

const handleLogout = () => {
    let c = document.cookie.split(";")
    for(let i in c){
        document.cookie  = /^[^=]+/.exec(c[i])[0] + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT"
    }
}

const handleSubmit = async (e) => {
    e.preventDefault()
    let bodyObj = {
        url: document.getElementById('url-entry').value,
        caption: document.getElementById('caption-entry').value
    }
    await addPost(bodyObj);
    document.getElementById("url-entry").value = ""
    document.getElementById("caption-entry").value = ""
}



async function addPost(obj) {
    const response = await fetch(`${baseUrl}/user/${userId}`, {
        method: "POST",
        body: JSON.stringify(obj),
        headers: headers
    })
        .catch(err => console.error(err.message))
    if(response.status == 200) {
        return getPosts(userId)
    }
}

async function getPosts(userId){
    await fetch(`${baseUrl}/user/${userId}`, {
        method: "GET",
        headers: headers
    })
        .then(response => response.json())
        .then(data => createPostCards(data))
        .catch(err => console.error(err))
}

async function getPostById(postId){
    await fetch(`${baseUrl}/${postId}`, {
        method: "GET",
        headers: headers
    })
        .then(res => res.json())
        .then(data => populateModal(data))
        .catch(err => console.error(err.message))
}

async function handlePostEdit(postId){
    console.log("edit button clicked")
    let bodyObj = {
        id:  postId,
        url: postUrl.value,
        caption: postCaption.value
    }

    await fetch(`${baseUrl}/${postId}`, {
        method: "PUT",
        body: JSON.stringify(bodyObj),
        headers: headers
    })
        .catch(err => console.error(err))
    return getPosts(userId)
}

async function handleDelete(postId){
    await fetch(`${baseUrl}/${postId}`, {
        method: "DELETE",
        headers: headers
    })
        .catch(err => console.error(err))

    return getPosts(userId)
}

const createPostCards = (array) => {
    postContainer.innerHTML = ''
    array.forEach(obj => {
        let postCard = document.createElement("div")
        postCard.classList.add("col-md-4")
        postCard.setAttribute('id',"data-post-id")
        postCard.innerHTML = `
                <div class="card mb-4 box-shadow">
				<img class="card-img-top" src=${obj.url} alt="Thumbnail [100%x225]">
                        <div class="card-body">
                            <p class="card-text">${obj.caption}</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group">
                                    <button type="button" class="btn btn-sm btn-outline-secondary"  onclick='handleDelete(${obj.id})'>Delete</button>
<!--                                    <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>-->
                                </div>
<!--                                <small class="text-muted">9 mins</small>-->
                            </div>
                        </div>
 			</div>
            </div>
        `
        postContainer.append(postCard)
    })
}

const populateModal = (obj) =>{
    postUrl.innerText = ''
    postCaption.innerText = ''
    postUrl.innerText = obj.url
    postCaption.innerText = obj.caption
    addPostBtn.setAttribute('data-post-id', obj.id)
}

getPosts(userId)


submitForm.addEventListener("submit", handleSubmit)
headerForm.addEventListener('submit', headerSubHandler)
// addPostBtn.addEventListener("click", (e)=>{
//     let postId = e.target.getAttribute("data-post-id")
//     handlePostEdit(postId);
// })

