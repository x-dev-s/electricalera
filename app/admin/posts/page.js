'use client'
import { AddPost, getHTML } from "./server"
// import { getHTML, metadata } from "./initiliaze";
import { useState, useEffect } from "react";
import { useFormState } from 'react-dom'

const initialState = {
    message: null,
}

export default function Posts({ }) {
    const [mainContent, setMainContent] = useState({ __html: '' });
    const [isError, setIsError] = useState(false)
    const [state, formAction] = useFormState(AddPost, initialState)
    useEffect(() => {
        getHTML().then((res) => {
            setMainContent(res)
        })
    }, [])
    useEffect(() => {
        if (state?.message === 'Post Added Successfully') {
            setIsError(false)
        }
        else {
            setIsError(true)
        }
    }, [state])
    return (
        <div>
            <div dangerouslySetInnerHTML={mainContent} />
            <div id='FormWrapper1' className='px-3'>
                <form id="Form1" action={formAction}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header py-2">
                                <h2 className='mx-auto'>Add Post</h2>
                                <button id='closeform' type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="mb-3 col-12 col-sm-6">
                                        <label htmlFor="title" className="form-label" style={{ fontWeight: "bolder" }}>Title</label>
                                        <input type="text" className="form-control" id="post-title" name="title" placeholder="Enter Post Title" required />
                                    </div>
                                    <div className="mb-3 col-12 col-sm-6">
                                        <label htmlFor="url" className="form-label" style={{ fontWeight: "bolder" }}>Slug</label>
                                        <input type="text" className="form-control" id="post-slug" name="slug" placeholder="Enter Post Slug" required />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label" style={{ fontWeight: "bolder" }}>Description</label>
                                    <textarea className="form-control" id="post-description" name="description" placeholder="Enter Post Description" required />
                                </div>
                                <div className="row">
                                    <div className="mb-3 col-12 col-sm-6">
                                        <label htmlFor="type" className="form-label" style={{ fontWeight: "bolder" }}>Type</label>
                                        <select className="form-select" id="post-type" name="type" required>
                                            <option value="blogs">Blog</option>
                                            <option value="news">News</option>
                                        </select>
                                    </div>
                                    <div className="mb-3 col-12 col-sm-6">
                                        <label htmlFor="category" className="form-label" style={{ fontWeight: "bolder" }}>Category</label>
                                        <select className="form-select" id="post-category" name="category" required>
                                        </select>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="keywords" className="form-label" style={{ fontWeight: "bolder" }}>Search Keywords</label>
                                    <textarea type="text" className="form-control" id="post-keywords" name="keywords" placeholder="Enter Post Keywords" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="adkeywords" className="form-label" style={{ fontWeight: "bolder" }}>Product Keywords</label>
                                    <textarea type="text" className="form-control" id="post-adkeywords" name="adkeywords" placeholder="Enter Post Product Keywords" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="necessary" className="form-label" style={{ fontWeight: "bolder" }}>Product Title Must Contain</label>
                                    <textarea type="text" className="form-control" id="post-necessary" name="necessary" placeholder="Enter Post Product Title Must Contain" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="quantity" className="form-label" style={{ fontWeight: "bolder" }}>Products Quantity</label>
                                    <input type="number" min="0" className="form-control" id="post-quantity" name="quantity" placeholder="Enter Post Products Quantity" required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="html" className="form-label" style={{ fontWeight: "bolder" }}>HTML</label>
                                    <textarea type="html" style={{ height: "400px" }} className="form-control" id="post-html" name="html" placeholder="Enter Post HTML" required />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button id="submitForm" type="submit" className="btn btn-outline-dark">Add Post</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div className="formMessageWrapper">
                <div><img id="addformsuccess" className="mx-auto" style={{ display: "none" }} src='/images/success.png' alt='Success' /><img id="addformerror" className="mx-auto" style={{ display: "none" }} src='/images/error.png' alt='Error' /><p className="formMessage"><span className="temp"><img width={48} src="/images/loading3.gif" alt="loading" /><br />It may take several minutes<br />Please wait!</span>{state?.message}</p></div>
                <a id="icon" className="btn p-1" style={{ display: "none" }}><img src="/images/close.png" alt="close" /></a>
            </div>
        </div>
    )
}