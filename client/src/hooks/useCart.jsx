export const useCart = () => {

    const addCart = (currentCart, product, customer, quantity = 0) => {
        let currentCartItems = [...currentCart.items];

        if (currentCartItems.length > 0) {
            let productExists = currentCartItems.find((item) => item.id === product.id)
            let productExistsIndex = currentCartItems.findIndex((item) => item.id === product.id)
            if (productExists) {
                if (quantity) {
                    currentCartItems.splice(productExistsIndex, 1, { ...productExists, purchaseQuantity: quantity })
                } else {
                    currentCartItems.splice(productExistsIndex, 1, { ...productExists, purchaseQuantity: productExists.purchaseQuantity + 1 })
                }
            } else {
                if (quantity) {
                    currentCartItems.push({ ...product, purchaseQuantity: quantity });
                } else {
                    currentCartItems.push({ ...product, purchaseQuantity: 1 });
                }
            }
        } else {
            if (quantity) {
                currentCartItems.push({ ...product, purchaseQuantity: quantity });
            } else {
                currentCartItems.push({ ...product, purchaseQuantity: 1 });
            }
        }

        currentCart.customer = customer;
        currentCart.items = currentCartItems
        currentCart.subTotal = 0;
        currentCart.tax = 0;
        currentCart.grandTotal = 0;

        for (const item of currentCart.items) {
            currentCart.subTotal += +item.price * item.purchaseQuantity
        }

        currentCart.grandTotal = currentCart.subTotal + currentCart.tax

        return currentCart
    }

    const updateCart = (currentCart, product, quantity) => {
        let currentCartItems = [...currentCart.items];

        if (currentCartItems.length > 0) {
            let productExists = currentCartItems.find((item) => item.id === product.id)
            let productExistsIndex = currentCartItems.findIndex((item) => item.id === product.id)
            if (productExists) {
                currentCartItems.splice(productExistsIndex, 1, { ...productExists, purchaseQuantity: quantity })
            }
        }

        currentCart.items = currentCartItems
        currentCart.subTotal = 0;
        currentCart.tax = 0;
        currentCart.grandTotal = 0;

        for (const item of currentCart.items) {
            currentCart.subTotal += +item.price * item.purchaseQuantity
        }

        currentCart.grandTotal = currentCart.subTotal + currentCart.tax

        return currentCart
    }

    const deleteCart = (currentCart, product) => {
        let currentCartItems = [...currentCart.items];

        if (currentCartItems.length > 0) {
            let productExists = currentCartItems.find((item) => item.id === product.id)
            let productExistsIndex = currentCartItems.findIndex((item) => item.id === product.id)
            if (productExists) {
                currentCartItems.splice(productExistsIndex, 1)
            }
        }

        currentCart.items = currentCartItems
        currentCart.subTotal = 0;
        currentCart.tax = 0;
        currentCart.grandTotal = 0;

        for (const item of currentCart.items) {
            currentCart.subTotal += +item.price * item.purchaseQuantity
        }

        currentCart.grandTotal = currentCart.subTotal + currentCart.tax

        return currentCart
    }



    return [addCart, updateCart, deleteCart]
}