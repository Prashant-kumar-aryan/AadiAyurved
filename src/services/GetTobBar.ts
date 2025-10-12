import axios from "axios"

export default async function getTopBar(){
    const title = await axios
    .get("/api/site-title")
    .then((res) => res.data.title)
    .catch(() => "Contact Us  +91 70336 50159");
    return title;
}