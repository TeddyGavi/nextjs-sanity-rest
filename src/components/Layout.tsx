import Navbar from './Navbar'
import Footer from './Footer'
export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main className="mx-auto">{children}</main>
      <Footer />
    </>
  )
}
