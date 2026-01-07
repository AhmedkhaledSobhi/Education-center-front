
import configService from "./config";
import * as url from "./url_helper";
import { APIClient } from "./api_helper";

const api = new APIClient();

// profile api
export const profile = (data) => api.get(url.PROFILE, data);