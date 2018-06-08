import { CityDTO } from "./city.dto";
import { UFDTO } from "./uf.dto";

export interface UserMatchDTO {
	id: string;
	name: string;
	city: CityDTO;
	uf: UFDTO;
}