import {
    onMounted,
    onUnmounted,
    ref
} from "vue"

const filterZore = (v) => {
    return v < 10 ? `0${v}` : v
}

const dateFilter = (v) => {
    const month = filterZore(v.getMonth() + 1)
    const date = filterZore(v.getDate())
    return `${v.getFullYear()}-${month}-${date}`
}

const timeFilter = (v) => {
    const hours = filterZore(v.getHours())
    const minutes = filterZore(v.getMinutes())
    const s = filterZore(v.getSeconds())
    return `${hours}:${minutes}:${s}`
}


export default function clock() {
    let now = new Date()
    const date = ref(dateFilter(now))
    const time = ref(timeFilter(now))
    let task;
    const start = () => {
        task = setInterval(() => {
            const now = new Date()
            date.value = dateFilter(now)
            time.value = timeFilter(now)
        }, 1000)
    }

    onMounted(() => {
        start()
    })

    onUnmounted(() => {
        task && clearInterval(task)
    })

    return {
        date,
        time
    }
}