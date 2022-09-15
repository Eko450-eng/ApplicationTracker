import { db } from "../../firebase";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { initialValues } from "../interfaces";
import { v4 as uuid } from 'uuid'
import { User } from "firebase/auth";

export const addCompany = async (user: User, values: initialValues) => {
	if (!user) return
	const userMail = user.email

	const data = {
		id: uuid(),
		company: values.company,
		applied: values.applied,
		role: values.role,
		declined: values.declined,
		accepted: values.accepted,
		additional: {
			invited: values.additional.invited,
			platform: values.additional.platform,
			reason: values.additional.reason,
			interview: values.additional.interview,
			notes: values.additional.notes,
			location: values.additional.location
		}
	}

	await addDoc(collection(db, "users", `${userMail}`, "companys"), data)
		.then((doc) => {
			if (!doc) return
			setDoc(doc, { id: doc.id }, { merge: true })
		})
}
export const setSettings = async(user: User, data: boolean, setting: string) => {
	const d = doc(db, "users", `${user.email}`)
	switch(setting){
		case "bulkEntries":
			setDoc(d, { bulkEntries: data }, { merge: true })
			return
		case "hidden":
			setDoc(d, { hidden: data }, { merge: true })
			return
	}
}
