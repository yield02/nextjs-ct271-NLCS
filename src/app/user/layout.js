import Footer from '@/components/Footer/Footer'
import Header from '@/components/Header/Header'
import Provider from '@/components/Provider'
import Slider from '@/components/Slider/Slider'


export const metadata = {
  title: 'Diễn Đàn Huyền Học',
  description: 'Generated by create next app',
}

export default function DefaultLayout({ children }) {
  return (
    <div className='root'>
      <Header></Header>
      {children}
      <Footer></Footer>
    </div>
  )
}
