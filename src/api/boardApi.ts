import axios from "axios";

export const getBoardList = async () => {

    const response = await axios.get('/api/boardList');
    return response.data;
};

export const createBoard = async (title: string, content: string) => {
    const response = await axios.post('/api/register', { title, content });

    return response.status;
};


export const getStatistics = async () => {

    const response = await axios.get('/api/statistics');
    // console.log(response.data);
    return response.data;
};

export const deletePost = async (id: number) => {
    if(confirm("정말 삭제하시겠습니까?")) {
        const response = await axios.delete('/api/delete/' + id);
        if(response.status == 200) {
            window.location.reload();
        }
    }
    return;

}