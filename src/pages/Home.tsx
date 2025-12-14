import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import {getStatistics} from "../api/boardApi.ts";

const DiaryHome = () => {
    const [stats, setStats] = useState({
        total: 0,
        monthTotal: 0,
        todayTotal: 0
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // const response = await fetch('/');
                const response = await getStatistics();

                setStats(response);
                setLoading(false);

            } catch (err) {
                console.error('통계를 불러오는데 실패했습니다:', err);
                setError(true);
                setLoading(false);
            }
        };

        fetchStats();
    }, []); // 빈 배열을 넣어 컴포넌트 마운트 시 한 번만 실행

    return (
        <div className="container">
            <h1>오늘의 일기</h1>
            <p className="subtitle">당신의 소중한 이야기를 기록하세요</p>

            <div className="button-group">
                {/* React Router 사용 시: <Link to="/write" className="btn btn-primary">새 글 작성</Link> */}
                <Link to="/board/register" className="btn btn-primary">새 글 작성</Link>
                <Link to="/board" className="btn btn-secondary">글 목록 보기</Link>
            </div>

            <div className="stats">
                <div className="stats-grid">
                    {loading && <div className="loading">통계를 불러오는 중...</div>}

                    {error && (
                        <div className="stat-item">
                            <div className="stat-number">-</div>
                            <div className="stat-label">통계를 불러올 수 없습니다</div>
                        </div>
                    )}

                    {!loading && !error && (
                        <>
                            <div className="stat-item">
                                <div className="stat-number">{stats.total}</div>
                                <div className="stat-label">전체 게시글</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-number">{stats.monthTotal}</div>
                                <div className="stat-label">이번 달</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-number">{stats.todayTotal}</div>
                                <div className="stat-label">오늘</div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DiaryHome;