import { collection, onSnapshot, query } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../../firebase"
import { hiddenState } from "../interfaces"
import { TableView } from "./TableView"

function OverView({ hidden }: hiddenState) {
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

	return <div className="OverView">
		<TableView data={data} hidden={hidden} />
	</div>
}
export default OverView
