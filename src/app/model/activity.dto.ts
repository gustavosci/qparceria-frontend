import { ActivityScheduleDTO } from "./activityschedule.dto";
import { ActivityDetailsDTO } from "./activitydetails.dto";

export interface ActivityDTO {
	id: string;
	referencePointStart: string;
	referencePointEnd: string;
	ufStartId: string;
	cityStartId: string;
	ufEndId: string;
	cityEndId: string;
	typeRoute: string;
	nameRoute: string;
	timeStart: string;
	schedule: ActivityScheduleDTO;
	details: ActivityDetailsDTO;
	sportId: string;
	ownerId: string;
}