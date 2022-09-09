import { Button } from "@mantine/core"
import { useNavigate } from 'react-router-dom'
import { Home, Plus, X } from 'tabler-icons-react'

function OverView(){
	const navigate = useNavigate()

	return <div className="OverView">
		<Button radius="xl" onClick={()=>navigate('/') }><Home /></Button>
		<Button radius="xl" onClick={()=>navigate('/add') }><Plus /></Button>
	</div>
}
export default OverView
