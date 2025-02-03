import { createClient, type ClientConfig } from "next-sanity";
import { dataset, projectId, token } from "./env/initalize";

const client: ClientConfig = {
    projectId,
    dataset,
    useCdn: true,
    token,
    apiVersion:'2024-12-25',
}
export default createClient(client)