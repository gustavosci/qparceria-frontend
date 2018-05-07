export interface ActivityDetailsDTO {
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
}