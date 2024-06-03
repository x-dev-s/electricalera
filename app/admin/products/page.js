'use client'
import { UpdateProducts, getHTML } from "./server"
// import { getHTML, metadata } from "./initiliaze";
import { useState, useEffect } from "react";
import { useFormState } from 'react-dom'

const initialState = {
    message: null,
}

export default function Products({ }) {
    const [mainContent, setMainContent] = useState({ __html: '' });
    const [isError, setIsError] = useState(false)
    const [state, formAction] = useFormState(UpdateProducts, initialState)
    useEffect(() => {
        getHTML().then((res) => {
            setMainContent(res)
        })
    }, [])
    useEffect(() => {
        if (state?.message === 'Products Added Successfully') {
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
                                <h2 className='mx-auto'>Add Products</h2>
                                <button id='closeform' type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                <div className="col-12 col-sm-6">
                                    <div className="mb-3">
                                        <label htmlFor="category" className="form-label" style={{ fontWeight: "bolder" }}>Products Category</label>
                                        <select className="form-select" id="products-category" name="category" required>
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="sort" className="form-label" style={{ fontWeight: "bolder" }}>Sort Products</label>
                                        <select className="form-select" id="products-sort" name="sort" required>
                                            <option value="relevanceblender">Featured</option>
                                            <option value="exact-aware-popularity-rank">Best Seller</option>
                                            <option value="review-rank">Most Reviewed</option>
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="pages" className="form-label" style={{ fontWeight: "bolder" }}>No. of Pages</label>
                                        <input type="number" min="0" className="form-control" id="product-pages" name="pages" placeholder="Enter Product Pages for Each Keyword" required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="quantity" className="form-label" style={{ fontWeight: "bolder" }}>Maximum Products</label>
                                        <input type="number" min="0" className="form-control" id="products-quantity" name="quantity" placeholder="Enter Products Quantity" required />
                                    </div>
                                </div>
                                <div className="mb-3 col-12 col-sm-6">
                                    <label htmlFor="subcategory" className="form-label" style={{ fontWeight: "bolder" }}>Products Subcategories</label>
                                    <div id="products-subcategories"></div>
                                </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button id="submitForm" type="submit" className="btn btn-outline-dark">Update Products</button>
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