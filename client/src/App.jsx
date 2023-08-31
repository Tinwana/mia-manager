import { Fragment } from "react";
import {BrowserRouter , Routes, Route } from 'react-router-dom'
import DefaultComponents from "./components/DefaultComponents";
import { publicRoutes } from "./routes";

function App() {
 
  return (
    <>
     <BrowserRouter>
        <Routes>
          {publicRoutes.map((route) => {
            const Layout = route.isShowHeader ? DefaultComponents : Fragment;
            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <Layout>
                    <route.element />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
