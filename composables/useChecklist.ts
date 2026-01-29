export function useChecklist(tripSlug: string) {
  const storageKey = `trip-checklist-${tripSlug}`
  
  const getStoredData = (): Record<string, boolean> => {
    if (typeof window === 'undefined') return {}
    try {
      const stored = localStorage.getItem(storageKey)
      return stored ? JSON.parse(stored) : {}
    } catch {
      return {}
    }
  }

  const setStoredData = (data: Record<string, boolean>) => {
    if (typeof window === 'undefined') return
    try {
      localStorage.setItem(storageKey, JSON.stringify(data))
    } catch (error) {
      console.error('Error saving checklist:', error)
    }
  }

  const checkedActivities = ref<Record<string, boolean>>(getStoredData())

  const toggleActivity = (activityId: string) => {
    checkedActivities.value[activityId] = !checkedActivities.value[activityId]
    setStoredData(checkedActivities.value)
  }

  const isActivityChecked = (activityId: string): boolean => {
    return checkedActivities.value[activityId] === true
  }

  const getProgress = (totalActivities: number): number => {
    if (totalActivities === 0) return 0
    const checkedCount = Object.values(checkedActivities.value).filter(Boolean).length
    return Math.round((checkedCount / totalActivities) * 100)
  }

  const resetChecklist = () => {
    checkedActivities.value = {}
    setStoredData({})
  }

  watch(checkedActivities, (newValue) => {
    setStoredData(newValue)
  }, { deep: true })

  return {
    checkedActivities: readonly(checkedActivities),
    toggleActivity,
    isActivityChecked,
    getProgress,
    resetChecklist
  }
}
