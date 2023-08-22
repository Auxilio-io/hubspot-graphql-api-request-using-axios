const axios = require('axios');

const token = process.env.OPS_TOKEN

const options = {
url: 'https://api.hubapi.com/collector/graphql',
method: 'POST',
headers: {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${token}`
},
data: {
"operationName": "GetContractor",
"query": `query GetContractor($dealId: Number!) {
CRM {
  deal_collection(filter: {hs_object_id__eq: $dealId}) {
    items {
      associations {
        ticket_collection__deal_to_ticket {
          items {
            associations {
              contact_collection__contractor {
                items {
                  _metadata {
                    id
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
}
`,
"variables": {"dealId": dealId}
}
};

axios(options)
.then(response => {
  console.log(response)
})
.catch(error => {
  throw new Error(error);
});
