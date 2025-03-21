import  AuthorFormContextProvider from "./context/AuthorFormContext"

export default function AuthorFormContextLaout({children}) {
  
  return <AuthorFormContextProvider>{children}</AuthorFormContextProvider>
}