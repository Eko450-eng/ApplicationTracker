import { collection, onSnapshot, query } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../../firebase"
import { TableView } from "./TableView"

function View() {
	const [data, setData] = useState<any>([])
	const q = query(collection(db, "applications"));

	const getData = () => {
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			setData([])
			const docs: Array<Object> = []

			querySnapshot.forEach((doc) => {
				docs.push(doc.data())
			});
			setData(docs);
		});
	}

	useEffect(() => {
		getData()
	},[])

	const mockData = [
		{
			"name": "Athena Weissnat",
			"company": "Little - Rippin",
			"email": "Elouise.Prohaska@yahoo.com"
		}
	]

	return <div className="View">
		<TableView data={data} />
	</div>
}
export default View
