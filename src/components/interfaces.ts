import { Timestamp } from "firebase/firestore"

export interface hiddenState {
	hidden: boolean
}

export interface initialValues {
	id: string,
	company?: string,
	applied: Timestamp,
	role?: string,
	declined?: boolean,
	accepted?: boolean,
	invited: Timestamp,
	platform?: string,
	reason?: string,
	interview?: string,
	notes?: string,
	location?: string
}

export const defaultValue = {
		initialValues: {
			id: "0",
			company: "",
			applied: Timestamp.now(),
			role: "",
			declined: false,
			accepted: false,
			invited: Timestamp.now(),
			platform: "LinkedIn",
			reason: "",
			interview: "",
			notes: "",
			location: ""
		}
}
