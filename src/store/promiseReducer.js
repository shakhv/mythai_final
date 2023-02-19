
export  function promiseReducer(state = {}, { type, name, status, payload, error }) {
    if (type === "PROMISE") {
        return {
            ...state,
            [name]: { status, payload, error },
        };
    }
    return state;
  }
 

export const getData = url => 
        fetch(url , {
            method: "GET",
        })
        .then(res => res.json())

export const pushData = url => 
    fetch(url , {
        method: "POST",
    })


      

