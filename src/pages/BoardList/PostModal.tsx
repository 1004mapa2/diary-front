import React from 'react';
import styles from './BoardList.module.css';

interface Props {
    post: { title: string; content: string; createdAt: string };
    onClose: () => void;
}

function PostModal({ post, onClose }: Props) {
    // 모달 외부 배경 클릭 시 닫기 처리
    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className={styles.modalOverlay} onClick={handleOverlayClick}>
            <div className={styles.modalContent}>
                <button className={styles.modalClose} onClick={onClose}>&times;</button>
                <h2 className={styles.modalTitle}>{post.title}</h2>
                <div className={styles.modalDate}>{post.createdAt}</div>
                <div className={styles.modalContentText}>{post.content}</div>
            </div>
        </div>
    );
}

export default PostModal;