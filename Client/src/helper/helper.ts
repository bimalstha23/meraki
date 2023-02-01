export const convertCurrency = (price: number) => {
    return new Intl.NumberFormat('en-NP',
        {
            style: 'currency',
            currency: 'NPR',
            minimumFractionDigits: 2
        },

    ).format(price / 100)
}