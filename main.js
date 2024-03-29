// axios.defaults.headers.commom['X-Auth-Token'] = 'SomeToken';


// GET REQUEST
function getTodos() {
  // axios({
  //   method : 'get',
  //   url : 'https://jsonplaceholder.typicode.com/todos',
  //   params : {
  //     _limit : 5
  //   }
  // })
  // .then(res => showOutput(res))
  // .catch(err => showOutput(err))
  axios
    .get("https://jsonplaceholder.typicode.com/todos?_limit=5")
    .then((res) => showOutput(res))
    .catch((err) => showOutput(err));
}

// POST REQUEST
function addTodo() {
  axios.post('https://jsonplaceholder.typicode.com/todos',{
      title: 'New Todo',
      comleted: false
    }
  )
    .then((res) => showOutput(res))
    .catch((err) => showOutput(err));
}

// PUT/PATCH REQUEST
function updateTodo() {
  axios.patch('https://jsonplaceholder.typicode.com/todos/1',{
    title: 'Sidhu Updated Todo',
    comleted: false
  }
)
  .then((res) => showOutput(res))
  .catch((err) => showOutput(err));
}

// DELETE REQUEST
function removeTodo() {
axios.delete('https://jsonplaceholder.typicode.com/todos/1')
    .then((res) => showOutput(res))
    .catch((err) => showOutput(err))
}

// SIMULTANEOUS DATA
function getData() {
  axios.all([
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5'),  
    axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5')  
  ])
  .then(axios.spread((posts,todos) => showOutput(posts)))
  .catch((err) => showOutput(err))

}

// CUSTOM HEADERS
function customHeaders() {
  const config ={
    headers :{
      'Content-Type' : 'application/jason',
      Authorization : 'sommetoken'
    }
      
  }
  axios.post('https://jsonplaceholder.typicode.com/todos',{
    title : 'New Todo',
    completed : true,
  },config)
    .then((res) => showOutput(res))
    .catch((err) => showOutput(err))
}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  const options ={
    method : 'post',
    url : 'https://jsonplaceholder.typicode.com/todos',
    data : {
       title : 'Hello World'
    },
    transformResponse : axios.defaults.transformResponse.concat(data => {
      data.title = data.title.toUpperCase()
      return data
    })
  }

  axios(options).then(res => showOutput(res))
}

// ERROR HANDLING
function errorHandling() {
  axios
    .get("https://jsonplaceholder.typicode.com/todoss")
    .then((res) => showOutput(res))
    .catch((err) => {
      console.log((err.response.data))
      console.log((err.response.ststus))
      console.log((err.response.headers))

      if (err.response.status === 404){
        alert('Error:page Not Found')
      }
      else if (err.request){
        console.log(err.request)
      }
      else{
        console.log(err.message)
      }
    });
}

// CANCEL TOKEN
function cancelToken() {
  const source = axios.CancelToken.source();

axios
.get('https://jsonplaceholder.typicode.com/todos', {
  cancelToken: source.token
})
.then(res => showOutput(res))
.catch(function(thrown) {
  if (axios.isCancel(thrown)) {
    console.log('Request canceled', thrown.message);
  } 
});

if(true){
  source.cancel('Request Cancled')
}
 
}

// INTERCEPTING REQUESTS & RESPONSES

// AXIOS INSTANCES

// Show output in browser
function showOutput(res) {
  document.getElementById("res").innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>
  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>
  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>
  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;
}

// Event listeners
document.getElementById("get").addEventListener("click", getTodos);
document.getElementById("post").addEventListener("click", addTodo);
document.getElementById("update").addEventListener("click", updateTodo);
document.getElementById("delete").addEventListener("click", removeTodo);
document.getElementById("sim").addEventListener("click", getData);
document.getElementById("headers").addEventListener("click", customHeaders);
document
  .getElementById("transform")
  .addEventListener("click", transformResponse);
document.getElementById("error").addEventListener("click", errorHandling);
document.getElementById("cancel").addEventListener("click", cancelToken);
// Footer
