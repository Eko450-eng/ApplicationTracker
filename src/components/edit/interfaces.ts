import { Timestamp } from "firebase/firestore"

export interface initialValues {
	id: string,
	company?: string,
	applied: Timestamp,
	role?: string,
	declined?: boolean,
	invited: Timestamp,
	platform?: string,
	reason?: string,
	interview?: string,
	notes?: string,
	location?: string
}
