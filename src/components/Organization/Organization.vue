<!-- eslint-disable vue/no-unused-vars -->
<template>
  <div>
    <AddNewOrganization />

    <Table :columns="columns" :data-source="organizationData" :loading="isLoadingTable">
      <template v-if="columns.scopedSlots.customRender === 'id'">
        <a> {{ record[columns.dataIndex] }} </a>
      </template>
      <template v-else-if="columns.scopedSlots.customRender === 'organization'">
        <a> {{ record[columns.dataIndex] }} </a>
      </template>
      <template v-else-if="columns.scopedSlots.customRender === 'description'">
        <a> {{ record[columns.dataIndex] }} </a>
      </template>
      <template #bodyCell="{ record, column }">
        <template v-if="column.key === 'operation'">
          <Space
            ><EditTwoTone
              @click="handleActionClick(record)"
              twoToneColor="#1890ff"
              style="font-size: 22px" />
            <DeleteTwoTone
              @click="handleActionClick(record)"
              twoToneColor="red"
              style="font-size: 22px"
          /></Space>
        </template>
      </template>
    </Table>
  </div>
</template>

<script setup>
import { onMounted, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { Table, Space } from 'ant-design-vue'
import useOrganization from '../../stores/Organization'
import { EditTwoTone, DeleteTwoTone } from '@ant-design/icons-vue'
//component
import AddNewOrganization from './AddnewOrganization.vue'

const org = useOrganization()

const { organizationData, fetching: isLoadingTable } = storeToRefs(org)

const columns = [
  {
    title: 'Organization ID',
    dataIndex: 'id',
    key: 'id',
    scopedSlots: { customRender: 'id' }
  },
  {
    title: 'Organization',
    dataIndex: 'organization',
    key: 'organization',
    scopedSlots: { customRender: 'organization' }
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
    scopedSlots: { customRender: 'description' }
  },
  {
    title: 'Action',
    key: 'operation',
    fixed: 'right',
    width: 100,
    scopedSlots: { customRender: 'operation' }
  }
]

const handleActionClick = (record) => {
  // do something with the clicked row data
  console.log('Clicked record:', record.id)
}

//useEffects
watch(organizationData, () => {
  console.log(organizationData.value)
})

onMounted(() => {
  console.log('check')
  org.fetchOrganization()
})
</script>
