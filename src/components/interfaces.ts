import { Timestamp } from "firebase/firestore"

export interface hiddenState {
	hidden: boolean
}

export interface RolesData {
	value: string,
	label: string,
}

export interface registerForm {
	id: string,
	email: string,
	password: string,
	passwordConfirm: string,
}

export interface loginForm {
	email: "",
	password: "",
}

export interface initialValues {
	id: string,
	company?: string,
	applied: Timestamp,
	role?: string,
	declined?: boolean,
	accepted?: boolean,
	additional: {
		invited: Timestamp,
		platform?: string,
		reason?: string,
		interview?: string,
		notes?: string,
		location?: string
	}
}

export const defaultValue = {
	initialValues: {
		id: "0",
		company: "",
		applied: Timestamp.now(),
		role: "",
		declined: false,
		accepted: false,
		additional: {
			invited: Timestamp.now(),
			platform: "LinkedIn",
			reason: "",
			interview: "",
			notes: "",
			location: ""
		}
	}
}

export const registerFormIV = {
	initialValues: {
		id: "",
		email: "",
		password: "",
		passwordConfirm: "",
	}
}

export const loginFormIV = {
	initialValues: {
		email: "",
		password: "",
	}
}

export interface SettingsContextProps {
	bulkEntries?: boolean
}
