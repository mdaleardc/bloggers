import  CategoryFormContextProvider from "./context/CategoryFormContext"

export default function CategoryFormContextLaout({children}) {
  
  return <CategoryFormContextProvider>{children}</CategoryFormContextProvider>
}