import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Home';
import BoardList from './pages/BoardList/BoardList.tsx';
import BoardRegister from './pages/BoardRegister/BoardRegister.tsx';

function App() {
    return (
        <BrowserRouter>
            {/*<Header />*/}

            <div style={{ padding: '20px' }}>
                <Routes>
                    <Route path="/" element={<Main />} />

                    <Route path="/board" element={<BoardList />} />

                    <Route path="/board/register" element={<BoardRegister />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App
