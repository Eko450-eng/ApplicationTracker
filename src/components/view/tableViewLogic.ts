import { db } from "../../firebase"
import { deleteDoc, doc, setDoc, updateDoc } from "firebase/firestore"

export const setStatus = async (status: string, company: string | undefined, state: boolean) => {
	if (company === undefined) return
	const docRef = doc(db, "applications", company)
	if(status === "declined") await updateDoc(docRef, {declined: state})
	if(status === "accepted") {
		await setDoc(docRef, {accepted: state}, { merge: true })
	}
}

const deleteDocument = async (document: string | undefined) => {
	if (document === undefined) return
	await deleteDoc(doc(db, "applications", document))
}

export const handleDelete = (document: string | undefined) => {
	let confirmAction = window.confirm("Are you sure you want to delete?")
	Notification.requestPermission().then((permission) => {
		if(permission === "granted"){
			if(confirmAction){
				deleteDocument(document)
				new Notification("Entry deleted")
			}else{
				new Notification("Deletion Cancelled")
			}
		}
	});
}
