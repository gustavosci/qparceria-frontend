import { UserMatchDTO } from "./user-match.dto.";
import { ActivitySimpleConsultDTO } from "./activitysimpleconsult.dto";

export interface MatchersDTO {
	act: ActivitySimpleConsultDTO;
	matchers: UserMatchDTO[];

}