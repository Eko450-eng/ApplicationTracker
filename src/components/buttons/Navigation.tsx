import { ActionIcon, Button } from "@mantine/core"
import { useNavigate } from 'react-router-dom'
import { Circle, CircleOff, Home, Plus } from 'tabler-icons-react'

function Navigation({ setHiddenState, hidden }: any){
	const navigate = useNavigate()

	return <div className="Navigation">
		<ActionIcon radius="xl" variant="subtle" onClick={()=>navigate('/add') }><Plus /></ActionIcon>
		<ActionIcon radius="xl" variant="subtle" onClick={()=>navigate('/') }><Home /></ActionIcon>
		<ActionIcon radius="xl" variant="subtle" onClick={()=>setHiddenState(!hidden) }>{ hidden ? <CircleOff/> : <Circle/> }</ActionIcon>
	</div>
}
export default Navigation
