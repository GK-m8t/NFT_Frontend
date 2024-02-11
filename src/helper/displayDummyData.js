export function displayDummyData(num) {
  const dummyDataTemplate=[
    {
        "tokenId": "1",
        "status": {
            "payment": "PS01",
            "shipping": "SS02"
        },
        "cost": {
            "print": 55,
            "ship": 8.5
        },
        "shipping": {
            "name": "John Doe",
            "email": "john.doe@example.com",
            "address": {
                "street1": "417 MONTGOMERY ST FL 2",
                "street2": "",
                "city": "SAN FRANCISCO",
                "state": "CA",
                "zip": "94104-1129",
                "country": "US"
            },
            "_phone": null
        },
        "payment": null
    }
];
const dummyData=Array(num).fill().map(() => ({
...dummyDataTemplate,
status: { ...dummyDataTemplate.status },
shipping: { ...dummyDataTemplate.shipping},
cost: { ...dummyDataTemplate.cost }
}));
return dummyData
  }
  