<!-- eslint-disable vue/no-unused-vars -->
<template>
  <div>
    <Button type="primary" @click="openDialog(DIALOGCONSTANTSVARIABLE.isForAddNewDialog)"
      >Add Organization</Button
    >

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

    <!-- Modal for Delete Organization  -->
    <DeleteOrganization
      @closeDialog="closeDialog"
      :isOpenDialogDeleteOrganization="isOpenDialogDeleteOrganization"
      :modalID="modalID"
    />
    <!-- Modal for either add New Org or Update Organization  -->
    <AddNewOrganization
      :isOpenDialogAddUpdateOrganization="isOpenDialogAddUpdateOrganization"
      @closeDialog="closeDialog"
      :isForAddNewModal="isForAddNewModal"
      :modalID="modalID"
    />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { Table, Space, Button } from 'ant-design-vue'
import useOrganization from '../../stores/Organization'
import { EditTwoTone, DeleteTwoTone } from '@ant-design/icons-vue'
//const
import { DIALOGCONSTANTSVARIABLE } from '../../constants/constantsVarible'
//component
import AddNewOrganization from './AddnewOrganization.vue'
import DeleteOrganization from './DeleteOrganization.vue'

const org = useOrganization()

const { organizationData, fetching: isLoadingTable } = storeToRefs(org)

//dialog status
const isOpenDialogDeleteOrganization = ref(false)
const isOpenDialogAddUpdateOrganization = ref(false)

//get the modal ID from row clicked arrow data
const modalID = ref()
// either to check if the modal is for add or update
const isForAddNewModal = ref()
//columns header
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

//open dialog Handlers
const openDialog = (type) => {
  const action = {
    isForDeleteDialog: () => {
      isOpenDialogDeleteOrganization.value = true
    },
    isForAddNewDialog: () => {
      isOpenDialogAddUpdateOrganization.value = true
      isForAddNewModal.value = true
    },
    isForUpdateDialog: () => {
      isOpenDialogAddUpdateOrganization.value = true
      isForAddNewModal.value = false
    }
  }
  action[type]()
}

//close dialog Handlers
const closeDialog = (type) => {
  const action = {
    isForDeleteDialog: () => {
      isOpenDialogDeleteOrganization.value = false
    },
    isForAddNewDialog: () => {
      isOpenDialogAddUpdateOrganization.value = false
    }
  }
  action[type]()
}

const handleActionClick = (record, type) => {
  // do something with the clicked row data
  const action = {
    edit: () => {
      console.log('edit Clicked record:', record.id)
      modalID.value = record.id

      openDialog(DIALOGCONSTANTSVARIABLE.isForUpdateDialog)
    },
    delete: () => {
      console.log('delete Clicked record:', record.id)
      modalID.value = record.id
      openDialog(DIALOGCONSTANTSVARIABLE.isForDeleteDialog)
    }
  }
  action[type]()
}

//useEffects

onMounted(() => {
  console.log('check')
  org.fetchOrganization()
})
</script>
