import { useCurrentQuery } from "../../app/services/auth";

export const Auth = ({children} : {children: JSX.Element}) => {
    const { isLoading} = useCurrentQuery()

    if (isLoading) {
        return <span>Завантаження</span>
    }

    return children
}