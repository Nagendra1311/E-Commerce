import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../../components/ProductItem';
import { getCategoryStart } from './../../redux/actions/category.action';
import { getProductStart } from './../../redux/actions/product.action';

export default function Home() {
    const [tab, setTab] = useState('tab-1')
    const dispatch = useDispatch();
    const categories = useSelector(state => state.category.categories);
    const products = useSelector(state => state.product.products);

    useEffect(() => {
        dispatch(getCategoryStart())
        dispatch(getProductStart())

    }, [categories.length])

    return (
        <>
            <div className="container-fluid py-5" style={{
                marginTop: "20px"
            }}>
                <div className="container py-5">
                    <div className="tab-class text-center">
                        <div className="row g-4">
                            <div className="col-lg-4 text-start">
                                <h1>Products</h1>
                            </div>
                            <div className="col-lg-8 text-end">
                                <ul className="nav nav-pills d-inline-flex text-center mb-5">
                                    <li className="nav-item">
                                        <Link className={tab === 'tab-1' ? `d-flex m-2 py-2 bg-light rounded-pill active` : 'd-flex m-2 py-2 bg-light rounded-pill'}
                                            data-bs-toggle="pill" href="#tab-1" onClick={() => setTab(`tab-1`)}>
                                            <span className="text-dark" style={{ width: "130px" }}>All Products</span>
                                        </Link>
                                    </li>
                                    {
                                        categories.length > 0 && categories.map((category, index) => (
                                            <li className="nav-item" key={index}>
                                                <a className={tab === `tab-${index + 2}` ? `d-flex m-2 py-2 bg-light rounded-pill active` : 'd-flex m-2 py-2 bg-light rounded-pill'}
                                                    data-bs-toggle="pill" href={`tab-${index + 2}`} onClick={() => setTab(`tab-${index + 2}`)}>
                                                    <span className="text-dark" style={{ width: "130px" }}>{category.name}</span>
                                                </a>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                        <div className="tab-content">
                            <div id="tab-1" className={tab === 'tab-1' ? `tab-pane fade show p-0 active` : 'tab-pane fade show p-0'}>
                                <div className="row g-4">
                                    <div className="col-lg-12">
                                        <div className="row g-4">
                                            {
                                                products.length > 0 && products.map((product, index) => (
                                                    <ProductItem product={product} key={index} />
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {
                                categories.length > 0 && categories.map((category, index) => (
                                    <div id="tab-2" className={tab === `tab-${index + 2}` ? `tab-pane fade show p-0 active` : 'tab-pane fade show p-0'} key={index}>
                                        <div className="row g-4">
                                            <div className="col-lg-12">
                                                <div className="row g-4">
                                                    {
                                                        products.length > 0 && products.map(product => {
                                                            if (product.category === category.name) {
                                                                return (
                                                                    <ProductItem product={product} key={product.id} />
                                                                )
                                                            }
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }


                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
