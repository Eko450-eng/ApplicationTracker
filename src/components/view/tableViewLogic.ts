import { db } from "../../firebase"
import { deleteDoc, doc, updateDoc } from "firebase/firestore"
import { User } from "firebase/auth"

export const setStatus = async (user: User, documentId: string, status: string, company: string, state: boolean) => {
	if(!user) return
	if (company === undefined) return
	const userMail = user.email
	const docRef = doc(db, "users", `${userMail}`, "companys", `${documentId}`)
	if (status === "declined") await updateDoc(docRef, { declined: state })
	if (status === "accepted") await updateDoc(docRef, { accepted: state })
}

const deleteDocument = async (user: User, documentId: string) => {
	if (!user) return
	const userMail = user.email
	if (documentId === undefined) return
	const docref = doc(db, "users", `${userMail}`, "companys", `${documentId}`)
	await deleteDoc(docref)
}

export const handleDelete = (user: User, documentId: string) => {
	let confirmAction = window.confirm("Are you sure you want to delete?")
	Notification.requestPermission().then((permission) => {
		if (permission === "granted") {
			if (confirmAction) {
				deleteDocument(user, documentId)
				new Notification("Entry deleted")
			} else {
				new Notification("Deletion Cancelled")
			}
		}
	});
}
