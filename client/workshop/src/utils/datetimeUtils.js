export const fromIsoDate = (isoDate) => {
    const date = new Date(isoDate);

    const formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    })

    return formattedDate
}