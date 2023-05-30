import React, { ReactElement, Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import RouterPage from "./router";
import './App.css';
import DefaultLayout from './default';
import ProtectedRoute from "./router/protexted";

import Login from "./views/Login"
import Employee from "./views/Employee";


type LayoutProps = {
  children?: any
}
type CustomLayout = (props: LayoutProps) => ReactElement

interface RouterPage {
  path?: string,
  component: any,
  layout?: any,
  naviteams?: { pathnav: string, navComponent: any },
  protext?: boolean
}

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {RouterPage.map((router: RouterPage, index: number) => {

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
            if (router.protext) {
              return (
                <Route
                  key={index}
                  path={router.path}
                  element={
                    <ProtectedRoute
                    >
                      <Layout>
                        <Pages />
                      </Layout>
                    </ProtectedRoute>
                  }
                />

              )
            } else {

              return (
                <Route key={index} path={router.path} element={
                  <Layout>
                    <Pages />
                  </Layout>
                }
                >
                  {router.naviteams ? <Route path={pathnav} element={<PageNav />} /> : <></>}
                </Route>

              )
            }
          })}

        </Routes>
      </div>
    </Router >
  )
}

export default App;
