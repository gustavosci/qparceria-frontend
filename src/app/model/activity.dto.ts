import { ActivityScheduleDTO } from "./activityschedule.dto";
import { ActivityDetailsDTO } from "./activitydetails.dto";

export interface ActivityDTO {
	referencePointStart: string;
	referencePointEnd: string;
	cityStartId: string;
	cityEndId: string;
	typeRoute: string;
	nameRoute: string;
	timeStart: string;
	totalTime: string;
	schedule: ActivityScheduleDTO;
	details: ActivityDetailsDTO;
	sportId: string;
}