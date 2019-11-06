import * as request from 'superagent';
import axios from 'axios';

export async function ScenarioListAPI(){
    return request
    .get(`http://localhost:8080/scenario/list`)
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
    .get(`http://localhost:8080/scenes/list`)
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
  .post(`http://localhost:8080/scenario/make`, formData, {
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
  .post(`http://localhost:8080/scenario/update`, formData, {
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
  .post(`http://localhost:8080/scenario/delete`, formData, {
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









