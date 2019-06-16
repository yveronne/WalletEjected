const URL = "http://192.168.1.5:8000/";
//const URL = "http://192.168.137.52:8000/";
// const URL = "http://192.168.43.17:8000/";


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

export function insertIntoWaitingList(storeId, customerNumber, reason){
    const url = URL+"merchantpoints/"+storeId+"/waitingline";

    return fetch(url, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            "customernumber" : customerNumber,
            "reason" : reason
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
            "merchantpoint" : operation.merchantPointID,
            "expectedvalidationdate" : operation.expectedValidationDate,
            "customernumber" : operation.customerNumber,
            "beneficiarynumber" : operation.beneficiaryNumber,
            "secret" : operation.secret

        })
    })
        .then(response => response.json())
        .catch(error => console.log("Une erreur est survenue lors de la collecte " +error))
}


export function validateWithdrawal(code, secret){
    const url = URL+"otp/confirmwithdrawal";

    return fetch(url, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            "code": code,
            "secret" : secret
        })
    })
        .then((response) => response.json())
        .catch((error) => console.log("Une erreur est survenue lors de la collecte " +error))
}

export function getHistory(number, secret){
    const url = URL+"transactions/history";

    return fetch(url, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            "number": number,
            "secret" : secret
        })
    })
        .then((response) => response.json())
        .catch((error) => console.log("Une erreur est survenue lors de la collecte " +error))

}
