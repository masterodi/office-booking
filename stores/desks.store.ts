export const useDesksStore = defineStore('desks', () => {
  const desks = ref<Desk[]>([])
  const loading = ref(false)

  const fetchDesks = async () => {
    loading.value = true
    const result = await $fetch('/api/desks', { method: 'GET' })
    desks.value = result.data
    loading.value = false
  }

  const createDesk = async (payload: DeskCreatePayload) => {
    loading.value = true
    await $fetch('/api/desks', { method: 'POST', body: payload })
    loading.value = false
  }

  const updateDesk = async (payload: DeskUpdatePayload, deskId: string) => {
    loading.value = true
    await $fetch(`/api/desks/${deskId}`, { method: 'PATCH', body: payload })
    loading.value = false
  }

  const deleteDesk = async (deskId: string) => {
    loading.value = true
    await $fetch(`/api/desks/${deskId}`, { method: 'DELETE' })
    loading.value = false
  }

  return { desks, loading, fetchDesks, createDesk, updateDesk, deleteDesk }
})
