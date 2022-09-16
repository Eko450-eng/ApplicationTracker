import { User } from 'firebase/auth'
import { createContext, useContext } from 'react'

export interface UserContextProps{ user?:User }

export const UserContext = createContext<UserContextProps>(null as any)

export const UserProvider = (user:any) => {
	if(!user) return
	const value: UserContextProps = user

	return <UserContext.Provider value={value}></UserContext.Provider>
}
export const useUserContext = (): UserContextProps => useContext<UserContextProps>(UserContext)
