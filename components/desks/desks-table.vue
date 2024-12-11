<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

const columns = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'label',
    header: 'Label',
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
const desksStore = useDesksStore()

await useAsyncData(() => desksStore.fetchDesks().then(() => true), { lazy: true })

function getDropdownActions(desk: Desk): DropdownMenuItem[] {
  return [
    {
      label: 'Delete',
      icon: 'i-lucide-trash',
      color: 'error',
      onSelect: async () => {
        await desksStore.deleteDesk(desk.id)
        toast.add({ title: 'Desk deleted', color: 'success' })
        await desksStore.fetchDesks()
      },
    },
  ]
}
</script>

<template>
  <UTable
    sticky
    :loading="desksStore.loading"
    :columns="columns"
    :data="desksStore.desks"
  >
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
