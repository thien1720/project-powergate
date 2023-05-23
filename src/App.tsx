import React, {ReactElement, Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import RouterPage from "./router";
import './App.css';
import DefaultLayout from './default';

type LayoutProps = {
  children?: React.ReactNode
}
type CustomLayout = (props: LayoutProps) => ReactElement


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {RouterPage.map((router : {path: string , component: any , layout ?: any , naviteams?: { pathnav: string , navComponent: any}}, index : number) => {

            const Pages = router.component
            let PageNav
            let pathnav 
            
            let Layout: CustomLayout | typeof Fragment = DefaultLayout
            
            if (router.layout) {
              Layout = router.layout
            } else if (router.layout === null) {
              Layout = Fragment
            }
            
            if (router.naviteams) {
              PageNav = router.naviteams.navComponent

              pathnav = router.naviteams.pathnav
            }
            return (
              <Route key={index} path={router.path} element={
                <Layout>
                  <Pages />
                </Layout>
              }
              >
                {router.naviteams ? <Route path={pathnav} element={<PageNav />}/>: undefined}
              </Route>

            )
          })}



        </Routes>
      </div>
    </Router>
  )
}

export default App;
