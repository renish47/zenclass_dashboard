export default function formatDate(date) {
    return new Date(date?.toString())
        .toDateString()
        .slice(4)
}