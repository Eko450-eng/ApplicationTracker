import { ActionIcon, Button } from "@mantine/core"
import { getAuth, signOut } from "firebase/auth"
import { useNavigate } from 'react-router-dom'
import { useUserContext } from "src/contexts/userContexts/UserContext"
import { Circle, CircleOff, Home, Logout, Plus } from 'tabler-icons-react'
import { setSettings } from "../add/addLogic"

function Navigation({ setHiddenState, hidden }: any) {
	const navigate = useNavigate()
	const auth = getAuth()
	const user = useUserContext().user

	const logout = () => {
		signOut(auth)
			.then(() => {
				setTimeout(() => {
					navigate('/')
				}, 2000)
			})
	}

	const handleHide = () => {
		if(user) setSettings(user, !hidden, "hidden")
	}

	return <div className="Navigation">
		<ActionIcon radius="xl" variant="subtle" onClick={() => navigate('/add')}><Plus /></ActionIcon>
		<ActionIcon radius="xl" variant="subtle" onClick={() => navigate('/')}><Home /></ActionIcon>
		<ActionIcon radius="xl" variant="subtle" onClick={() => handleHide()}>{hidden ? <CircleOff /> : <Circle />}</ActionIcon>
		<ActionIcon radius="xl" variant="subtle" onClick={() => logout()}>{<Logout />}</ActionIcon>
	</div>
}
export default Navigation
