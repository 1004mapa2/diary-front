import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom'; // a 태그 대신 사용
import PostModal from './PostModal';
import styles from './BoardList.module.css';
import {deletePost, getBoardList} from "../../api/boardApi.ts";


// 데이터 타입 정의
interface Post {
    id: number;
    title: string;
    content: string;
    createdAt: string;
}

function BoardList() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true); // 로딩 시작

                const data = await getBoardList();

                setPosts(data); // 가져온 데이터를 State에 저장
            } catch (error) {
                console.error("데이터 로딩 실패:", error);
                alert("게시글을 불러오지 못했습니다.");
            } finally {
                setLoading(false); // 성공하든 실패하든 로딩 끝
            }
        };

        fetchData(); // 만든 함수 실행
    }, []);

    if (loading) return <div className={styles.loading}>로딩 중...</div>;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>글 목록</h1>
                <Link to="/board/register" className={styles.btnWrite}>새 글 작성</Link>
            </div>

            {loading ? (
                <div className={styles.loading}>게시글을 불러오는 중...</div>
            ) : (
                <div className={styles.postList}>
                    {posts.length === 0 ? (
                        // 게시글이 없을 때 (Empty State)
                        <div className={styles.emptyState}>
                            <p>작성된 게시글이 없습니다.</p>
                            <Link to="/register" className={styles.btnWrite}>첫 번째 글 작성하기</Link>
                        </div>
                    ) : (
                        // 게시글이 있을 때 (List Rendering)
                        posts.map((post, index) => (
                            <div
                                key={index}
                                className={styles.postCard}
                                onClick={() => setSelectedPost(post)}
                            >
                                <div className={styles.postTitle}>{post.title}</div>
                                <div className={styles.postPreview}>{post.content}</div>
                                <div className={styles.postDate}>{post.createdAt}</div>
                                <div className={styles.postDeleteDiv}>
                                    <button className={styles.postDeleteButton} onClick={() => deletePost(post.id)}>삭제
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}

            {/* 글 상세 모달 */}
            {selectedPost && (
                <PostModal
                    post={selectedPost}
                    onClose={() => setSelectedPost(null)}
                />
            )}
        </div>
    );
}

export default BoardList;