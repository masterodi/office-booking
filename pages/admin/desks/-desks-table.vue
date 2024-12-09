<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'
import type { PropType } from 'vue'

const props = defineProps({
  data: { type: Array as PropType<Desk[]>, default: [] as Desk[] },
  loading: Boolean,
  refresh: { type: Function, required: true },
})

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

function getDropdownActions(desk: Desk): DropdownMenuItem[] {
  return [
    {
      label: 'Delete',
      icon: 'i-lucide-trash',
      color: 'error',
      onSelect: async () => {
        await $fetch(`/api/desks/${desk.id}`, { method: 'DELETE' })
        toast.add({ title: 'Desk deleted', color: 'success' })
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
