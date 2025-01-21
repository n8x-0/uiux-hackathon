import { createClient, type ClientConfig } from "next-sanity";
import { dataset, projectId, token } from "./env/initalize";

const SanityClient: ClientConfig = {
    projectId,
    dataset,
    useCdn: false,
    token,
    apiVersion:'2024-12-25',
}
export default createClient(SanityClient)