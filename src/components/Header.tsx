import { Link } from 'react-router-dom';

function Header() {
    return (
        <nav style={{ padding: '10px', borderBottom: '1px solid #ddd', marginBottom: '20px' }}>
            {/* a 태그 대신 Link를 사용합니다 */}
            <Link to="/" style={{ marginRight: '10px' }}>🏠 메인</Link>
            <Link to="/board">📋 게시판</Link>
        </nav>
    );
}

export default Header;