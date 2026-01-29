export function useCountdown(targetDate: string | Date) {
  const target = typeof targetDate === 'string' ? new Date(targetDate) : targetDate
  
  const now = ref(new Date())
  const days = ref(0)
  const hours = ref(0)
  const minutes = ref(0)
  const isPast = ref(false)
  const isToday = ref(false)
  const isTomorrow = ref(false)
  const formatted = ref('')

  const updateCountdown = () => {
    now.value = new Date()
    const diff = target.getTime() - now.value.getTime()
    
    if (diff <= 0) {
      isPast.value = true
      isToday.value = false
      isTomorrow.value = false
      days.value = 0
      hours.value = 0
      minutes.value = 0
      formatted.value = 'Concluído'
      return
    }

    const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24))
    const diffHours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const diffMinutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

    days.value = diffDays
    hours.value = diffHours
    minutes.value = diffMinutes

    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const targetDay = new Date(target)
    targetDay.setHours(0, 0, 0, 0)
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    isToday.value = targetDay.getTime() === today.getTime()
    isTomorrow.value = targetDay.getTime() === tomorrow.getTime()
    isPast.value = false

    if (isToday.value) {
      formatted.value = 'Hoje!'
    } else if (isTomorrow.value) {
      formatted.value = 'Amanhã'
    } else if (diffDays > 0) {
      if (diffHours > 0) {
        formatted.value = `Em ${diffDays} dia${diffDays > 1 ? 's' : ''}, ${diffHours}h`
      } else {
        formatted.value = `Em ${diffDays} dia${diffDays > 1 ? 's' : ''}`
      }
    } else if (diffHours > 0) {
      formatted.value = `Em ${diffHours}h`
    } else {
      formatted.value = `Em ${diffMinutes}min`
    }
  }

  const badgeColor = computed(() => {
    if (isPast.value) return 'bg-gray-400'
    if (isToday.value) return 'bg-red-500'
    if (days.value <= 2) return 'bg-orange-500'
    if (days.value <= 6) return 'bg-yellow-500'
    return 'bg-green-500'
  })

  let interval: ReturnType<typeof setInterval> | null = null

  onMounted(() => {
    updateCountdown()
    interval = setInterval(updateCountdown, 60000)
  })

  onUnmounted(() => {
    if (interval) {
      clearInterval(interval)
    }
  })

  return {
    days: readonly(days),
    hours: readonly(hours),
    minutes: readonly(minutes),
    isPast: readonly(isPast),
    isToday: readonly(isToday),
    isTomorrow: readonly(isTomorrow),
    formatted: readonly(formatted),
    badgeColor: readonly(badgeColor)
  }
}
