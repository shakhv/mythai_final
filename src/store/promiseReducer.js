
export  function promiseReducer(state = {}, { type, name, status, payload, error }) {
    if (type === "PROMISE") {
        return {
            ...state,
            [name]: { status, payload, error },
        };
    }
    return state;
  }




  export function jwtDecode(token) {
    try {
        return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {}
  }
  
  export const getGQL = url =>
    (query, variables = {}) =>
      fetch(url, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          ...(localStorage.authToken ? { "Authorization": "Bearer " + localStorage.authToken } : {})
        },
        body: JSON.stringify({ query, variables })
      })
        .then(res => res.json())
        .then(data => {
          if (data.errors && !data.data) throw new Error(JSON.stringify(data.errors))
          return data.data[Object.keys(data.data)[0]]
        })
  
        export const backendURL = "http://player.node.ed.asmer.org.ua"
        export const gql = getGQL(backendURL + '/graphql')      
  

      


// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': '178f537be7msh65b13e3a16dec34p171119jsn86dffee368d7',
// 		'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
// 	}
// };

// fetch('https://spotify23.p.rapidapi.com/search/?q=%3CREQUIRED%3E&type=multi&offset=0&limit=10&numberOfTopResults=5', options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));