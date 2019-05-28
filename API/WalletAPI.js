const URL = "http://192.168.99.37:8000/";

export function getTowns(){
    const url = URL+"towns";
    return fetch(url)
        .then((response) => response.json())
        .catch((error) => console.log("Une erreur est survenue lors de la collecte " +error))

}

export function getStoresOfTown(townName){
    const url = URL+"towns/"+townName+"/merchantpoints";
    return fetch(url)
        .then((response) => response.json())
        .catch((error) => console.log("Une erreur est survenue lors de la collecte " +error))
}

export function addComment(comment){
    const url = URL+"comments";

    return fetch(url, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({
            "title" : comment.title,
            "content" : comment.content,
            "customernumber" : comment.customerNumber,
            "merchantpointid" : comment.storeId

        })
    })
        .then((response) => response.json())
        .catch((error) => console.log("Une erreur est survenue lors de la collecte" + error))
}

export function insertIntoWaitingList(storeId, customerNumber, secret){
    const url = URL+"merchantpoints/"+storeId+"/waitingline";

    return fetch(url, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            "customernumber" : customerNumber,
            "secret" : secret
        })
    })
        .then((response) => response.json())
        .catch((error) => console.log("Une erreur est survenue lors de la collecte " +error))
}


export function initiateOperation(operation){
    const url = URL+"transactions";

    return fetch(url, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            "type" : operation.type,
            "amount" : operation.amount,
            "merchantPointID" : operation.merchantPointID,
            "expectedvalidationdate" : operation.expectedValidationDate,
            "customerNumber" : operation.customerNumber,
            "beneficiaryNumber" : operation.beneficiaryNumber,
            "secret" : operation.secret

        })
    })
        .then(response => response.json())
        .catch(error => console.log("Une erreur est survenue lors de la collecte " +error))
}