<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

const columns = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'user.username',
    header: 'Created By',
  },
  {
    accessorKey: 'desk.label',
    header: 'Booked Desk',
  },
  {
    accessorKey: 'bookedDate',
    header: 'Booked Date',
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
  },
  {
    id: 'action',
  },
]

const bookingsStore = useBookingsStore()

await useAsyncData(() => bookingsStore.fetchBookings().then(() => true), { lazy: true })

const toast = useToast()

function getDropdownActions(booking: BookingWithUserWithDesk): DropdownMenuItem[] {
  return [
    {
      label: 'Delete',
      icon: 'i-lucide-trash',
      color: 'error',
      onSelect: async () => {
        await bookingsStore.deleteBooking(booking.id)
        toast.add({ title: 'Booking deleted', color: 'success' })
        await bookingsStore.fetchBookings()
      },
    },
  ]
}
</script>

<template>
  <UTable
    sticky
    :columns="columns"
    :loading="bookingsStore.loading"
    :data="bookingsStore.bookings"
  >
    <template #bookedDate-cell="{ row }">
      <div>{{ new Date(parseInt(row.original.bookedDate)).toDateString() }}</div>
    </template>

    <template #action-cell="{ row }">
      <ClientOnly>
        <UDropdownMenu :items="getDropdownActions(row.original)">
          <UButton
            icon="i-lucide-ellipsis-vertical"
            color="neutral"
            variant="ghost"
          />
        </UDropdownMenu>
      </ClientOnly>
    </template>
  </UTable>
</template>
