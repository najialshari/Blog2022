import HTMLReactParser from "html-react-parser"
import { useEffect, useState } from "react"

const Comments = () => {

    const [comments, setComments] = useState([])
    const [commentsHeight, setCommentsHeight] = useState(0)

    useEffect(() => {
        fetch('https://www.wp-course.site/wp-json/wp/v2/comments')
            .then(responce => responce.json())
            .then(result => {
                setComments(result)
                setCommentsHeight(result.length * 100 + 50)
            })
            .catch("Error Comments...")
    }, [])

    return (

        <div className="comments col-4 ps-3" style={{ height: commentsHeight + 'px' }}>
            {comments.length !== 0 ?
                <>
                    <h4 className="mb-4">Latest Comments</h4>
                    {comments.map((comment, index) => (

                        <div className="mt-2 d-flex align-items-start" key={index}>
                            <div className="me-2">
                                <img src={comment.author_avatar_urls[24]} className="rounded-circle" alt='...' />
                            </div>
                            <div>
                                <li>{comment.author_name}</li>
                                <label>{HTMLReactParser(comment.content.rendered)}</label>
                            </div>
                        </div>
                    )
                    )}
                </>
                : <div className="col-4 text-center p-5 text-primary">
                    <div className="spinner-border" role='status'></div>
                </div>
            }
        </div>

    )
}
export default Comments