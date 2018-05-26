import { CityDomain } from "./city.domain";
import { SportDomain } from "./sport.domain";
import { UserDomain } from "./user.domain";

export interface ActivityDomain {
	id: string;
	referencePointStart: string;
	referencePointEnd: string;
	cityStart: CityDomain;
	cityEnd: CityDomain;
	typeRoute: string;
	nameRoute: string;
	timeStart: string;
	sport: SportDomain;
	owner: UserDomain;

	happenOnRain: boolean;
	happenOnSun: boolean;
	happenOnHeat: boolean;
	happenOnCold: boolean;

	forBegginers: boolean;
	forRegulars: boolean;
	forExperts: boolean;

	distance: string;
	altimetry: string;
	averageSpeed: string;
	minPeople: string;

	frequency: string;
	date: string;
	days: string[];

	active: string;	
}