import axios from 'axios';
import setAuthorizationToken from '../../utils/setAuthorizationToken';
import { setCurrentUser } from './authorizationActions';
import { postRegister } from "../../utils/endpoints";


export function register(data) {
    return (dispatch) => {
        return axios.post(postRegister, data).then(res => {
            console.log(res);
        });
    };;
}
