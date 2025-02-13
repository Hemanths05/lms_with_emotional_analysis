import axios from "axios";


const token = process.env.NEXT_PUBLIC_BUY_ME_COFFEE; // Replace with your actual bearer token
const apiUrl = 'https://jsonplaceholder.typicode.com/posts?page='; // Replace with the API endpoint URL

const headers = {
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json' // Adjust content type if needed
};


// const getUserSubscription=(pageNumber)=> axios.get(apiUrl+pageNumber, { headers })

const getUserSubscription = (pageNumber) => {
  return new Promise((resolve) => {
      setTimeout(() => {
          resolve({
              data: {
                  data: [ // This mimics the expected response structure
                      { payer_email: "test@example.com", subscription_status: "active" },
                      { payer_email: "user@example.com", subscription_status: "inactive" }
                  ]
              }
          });
      }, 500);
  });
};

// const getAllSubscription=(url)=>axios.get(apiUrl,{ headers })

const getAllSubscription = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          data: [ // This mimics the expected response structure
              { payer_email: "test@example.com", subscription_status: "active" },
              { payer_email: "user@example.com", subscription_status: "inactive" }
          ]
      }
      });
    }, 500);
  });
};


export default{
    getUserSubscription,
    getAllSubscription
}