import { CityDomain } from "./city.domain";

export interface AdressDomain {
    id: string;
    street: string;
    number: string;
    complement: string;
    neighborhood: string;
    cep: string;
    city: CityDomain;
}
