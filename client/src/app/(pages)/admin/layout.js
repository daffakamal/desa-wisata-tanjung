import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default function AdminLayout({ children }) {
  const cookieStore = cookies()
  const isAuthenticated = cookieStore.get('admin_token')

  if (!isAuthenticated) {
    redirect('/auth/login')
  }

  return <>{children}</>
}