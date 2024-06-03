'use client'
import { AddCategory, getHTML } from "./server"
// import { getHTML, metadata } from "./initiliaze";
import { useState, useEffect } from "react";
import { useFormState } from 'react-dom'

const initialState = {
    message: null,
}

export default function Categories({ }) {
    const [mainContent, setMainContent] = useState({ __html: '' });
    const [isError, setIsError] = useState(false)
    const [state, formAction] = useFormState(AddCategory, initialState)
    useEffect(() => {
        getHTML().then((res) => {
            setMainContent(res)
        })
    }, [])
    useEffect(() => {
        if (state?.message === 'Category Added Successfully') {
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
                                <h2 className='mx-auto'>Add Category</h2>
                                <button id='closeform' type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="mb-3 col-12 col-sm-6">
                                        <label htmlFor="name" className="form-label" style={{ fontWeight: "bolder" }}>Name</label>
                                        <input type="text" className="form-control" id="category-name" name="name" placeholder="Enter Category Name" required />
                                    </div>
                                    <div className="mb-3 col-12 col-sm-6">
                                        <label htmlFor="url" className="form-label" style={{ fontWeight: "bolder" }}>Slug</label>
                                        <input type="text" className="form-control" id="category-slug" name="slug" placeholder="Enter Category Slug" required />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label" style={{ fontWeight: "bolder" }}>Description</label>
                                    <textarea className="form-control" id="category-description" name="description" placeholder="Enter Category Description" required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="type" className="form-label" style={{ fontWeight: "bolder" }}>Type</label>
                                    <select className="form-select" id="category-type" name="type" required>
                                        <option value="blogs">Blog</option>
                                        <option value="news">News</option>
                                        <option value="shop">Product</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="keywords" className="form-label" style={{ fontWeight: "bolder" }}>Search Keywords</label>
                                    <textarea type="text" className="form-control" id="category-keywords" name="keywords" placeholder="Enter Category Keywords" />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button id="submitForm" type="submit" className="btn btn-outline-dark">Add Category</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div className="formMessageWrapper">
                <div><img id="addformsuccess" className="mx-auto" style={{ display: "none" }} src='/images/success.png' alt='Success' /><img id="addformerror" className="mx-auto" style={{ display: "none" }} src='/images/error.png' alt='Error' /><p className="formMessage"><span className="temp"><img width={48} src="/images/loading3.gif" alt="loading" /><br />It may take some time<br />Please wait!</span>{state?.message}</p></div>
                <a id="icon" className="btn p-1" style={{ display: "none" }}><img src="/images/close.png" alt="close" /></a>
            </div>
        </div>
    )
}