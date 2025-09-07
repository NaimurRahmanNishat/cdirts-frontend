
type Props = {
    children: React.ReactNode
}

const protectedRoute = ({children}: Props) => {
  return (
    <div>
      {children}
    </div>
  )
}

export default protectedRoute;