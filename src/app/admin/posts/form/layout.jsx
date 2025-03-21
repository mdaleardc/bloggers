import  PostFormContextProvider from "./context/PostFormContext"

export default function PostFormContextLaout({children}) {
  
  return <PostFormContextProvider>{children}</PostFormContextProvider>
}