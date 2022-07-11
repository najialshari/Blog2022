import HTMLReactParser from "html-react-parser"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "../../node_modules/bootstrap-icons/font/bootstrap-icons.css"
import Comments from "./Comments"
import Title from "./Title"

const Blog = () => {

    const [blogs, setBlogs] = useState([])
    const [loadNew, setLoadNew] = useState(false)
    const [haveMore, setHaveMore] = useState('')
    const [pageNumber, setPageNumber] = useState(1)



    useEffect(() => {
        fetch('https://www.wp-course.site/wp-json/youthink/posts?page=' + pageNumber)
            .then(responce => responce.json())
            .then(result => {
                result.meta.current_page * result.meta.posts_per_page
                    < result.meta.total_posts ? setHaveMore('visible') : setHaveMore('hidden')
                setBlogs(blogs.concat(result))
                setLoadNew(false)
            })
            .catch("Error Blogs...")
            // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageNumber])

    return (

        <>

            <Title titleText={'Our Latest Posts'} />

            <div className="container d-flex mt-5" >

                {blogs.length !== 0 ?
                    <div className="col" >
                        {blogs.map((blog) => (
                            blog.data.map((post, index) => (

                                <div className="card border-0" key={index}>
                                    <img src={post.thumbnail} className="card-image-top rounded-top" alt='...' />

                                    <div className="card-body rounded-top mycard">

                                        <Link to={`/blog/${post.slug}`} className="nav-link card-title">
                                            <h3 className="fw-bold">{HTMLReactParser(post.title)}</h3></Link>
                                        <label className="card-text me-3 mb-1">{HTMLReactParser(post.excerpt)}</label>

                                        <strong style={{ fontSize: '13px' }}>
                                            <i className="bi bi-eye"></i>&nbsp;&nbsp;{post.views}&nbsp;
                                            /&nbsp;&nbsp;<i className="bi bi-calendar-event"></i>&nbsp;&nbsp;{post.date}&nbsp;
                                            /&nbsp;&nbsp;<i className="bi bi-tags"></i>&nbsp;&nbsp;{post.tags.join(', ')}</strong>

                                    </div>
                                </div>
                            )
                            )))}
                        {loadNew && <div className="m-auto text-center p-3 text-primary">
                            <div className="spinner-border" role='status'></div>
                        </div>}
                        <div className="d-flex ">

                            <button className='btn btn-primary mb-5 mx-auto' style={{ visibility: haveMore }}
                                onClick={(e) => {
                                    setPageNumber(pageNumber + 1)
                                    setLoadNew(true)
                                    e.target.blur()
                                }
                                }>Load More</button>
                        </div>
                    </div>

                    : <div className="col text-center p-5 text-primary">
                        <div className="spinner-border" role='status'></div>
                    </div>}

                <Comments />

            </div>
        </>
    )


}

export default Blog