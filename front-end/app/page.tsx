// import styles from './page.module.css'
import Nav from "@/components/nav/Nav"
import Main from "@/components/main/Main"
import '/styles/global.css'

export default function Home() {
  return (
      <div className="container">
        <Nav/>
        <Main/>
      </div>
  )
}