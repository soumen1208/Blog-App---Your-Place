import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../CommentList/commentlist.css'

function CommentList() {

    const [comments, setComments] = useState([]);

    useEffect(() => {
        getComment();

    }, [])
    const getComment = () => {
        axios.get('http://localhost:3000/comment')
            .then(res => {
                console.log(res.data.comments);
                setComments(res.data.comments);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const deleteComment = (commentData) => {
        if (window.confirm('Are you sure want to delete ?')) {

            axios.delete('http://localhost:3000/comment/' + commentData._id, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token')
                }
            })
                .then(result => {
                    console.log(result);
                    getComment();
                })
                .catch(err => {
                    console.log(err);
                })


        }
    }

    return (
        <div className='commentContainer'>
            {comments.map(data => (
                <div key={data._id} className='commentContain'>

                    <div className='comment'>
                        <p className='email'>{data.email}</p>
                        <p className='cmntText'>{data.commentText}</p>
                        <div className='time&del'>
                            <p style={{ fontSize: '10px', color: 'red' }}>{data.timestamp}</p>
                            <button onClick={() => { deleteComment(data) }} className='delBtn'>Delete</button>
                        </div>
                    </div>


                </div >
            ))
            }
        </div >
    )
}

export default CommentList