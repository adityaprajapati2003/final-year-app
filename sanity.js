import {createClient} from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const Client = createClient({
    projectId: 'szmuvap1',
    dataset: 'production',
    useCdn:true,
    apiVersion:"2023-11-07",
})

const builder = imageUrlBuilder(Client);
export const urlFor = (source) => builder.image(source);

export default Client;
