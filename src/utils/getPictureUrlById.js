import { getPictureById } from "../utils/endpoints";

export default function getPictureUrlById(id) {
    return getPictureById + id;
}