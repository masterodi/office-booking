export const useDesksStore = defineStore('desks', () => {
  const desks = ref<Desk[]>([])
  const loading = reactive({
    fetch: false,
    create: false,
    update: false,
    delete: false,
  })

  const fetchDesks = async () => {
    loading.fetch = true
    const result = await $fetch('/api/desks', { method: 'GET' })
    desks.value = result.data
    loading.fetch = false
  }

  const createDesk = async (payload: DeskCreatePayload) => {
    loading.create = true
    await $fetch('/api/desks', { method: 'POST', body: payload })
    loading.create = false
  }

  const updateDesk = async (payload: DeskUpdatePayload, deskId: string) => {
    loading.update = true
    await $fetch(`/api/desks/${deskId}`, { method: 'PATCH', body: payload })
    loading.update = false
  }

  const deleteDesk = async (deskId: string) => {
    loading.delete = true
    await $fetch(`/api/desks/${deskId}`, { method: 'DELETE' })
    loading.delete = false
  }

  return { desks, loading, fetchDesks, createDesk, updateDesk, deleteDesk }
})
