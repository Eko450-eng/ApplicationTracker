import { useUserContext } from "../../contexts/userContexts/UserContext"
import { useEffect, useState } from "react"
import { hiddenState, initialValues } from "../interfaces"
import { TableView } from "./TableView"
import { useNavigate } from "react-router-dom"
import { User } from "firebase/auth"
import { collection, DocumentData, onSnapshot, query } from "firebase/firestore"
import { db } from "src/firebase"

function OverView({ hidden }: hiddenState) {
	const [data, setData] = useState<Array<initialValues | DocumentData>>([])
	const user = useUserContext().user
	const navigate = useNavigate()

	useEffect(() => {
		if (!user) navigate('/')
	}, [])

	const getData = (user: User | undefined) => {
		if (!user) return
		const q = query(collection(db, `users/${user.email}/companys`));
		onSnapshot(q, (querySnapshot) => {
			setData([])
			const docs: Array<initialValues | DocumentData> = []

			querySnapshot.forEach((doc) => {
				const d: initialValues | DocumentData = { ...doc.data() }
				docs.push(d)
			});
			setData(docs)
		});
	}

	useEffect(() => {
		getData(user)
	}, [user])

	return <div className="OverView">
		<TableView user={user!} data={data} hidden={hidden} />
	</div>
}
export default OverView
