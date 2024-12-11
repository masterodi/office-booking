export const useBookingsStore = defineStore('bookings', () => {
  const bookings = ref<BookingWithUserWithDesk[]>([])
  const loading = reactive({
    fetch: false,
    create: false,
    update: false,
    delete: false,
  })

  const fetchBookings = async () => {
    loading.fetch = true
    const result = await $fetch('/api/bookings?include=user&include=desk', { method: 'GET' })
    bookings.value = result.data as BookingWithUserWithDesk[]
    loading.fetch = false
  }

  const createBooking = async (payload: BookingCreatePayload) => {
    loading.create = true
    await $fetch('/api/bookings', { method: 'POST', body: payload })
    loading.create = false
  }

  const updateBooking = async (payload: BookingUpdatePayload, bookingId: string) => {
    loading.update = true
    await $fetch(`/api/bookings/${bookingId}`, { method: 'PATCH', body: payload })
    loading.update = false
  }

  const deleteBooking = async (bookingId: string) => {
    loading.delete = true
    await $fetch(`/api/booking/${bookingId}`, { method: 'DELETE' })
    loading.delete = false
  }

  return { bookings, loading, fetchBookings, createBooking, updateBooking, deleteBooking }
})
