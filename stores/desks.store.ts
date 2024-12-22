type FetchOptions = {
  start?: string
  end?: string
  available?: boolean
  date?: string
}

export const useDesksStore = defineStore('desks', () => {
  const desks = ref<Desk[]>([])
  const loading = reactive({
    fetch: false,
    create: false,
    update: false,
    delete: false,
  })

  const fetchDesks = async (options?: FetchOptions) => {
    loading.fetch = true

    let fetchResult

    if (options) {
      const { start, end, date, available } = options

      const searchParams = new URLSearchParams()

      if (start) searchParams.append('start', start)
      if (end) searchParams.append('end', end)
      if (date) searchParams.append('date', date)
      if (available !== undefined) searchParams.append('available', available.toString())

      fetchResult = await $fetch(`/api/desks?${searchParams.toString()}`, { method: 'GET' })
    }
    else {
      fetchResult = await $fetch(`/api/desks`, { method: 'GET' })
    }

    desks.value = fetchResult.data
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
