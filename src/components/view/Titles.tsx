import { ReactNode, useState } from "react"

const Titles = (p: { direction: any, title: string | ReactNode, parameter: string, sort: any, textColor?: string }) => {
	if (!p.textColor) p.textColor = "white"
	const [reversed, setReversed] = useState(false)
	const [clicked, setClicked] = useState(false)

	return (
		<th
			onClick={() => {
				p.sort(p.parameter)
				p.direction(reversed)
				if (reversed) {
					setReversed(false)
				} else {
					setReversed(true)
				}


			}}
			style={{ color: p.textColor }}>{p.title}</th>
	)
}

export default Titles
