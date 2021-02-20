import axios from 'axios';

const headers = {
  "Content-Type" : "application/json",
}

class RestService {

  async request(url, methodType, params) {
    if(methodType === 'GET') {

    } else {
     return await axios.post(url, params, {headers: headers});
    }
  }
  
}

export default new RestService();