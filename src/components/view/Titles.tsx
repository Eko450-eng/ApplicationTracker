import { ReactNode } from "react"
import { FilterList } from '@mui/icons-material';
import { Icon } from '@mui/material';

const Titles = (p: { setCurrent: any, current: any, direction: any, title: string | ReactNode, parameter: string, textColor?: string }) => {
	const textColor = p.textColor ? p.textColor : "white"

	return (
		<th
			onClick={() => {
				p.setCurrent(p.parameter)
				p.direction(!p.current)
			}}
		style={{
			position:"relative",
			color: textColor,
		}}>
			{p.title}
		<span><FilterList
				style={{
					transform:`translateY(-50%) ${ p.current  ? "rotate(180deg)" : "rotate(0deg)" } scale(0.7)`,
					position:"absolute",
					top:"50%",
				}}
			/></span>
		</th>
	)
}

export default Titles
