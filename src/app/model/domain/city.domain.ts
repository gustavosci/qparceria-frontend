import { UFDomain } from "./uf.domain";

export interface CityDomain {
    id: string;
    name: string;
	uf: UFDomain;
}
