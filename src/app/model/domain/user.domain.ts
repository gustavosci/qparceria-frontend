import { AdressDomain } from "./adress.domain";
import { SportDomain } from "./sport.domain";

export interface UserDomain {
    id: string;
    name: string;
    username: string;
    email: string;
    password: string;
    birthDate: string;
    gender: string;
    facebook: string;
    twitter: string;
    instagram: string;
    strava: string;
    pic: string;
    adress: AdressDomain;
    sports: SportDomain[];
    phones: string[];
    profiles: string[];
}