export default function ProductList(props) {

    const selectProduct =(value) =>{
        props.setqueries(value);
        props.clear_filer("");
    }

    return (
        <>
            <div className="search_product_list_container">
                {
                    props.data && props.data.map((data, index) => (
                        <div className="search_product_list" key={index}
                        
                        onClick={event => selectProduct(event.target.innerHTML)}>
                            {data.title}
                        </div>
                    ))
                }
            </div>
        </>
    )

}