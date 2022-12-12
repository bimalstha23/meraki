const addToCartHandler = async (uid,cartdata, product,addCart ) => {
    if (uid) {
        const item = data.filter((data: any) => data.id === product.id);
        if (item.length > 0) {
            await addCart({ uid, ...product }).then(() => {
                // setOpen(true)
                return true;
            })
        } else {
            await addCart({ uid, ...product, quantity: 1 }).then(() => {
                // setOpen(true)
                return true;
            })
        }
    } else {
        dispatch(setLoginDialog(true))
    }
}