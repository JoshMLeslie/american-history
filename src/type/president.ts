export interface President {
	name: string;
	party: string[];
	start: string; // simple date
	end: string; // simple date
}
export interface PresidentDate {
	name: string;
	party: string[];
	start: number; // year
	end: number; // year
}
