import * as request from 'superagent';
import axios from 'axios';

const url = "https://10.70.84.77:443"

export async function ScenarioListAPI(){
    return request
    .get(`${url}/scenario/list`)
    .send()
    .then(response => {
      const body = response.body;
      console.log(body)
      return body;
    })
    .catch(error => {
      return { error };
    });
  }

export async function ScenesListAPI(){
    return request
    .get(`${url}/scenes/list`)
    .send()
    .then(response => {
      const body = response.body;
      console.log(body)
      return body;
    })
    .catch(error => {
      return { error };
    });
  }

export function ScenarioMakeAPI(formData){
  return axios
  .post(`${url}/scenario/make`, formData, {
      headers: {
         'content-type': 'multipart/form-data',
      },
  })
  .then(response => {
    console.log(response)
    return response
  })
  .catch(error => {
      return { error };
  });
}

export function ScenarioUpdateAPI(formData){
  return axios
  .post(`${url}/scenario/update`, formData, {
      headers: {
         'content-type': 'multipart/form-data',
      },
  })
  .then(response => {
    return response
  })
  .catch(error => {
      return { error };
  });
}

export function ScenarioDeleteAPI(formData){
  return axios
  .post(`${url}/scenario/delete`, formData, {
      headers: {
         'content-type': 'multipart/form-data',
      },
  })
  .then(response => {
    return response
  })
  .catch(error => {
      return { error };
  });
}

export async function TimeTableListAPI(){
  return request
  .get(`${url}/timeTable/list`)
  .send()
  .then(response => {
    const body = response.body;
    console.log(body)
    return body.result;
  })
  .catch(error => {
    return { error };
  });
}

export function TimeTableUpdateAPI(formData){
  return axios
  .post(`${url}/timeTable/update`, formData, {
      headers: {
         'content-type': 'multipart/form-data',
      },
  })
  .then(response => {
    return response
  })
  .catch(error => {
      return { error };
  });
}

export function PaperoActionAPI(formData){
  return axios
  .post(`${url}/papero/action`, formData, {
      headers: {
         'content-type': 'multipart/form-data',
      },
  })
  .then(response => {
    return response
  })
  .catch(error => {
      return { error };
  });
}

export function ImageChangeAPI(formData){
  return axios
  .post(`${url}/image/change`, formData, {
      headers: {
         'content-type': 'multipart/form-data',
      },
  })
  .then(response => {
    return response
  })
  .catch(error => {
      return { error };
  });
}







