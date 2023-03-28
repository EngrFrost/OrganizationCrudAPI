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
              @click="handleActionClick(record, 'edit')"
              twoToneColor="#1890ff"
              style="font-size: 22px" />
            <DeleteTwoTone
              @click="handleActionClick(record, 'delete')"
              twoToneColor="red"
              style="font-size: 22px"
          /></Space>
        </template>
      </template>
    </Table>

    <DeleteOrganization
      @closeDialogEditOrganization="closeDialogEditOrganization"
      :isOpenDialogEditOrganization="isOpenDialogEditOrganization"
      :modalID="modalID"
    />
  </div>
</template>

<script setup>
import { onMounted, watch, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { Table, Space } from 'ant-design-vue'
import useOrganization from '../../stores/Organization'
import { EditTwoTone, DeleteTwoTone } from '@ant-design/icons-vue'
import DeleteOrganization from './DeleteOrganization.vue'
//component
import AddNewOrganization from './AddnewOrganization.vue'

const org = useOrganization()

const { organizationData, fetching: isLoadingTable } = storeToRefs(org)
const isOpenDialogEditOrganization = ref(false)
// const isOpenDialogUpdateOrganization = ref(true)
const modalID = ref()

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

const closeDialogEditOrganization = () => {
  isOpenDialogEditOrganization.value = false
}
const handleActionClick = (record, type) => {
  // do something with the clicked row data
  const action = {
    edit: () => {
      console.log('edit Clicked record:', record.id)
    },

    delete: () => {
      console.log('delete Clicked record:', record.id)
      modalID.value = record.id
      isOpenDialogEditOrganization.value = true
    }
  }
  action[type]()
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
