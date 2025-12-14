// src/pages/Board/BoardWritePage.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 페이지 이동용 훅
import styles from './BoardRegister.module.css';
import {createBoard} from "../../api/boardApi.ts";

function BoardWritePage() {
    // 1. 입력값 상태 관리 (Two-way Binding)
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    // 페이지 이동을 위한 훅
    const navigate = useNavigate();

    // 2. 게시글 작성 함수
    const handleSubmit = async () => {
        // 유효성 검사 (trim으로 공백 제거 확인)
        if (!title.trim()) {
            alert('제목을 입력해주세요.');
            return;
        }

        if (!content.trim()) {
            alert('내용을 입력해주세요.');
            return;
        }

        try {
            const reponseStatus = await createBoard(title, content);

            if (reponseStatus == 200) {
                alert('작성 완료');
                navigate('/board'); // 작성 후 목록 페이지로 이동
            } else {
                alert('작성에 실패했습니다.');
            }

        } catch (error) {
            console.error('Error:', error);
            alert('서버 통신 중 오류가 발생했습니다.');
        }
    };

    // 3. 취소 함수
    const handleCancel = () => {
        if (window.confirm('작성을 취소하시겠습니까? 목록으로 돌아갑니다.')) {
            navigate('/board'); // 목록 화면으로 복귀
            // 만약 입력값만 비우고 싶다면: setTitle(''); setContent('');
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>게시글 작성</h1>

            <div className={styles.formGroup}>
                <label htmlFor="title" className={styles.label}>제목</label>
                <input
                    type="text"
                    id="title"
                    className={styles.input}
                    placeholder="제목을 입력하세요"
                    value={title} // state와 연결
                    onChange={(e) => setTitle(e.target.value)} // 입력 시 state 업데이트
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="content" className={styles.label}>내용</label>
                <textarea
                    id="content"
                    className={styles.textarea}
                    placeholder="내용을 입력하세요"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </div>

            <div className={styles.buttonArea}>
                <button className={styles.btnSubmit} onClick={handleSubmit}>
                    작성 완료
                </button>
                <button className={styles.btnCancel} onClick={handleCancel}>
                    취소
                </button>
            </div>
        </div>
    );
}

export default BoardWritePage;