import Footer from './Footer'
import Navbar from './Navbar'

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main className="mx-auto mt-16">{children}</main>
      <Footer />
    </>
  )
}
