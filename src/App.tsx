import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from "./components/layout";
import { Home } from "./pages/Home";

export function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </Layout>
        </Router>
    )
}