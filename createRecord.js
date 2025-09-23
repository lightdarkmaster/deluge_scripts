const createRecord = (object, data) => {
    `${object}`.create(data)
    .then((response) => {
        console.log(response);
    })
    .catch((error) => {
        console.log(error);
    });
}


const data = {
    "Subject": "Test Subject",
    "Status": "Open",
    "Priority": "Normal",
    "Description": "Test Description",
    "Category": "Test Category",

    "Contact": {
        "id": "123456789"
    }
}

console.log(createRecord("Tickets", data));