import { UserMatchDTO } from "./user-match.dto.";
import { ActivitySimpleConsultDTO } from "./activitysimpleconsult.dto";

export interface MatchDTO {
	user: UserMatchDTO;
	act: ActivitySimpleConsultDTO;
	date: string;
}