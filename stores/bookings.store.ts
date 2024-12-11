export const useBookingsStore = defineStore('bookings', () => {
  const bookings = ref<BookingWithUserWithDesk[]>([])
  const loading = ref(false)

  const fetchBookings = async () => {
    loading.value = true
    const result = await $fetch('/api/bookings?include=user&include=desk', { method: 'GET' })
    bookings.value = result.data as BookingWithUserWithDesk[]
    loading.value = false
  }

  const createBooking = async (payload: BookingCreatePayload) => {
    loading.value = true
    await $fetch('/api/bookings', { method: 'POST', body: payload })
    loading.value = false
  }

  const updateBooking = async (payload: BookingUpdatePayload, bookingId: string) => {
    loading.value = true
    await $fetch(`/api/bookings/${bookingId}`, { method: 'PATCH', body: payload })
    loading.value = false
  }

  const deleteBooking = async (bookingId: string) => {
    loading.value = true
    await $fetch(`/api/booking/${bookingId}`, { method: 'DELETE' })
    loading.value = false
  }

  return { bookings, loading, fetchBookings, createBooking, updateBooking, deleteBooking }
})
