<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'
import type { PropType } from 'vue'

type BookingWithUserWithDesk = Booking & { user: SafeUser, desk: Desk }

const props = defineProps({
  data: { type: Array as PropType<BookingWithUserWithDesk[]>, default: [] as BookingWithUserWithDesk[] },
  loading: Boolean,
  refresh: { type: Function, required: true },
})

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

const toast = useToast()

function getDropdownActions(booking: BookingWithUserWithDesk): DropdownMenuItem[] {
  return [
    {
      label: 'Delete',
      icon: 'i-lucide-trash',
      color: 'error',
      onSelect: async () => {
        console.log(booking)

        await $fetch(`/api/bookings/${booking.id}`, { method: 'DELETE' })
        toast.add({ title: 'Booking deleted', color: 'success' })
        await props.refresh()
      },
    },
  ]
}
</script>

<template>
  <UTable
    sticky
    :loading="loading"
    :columns="columns"
    :data="data"
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
