import { handleError, handleResponse } from "./serviceUtils";
const baseUrl = process.env.REACT_APP_API_URL + "/users";

/**
 * @description This function is responsible for sending user credential for validation.
 * @param {*} userid
 * @param {*} password
 */
export function validateUser(userid, password) {
  const url = baseUrl + `?username=${userid}&password=${password}`;
  return fetch(url).then(handleResponse).catch(handleError);
}
