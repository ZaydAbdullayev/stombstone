import { epitaphs, months } from "./data";


export const getCurrentDate = () => {
    const date = new Date();
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

export const getRandomEpitaph = () => {
    const randomIndex = Math.floor(Math.random() * epitaphs.length);
    return epitaphs[randomIndex];
}


