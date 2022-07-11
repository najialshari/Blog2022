import HTMLReactParser from 'html-react-parser'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Comments from './Comments'
import Title from './Title'

const SinglePage = () => {

    const { slug } = useParams()
    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        fetch('https://www.wp-course.site/wp-json/youthink/post?slug=' + slug)
            .then(responce => responce.json())
            .then(result => setBlogs(result))
            .catch("Error Blogs...")
  // eslint-disable-next-line react-hooks/exhaustive-deps      
    }, [])

    return (
        <>
            
            <Title titleText={slug}/>

            <div className="container d-flex p-0 mt-5" >

                {blogs.length !== 0 ?
                    <div className="col-8" >
                        <div className="card border-0 m-2">
                            <img src={blogs.data.thumbnail} className="card-image-top " alt='...' />
                            <div className="card-body p-0 mt-4">
                                <div className='bg-light d-flex justify-content-between align-items-baseline py-3 px-2'>
                                <label className="fw-bold"><i className="bi bi-person"></i>&nbsp;&nbsp;
                                    {blogs.data.author}</label>

                                    <strong style={{ fontSize: '14px' }}>
                                        <i className="bi bi-eye"></i>&nbsp;&nbsp;{blogs.data.views}&nbsp;
                                        /&nbsp;&nbsp;<i className="bi bi-calendar-event"></i>&nbsp;&nbsp;{blogs.data.date}&nbsp;
                                        /&nbsp;&nbsp;<i className="bi bi-tags"></i>&nbsp;&nbsp;{blogs.data.tags.join(', ')}</strong>
                                </div>
                                <article className="card-text me-3 my-4">{HTMLReactParser(blogs.data.content)}</article>

                            </div>
                        </div>

                    </div>
                    : <div className="col text-center text-primary">
                        <div className="spinner-border" role='status'></div>
                    </div>}

                <Comments />

            </div>
        </>)
}
export default SinglePage