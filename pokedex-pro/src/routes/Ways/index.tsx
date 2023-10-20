import { BrowserRouter, Route, Routes } from "react-router-dom"
import PageLayout from "../../layouts/PageLayout"
import PageHome from "../../pages/PageHome"
import PagePokemon from "../../pages/PagePokemon"

const Ways = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<PageLayout />}>
                        <Route index element={<PageHome />} />
                        <Route path={`/pokemon`} element={<PagePokemon />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Ways