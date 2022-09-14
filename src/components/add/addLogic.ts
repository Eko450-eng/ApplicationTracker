import { db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { read, utils } from 'xlsx';
import { serverTimestamp } from "firebase/firestore";
import { initialValues } from "../interfaces";
import { v4 as uuid } from 'uuid'

export const addCompany = async (values: initialValues) => {
	await setDoc(doc(db, "applications", `${values.company}`), {
		id: uuid(),
		company: values.company,
		applied: values.applied,
		role: values.role,
		declined: values.declined,
		invited: values.invited,
		platform: values.platform,
		reason: values.reason,
		interview: values.interview,
		notes: values.notes,
		location: values.location
	});
}

// Exporting data from xlsx file
// Populating missing fields

export const upload = async (e: any) => {
	const file = e.target.files[0]
	const data = await file.arrayBuffer()
	const workbook = read(data)
	const worksheet = workbook.Sheets[workbook.SheetNames[0]]

	const jsonData = utils.sheet_to_json(worksheet)
	console.log(jsonData)

	jsonData.forEach((i: any) => {
		if (i.declined  === "x") i.declined = true
		if (i.invited == undefined) i.invited = serverTimestamp()
		if (i.reason == undefined) i.reason = ""
		if (i.interview == undefined) i.interview = ""
		if (i.notes == undefined) i.notes = ""
		if (i.platform == undefined) i.platform = "LinkedIn"
		if (i.location == undefined) i.location = "BaWü"
		i.declined = false
		addCompany(i)
	})

}
