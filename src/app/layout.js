import Provider from '@/components/Provider'
import db from '@/config/database/index'
import './globals.scss'
import { authOptions } from './api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'

export const metadata = {
  title: 'Diễn Đàn Huyền Học',
  description: 'Generated by create next app',
}



export default async function RootLayout({ children }) {
  await db.connect();
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body>
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  )
}
